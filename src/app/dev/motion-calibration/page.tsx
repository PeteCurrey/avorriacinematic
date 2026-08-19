import { Metadata } from "next";
import { MotionCalibrationClient } from "@/components/dev/MotionCalibrationClient";

export const metadata: Metadata = {
  title: "Motion Calibration — Avorria Dev",
  robots: { index: false, follow: false },
};

export default function MotionCalibrationPage() {
  return <MotionCalibrationClient />;
}
