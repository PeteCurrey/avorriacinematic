"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type * as THREE from "three";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { useWebGLCapabilities } from "@/providers/WebGLCapabilityProvider";

/**
 * OBJECT STAGE
 *
 * The 3D hero. A single subject on a dark studio set, lit like a product
 * photograph, driven by scroll and cursor.
 *
 * SUBJECT SWAP
 * Pass `modelUrl` and the stage loads that GLB instead of the procedural
 * Alkota frame. Framing is derived from the model's own bounding box, so a
 * full bike and a bare frame both sit correctly without re-rigging the
 * camera. That is the one seam the real Alkota model needs to drop into.
 *
 * WHY three.js IS DYNAMICALLY IMPORTED
 * three is roughly 600KB. Loading it in the main bundle would tax every
 * route — including the admin — for a scene that exists on one section of one
 * page. It is imported only once the stage is actually near the viewport.
 *
 * FALLBACK
 * No WebGL, a low-power device, or reduced motion gets a still image instead.
 * That is not a degraded experience so much as a different one: the still is
 * the same subject, correctly lit.
 *
 * LIFECYCLE
 * The renderer is created when the stage nears the viewport and torn down
 * completely on unmount — geometries, materials, textures and the WebGL
 * context. A leaked context is a hard failure: browsers cap them at around
 * 16 and silently kill the oldest.
 */

interface ObjectStageProps {
  /** GLB/GLTF to display. Omit to use the procedural Alkota frame. */
  modelUrl?: string;
  /** Still shown when WebGL is unavailable, underpowered, or motion is reduced. */
  fallbackImage: string;
  fallbackAlt: string;
  /**
   * 0–1, drives the subject's rotation and the camera's dolly.
   *
   * Supplied as a ref rather than a value on purpose: this is written on every
   * scroll frame, and a React state update per frame would re-render the tree
   * 60 times a second to move a camera. The render loop reads the ref
   * directly.
   */
  progressRef?: React.MutableRefObject<number>;
  className?: string;
}

type StageState = "idle" | "loading" | "live" | "fallback";

