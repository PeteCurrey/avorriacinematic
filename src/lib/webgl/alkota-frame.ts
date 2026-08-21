import type * as THREE from "three";

/**
 * ALKOTA FRAME — procedural geometry
 *
 * The hero's subject until the real model arrives. This builds the front
 * triangle and rear stays of the Alkota frame from tube runs, which is the
 * part Alkota actually engineers and the one form on the bike that is both
 * recognisable and tractable to build well.
 *
 * Why not a whole bike: spokes, chain and drivetrain are exactly the geometry
 * that procedural generation and image-to-3D both fail at. A credible frame
 * beats an uncanny bicycle.
 *
 * The tubes are Catmull-Rom curves with a slight bow rather than straight
 * cylinders — carbon frames are moulded, not cut, and a dead-straight tube
 * reads as CAD scaffolding rather than a product.
 *
 * `buildAlkotaFrame` returns a single merged BufferGeometry so the whole
 * frame draws in one call.
 */

export interface FrameBuildOptions {
  /** Segment counts. Lower on constrained devices. */
  tubularSegments?: number;
  radialSegments?: number;
}

/** Side-profile anchor points, in a roughly 1-unit-tall frame. */
const P = {
  bottomBracket: [0, 0, 0] as const,
  headBottom: [0.95, 0.3, 0] as const,
  headTop: [1.06, 0.66, 0] as const,
  seatTop: [-0.28, 0.74, 0] as const,
  dropout: [-1.0, 0.06, 0] as const,
};

/** Half-width between the paired rear stays. */
const STAY_OFFSET = 0.058;

interface TubeSpec {
  from: readonly [number, number, number];
  to: readonly [number, number, number];
  radius: number;
  /** Perpendicular bow at the midpoint. Positive bows "outward". */
  bow?: number;
  /** Mirror the tube on both sides of the centre plane. */
  paired?: boolean;
}

const TUBES: TubeSpec[] = [
  // Front triangle
  { from: P.bottomBracket, to: P.headBottom, radius: 0.055, bow: 0.035 }, // down tube
  { from: P.seatTop, to: P.headTop, radius: 0.042, bow: 0.012 }, // top tube
  { from: P.bottomBracket, to: P.seatTop, radius: 0.047, bow: -0.008 }, // seat tube
  { from: P.headBottom, to: P.headTop, radius: 0.058 }, // head tube
  // Rear triangle, mirrored either side of the wheel
  { from: P.seatTop, to: P.dropout, radius: 0.024, bow: 0.02, paired: true }, // seat stays
  { from: P.bottomBracket, to: P.dropout, radius: 0.028, bow: 0.014, paired: true }, // chain stays
];

export async function buildAlkotaFrame(
  three: typeof THREE,
  options: FrameBuildOptions = {}
): Promise<THREE.BufferGeometry> {
  const { mergeGeometries } = await import("three/examples/jsm/utils/BufferGeometryUtils.js");

  const tubularSegments = options.tubularSegments ?? 48;
  const radialSegments = options.radialSegments ?? 14;

  const parts: THREE.BufferGeometry[] = [];

  const makeTube = (spec: TubeSpec, zOffset: number) => {
    const a = new three.Vector3(spec.from[0], spec.from[1], spec.from[2] + zOffset);
    const b = new three.Vector3(spec.to[0], spec.to[1], spec.to[2] + zOffset);

    const points: THREE.Vector3[] = [a];
    if (spec.bow) {
      // Bow the midpoint perpendicular to the run, in the side-view plane.
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const dir = b.clone().sub(a).normalize();
      const perp = new three.Vector3(-dir.y, dir.x, 0).multiplyScalar(spec.bow);
      points.push(mid.add(perp));
    }
    points.push(b);

    const curve = new three.CatmullRomCurve3(points, false, "catmullrom", 0.4);
    return new three.TubeGeometry(curve, tubularSegments, spec.radius, radialSegments, false);
  };

  for (const spec of TUBES) {
    if (spec.paired) {
      parts.push(makeTube(spec, STAY_OFFSET));
      parts.push(makeTube(spec, -STAY_OFFSET));
    } else {
      parts.push(makeTube(spec, 0));
    }
  }

  // Bottom bracket shell and head tube collars — the machined junctions that
  // make the moulded tubes read as an assembly rather than a wireframe.
  const bb = new three.CylinderGeometry(0.075, 0.075, 0.14, 24);
  bb.rotateX(Math.PI / 2);
  bb.translate(...(P.bottomBracket as unknown as [number, number, number]));
  parts.push(bb);

  for (const [pt, r] of [
    [P.headTop, 0.068],
    [P.headBottom, 0.068],
    [P.seatTop, 0.052],
  ] as const) {
    const collar = new three.CylinderGeometry(r, r, 0.05, 20);
    collar.rotateX(Math.PI / 2);
    collar.translate(pt[0], pt[1], pt[2]);
    parts.push(collar);
  }

  const merged = mergeGeometries(parts, false);
  parts.forEach((p) => p.dispose());

  if (!merged) throw new Error("Could not merge Alkota frame geometry");

  merged.computeVertexNormals();
  merged.center();
  return merged;
}
