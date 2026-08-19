import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const commitSha = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || "1c47c84b7fcd0de475b9689c8c2f7654e6408155";
  const buildTime = new Date().toISOString();

  return NextResponse.json({
    app: "Avorria Cinematic Canvas",
    version: "2.0.0-directors-cut",
    commitSha,
    shortSha: commitSha.slice(0, 7),
    architecture: "8-chapter-canonical",
    buildTime,
    status: "production-approved"
  });
}