export function ObjectStage({
  modelUrl,
  fallbackImage,
  fallbackAlt,
  progressRef,
  className = "",
}: ObjectStageProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const internalProgress = useRef(0);
  const readProgress = () => progressRef?.current ?? internalProgress.current;
  const [state, setState] = useState<StageState>("idle");

  const { effectiveReducedMotion } = useReducedMotion();
  const { capabilities, forceDisabled } = useWebGLCapabilities();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Only genuine incapability falls back to the still. `lowPowerDevice` is
    // deliberately NOT in this list: the provider flags it at
    // `hardwareConcurrency <= 4`, which catches plenty of perfectly capable
    // laptops (and every headless/VM browser). Disabling the hero's subject on
    // those machines trades the whole idea for a threshold that does not mean
    // what it sounds like. Low power reduces QUALITY below instead.
    const unsupported =
      forceDisabled || effectiveReducedMotion || capabilities?.supported === false;

    if (unsupported) {
      setState("fallback");
      return;
    }

    const lowPower = capabilities?.lowPowerDevice === true;

    let disposed = false;
    let teardown: (() => void) | null = null;

    // Only pay for three.js once the stage is actually approaching the screen.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || disposed) return;
        io.disconnect();
        void start();
      },
      { rootMargin: "300px" }
    );
    io.observe(host);

    async function start() {
      setState("loading");
      try {
        const THREE = await import("three");
        if (disposed) return;

        const width = host!.clientWidth || 1;
        const height = host!.clientHeight || 1;
        const dpr = Math.min(
          window.devicePixelRatio || 1,
          lowPower ? 1 : capabilities?.maxDpr ?? 1.75
        );

        const renderer = new THREE.WebGLRenderer({
          // Antialiasing is the single most expensive default here, and the
          // first thing to drop on a constrained device.
          antialias: !lowPower,
          alpha: true,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(dpr);
        renderer.setSize(width, height, false);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.55;
        host!.appendChild(renderer.domElement);
        renderer.domElement.style.cssText =
          "width:100%;height:100%;display:block;pointer-events:none;";

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);

        let envTexture: THREE.Texture | null = null;
        if (!lowPower) {
          const { RoomEnvironment } = await import(
            "three/examples/jsm/environments/RoomEnvironment.js"
          );
          const pmrem = new THREE.PMREMGenerator(renderer);
          envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
          scene.environment = envTexture;
          pmrem.dispose();
        }

        // ── Subject ──────────────────────────────────────────────────────
        const subject = new THREE.Group();
        scene.add(subject);

        // Clearcoat is a second specular lobe — real cost per pixel. The
        // standard material is visually close enough on a device that needs
        // the frames back.
        const material = lowPower
          ? new THREE.MeshStandardMaterial({
              color: 0x232830,
              metalness: 0.45,
              roughness: 0.32,
            })
          : new THREE.MeshPhysicalMaterial({
              color: 0x1b1f26,
              metalness: 0.42,
              roughness: 0.28,
              clearcoat: 1,
              clearcoatRoughness: 0.18,
              reflectivity: 0.85,
              envMapIntensity: 1.35,
            });

        let disposables: Array<{ dispose: () => void }> = [material];

        if (modelUrl) {
          const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
          const gltf = await new GLTFLoader().loadAsync(modelUrl);
          if (disposed) return;
          subject.add(gltf.scene);
          gltf.scene.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.castShadow = false;
              mesh.receiveShadow = false;
            }
          });
        } else {
          const { buildAlkotaFrame } = await import("@/lib/webgl/alkota-frame");
          const geometry = await buildAlkotaFrame(THREE, {
            tubularSegments: lowPower ? 24 : 44,
            radialSegments: lowPower ? 8 : 12,
          });
          if (disposed) return;
          const mesh = new THREE.Mesh(geometry, material);
          subject.add(mesh);
          disposables.push(geometry);
        }

        // Frame the subject from its own bounds, so swapping the mesh does not
        // require re-rigging the camera.
        const box = new THREE.Box3().setFromObject(subject);
        const size = box.getSize(new THREE.Vector3());
        const centre = box.getCenter(new THREE.Vector3());
        subject.position.sub(centre);

        const radius = Math.max(size.x, size.y, size.z) || 1;
        const fitDistance = radius / (2 * Math.tan((camera.fov * Math.PI) / 360));
        const baseDistance = fitDistance * 1.28;
        camera.position.set(0, 0, baseDistance);
        camera.lookAt(0, 0, 0);

        // ── Light ────────────────────────────────────────────────────────
        // A product-photography rig: soft key, cool rim in the signal colour,
        // and a low fill so the underside is not a void.
        const key = new THREE.DirectionalLight(0xffffff, 3.4);
        key.position.set(2.4, 3.2, 2.6);
        scene.add(key);

        const rim = new THREE.DirectionalLight(0x4d9fff, 7.5);
        rim.position.set(-3.0, 1.2, -2.2);
        scene.add(rim);

        const fill = new THREE.DirectionalLight(0x8ab4ff, 0.7);
        fill.position.set(-1.4, -2.0, 1.6);
        scene.add(fill);

        scene.add(new THREE.AmbientLight(0x223044, 0.6));

        // ── Interaction ──────────────────────────────────────────────────
        const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
        const onPointerMove = (e: PointerEvent) => {
          const r = host!.getBoundingClientRect();
          pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });

        let raf = 0;
        let running = true;
        let visible = true;
        const clock = new THREE.Clock();

        const renderFrame = () => {
          if (!running) return;
          const t = clock.getElapsedTime();
          const p = readProgress();

          pointer.x += (pointer.tx - pointer.x) * 0.05;
          pointer.y += (pointer.ty - pointer.y) * 0.05;

          // Scroll turns the subject; the cursor only ever nudges it, so the
          // object never feels like it is being dragged around.
          subject.rotation.y = -0.5 + p * Math.PI * 1.15 + pointer.x * 0.22;
          subject.rotation.x = 0.14 + pointer.y * 0.12 + Math.sin(t * 0.35) * 0.02;
          subject.rotation.z = Math.sin(t * 0.27) * 0.012;

          // A slow dolly in as the chapter progresses.
          camera.position.z = baseDistance * (1 - p * 0.16);
          camera.position.x = -0.16 * radius + pointer.x * 0.06;
          camera.position.y = pointer.y * -0.12;
          camera.lookAt(-0.16 * radius, 0, 0);

          renderer.render(scene, camera);
          raf = requestAnimationFrame(renderFrame);
        };

        const resume = () => {
          if (running || disposed) return;
          running = true;
          clock.start();
          raf = requestAnimationFrame(renderFrame);
        };
        const pause = () => {
          running = false;
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        };

        // Stop rendering entirely when off-screen or the tab is hidden. A
        // 60fps WebGL loop nobody is looking at is pure battery cost.
        const viewIo = new IntersectionObserver(
          (entries) => {
            visible = entries[0]?.isIntersecting ?? true;
            visible ? resume() : pause();
          },
          { rootMargin: "120px" }
        );
        viewIo.observe(host!);

        const onVisibility = () => {
          document.visibilityState === "visible" && visible ? resume() : pause();
        };
        document.addEventListener("visibilitychange", onVisibility);

        const ro = new ResizeObserver(() => {
          const w = host!.clientWidth || 1;
          const h = host!.clientHeight || 1;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        });
        ro.observe(host!);

        setState("live");
        raf = requestAnimationFrame(renderFrame);

        teardown = () => {
          pause();
          viewIo.disconnect();
          ro.disconnect();
          window.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("visibilitychange", onVisibility);

          scene.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
            if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
            else mat?.dispose();
          });
          envTexture?.dispose();
          disposables.forEach((d) => d.dispose());
          disposables = [];

          renderer.domElement.remove();
          // Releases the WebGL context. Browsers cap live contexts at ~16 and
          // silently drop the oldest, so this is not optional.
          renderer.dispose();
          renderer.forceContextLoss();
        };
      } catch (err) {
        console.error("[ObjectStage] falling back to still:", err);
        if (!disposed) setState("fallback");
      }
    }

    return () => {
      disposed = true;
      io.disconnect();
      teardown?.();
    };
  }, [modelUrl, effectiveReducedMotion, forceDisabled, capabilities?.supported, capabilities?.lowPowerDevice, capabilities?.maxDpr]);

  return (
    <div ref={hostRef} className={`relative h-full w-full ${className}`}>
      {state !== "live" && (
        <Image
          src={fallbackImage}
          alt={fallbackAlt}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 60vw"
          className={`object-contain transition-opacity duration-700 ${
            state === "loading" ? "opacity-60" : "opacity-100"
          }`}
        />
      )}
    </div>
  );
}
