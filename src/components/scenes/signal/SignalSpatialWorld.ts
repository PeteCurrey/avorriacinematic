import * as THREE from "three";
import { SIGNAL_GALLERY_PROJECTS } from "@/lib/scenes/signal-gallery-config";

export class SignalSpatialWorld {
  private container: HTMLElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private textureLoader: THREE.TextureLoader;
  private projectMeshes: { mesh: THREE.Mesh; config: typeof SIGNAL_GALLERY_PROJECTS[0] }[] = [];
  
  private currentProgress = 0;
  private targetPointerX = 0;
  private targetPointerY = 0;
  private currentPointerX = 0;
  private currentPointerY = 0;
  private isDisposed = false;
  private animationFrameId: number | null = null;

  constructor(container: HTMLElement, dprCap = 1.5) {
    this.container = container;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#080808");

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 500);
    this.camera.position.set(0, 0, 10);

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true,
      alpha: false
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this.container.appendChild(this.renderer.domElement);
    this.textureLoader = new THREE.TextureLoader();

    this.initProjects();

    this.render = this.render.bind(this);
    this.render();
  }

  private initProjects() {
    SIGNAL_GALLERY_PROJECTS.forEach((config) => {
      const geometry = new THREE.PlaneGeometry(config.width, config.height);
      const texture = this.textureLoader.load(config.mediaSrc, () => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
      });

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.0,
        side: THREE.FrontSide
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(config.baseX, config.baseY, config.baseZ);
      mesh.rotation.y = config.rotationY;

      this.scene.add(mesh);
      this.projectMeshes.push({ mesh, config });
    });
  }

  public setProgress(progress: number) {
    this.currentProgress = Math.max(0, Math.min(1, progress));
  }

  public setPointer(x: number, y: number) {
    this.targetPointerX = x;
    this.targetPointerY = y;
  }

  public resize(width: number, height: number) {
    if (this.isDisposed || !this.renderer || !this.camera) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private render() {
    if (this.isDisposed) return;

    this.currentPointerX += (this.targetPointerX - this.currentPointerX) * 0.05;
    this.currentPointerY += (this.targetPointerY - this.currentPointerY) * 0.05;

    this.camera.position.x = this.currentPointerX * 0.4;
    this.camera.position.y = this.currentPointerY * 0.3;
    this.camera.lookAt(0, 0, -30);

    const p = this.currentProgress;

    this.projectMeshes.forEach(({ mesh, config }) => {
      const { startProgress, heroProgress, exitProgress, baseX, baseY, baseZ, heroZ, exitZ, rotationY } = config;

      if (p < startProgress) {
        mesh.position.set(baseX, baseY, baseZ);
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0;
        mesh.visible = false;
      } else if (p >= startProgress && p < heroProgress) {
        mesh.visible = true;
        const localT = (p - startProgress) / (heroProgress - startProgress);
        const z = THREE.MathUtils.lerp(baseZ, heroZ, localT);
        mesh.position.set(baseX, baseY, z);
        (mesh.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(0.1, 1.0, localT);
        mesh.rotation.y = THREE.MathUtils.lerp(rotationY, 0, localT);
      } else if (p >= heroProgress && p <= exitProgress) {
        mesh.visible = true;
        const localT = (p - heroProgress) / (exitProgress - heroProgress);
        const z = THREE.MathUtils.lerp(heroZ, exitZ, localT);
        
        if (config.slug === "alkota-bikes") {
          mesh.position.set(0, 0, z);
          (mesh.material as THREE.MeshBasicMaterial).opacity = 1.0;
        } else {
          const xOffset = baseX > 0 ? baseX + localT * 4 : baseX - localT * 4;
          mesh.position.set(xOffset, baseY, z);
          (mesh.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(1.0, 0.0, localT * 1.5);
        }
      } else {
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0;
        mesh.visible = false;
      }
    });

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.render);
  }

  public dispose() {
    this.isDisposed = true;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.projectMeshes.forEach(({ mesh }) => {
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat.map) mat.map.dispose();
        mat.dispose();
      }
    });

    this.scene.clear();
    this.renderer.dispose();

    if (this.renderer.domElement && this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
