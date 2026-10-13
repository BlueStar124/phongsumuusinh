import type { NextConfig } from "next";
import path from "node:path";
import { existsSync } from "node:fs";

const projectRoot = process.cwd();
const workspaceRoot = existsSync(path.join(projectRoot, "node_modules/next"))
  ? projectRoot
  : path.resolve(projectRoot, "..");

const nextConfig: NextConfig = {
  turbopack: { root: workspaceRoot },
};

export default nextConfig;
