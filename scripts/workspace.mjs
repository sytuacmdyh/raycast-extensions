import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { spawn } from "node:child_process";

export const root = fileURLToPath(new URL("../", import.meta.url));
export async function extensions() {
  const entries = await readdir(path.join(root, "extensions"), { withFileTypes: true });
  return Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(async (entry) => ({
        directory: entry.name,
        manifest: JSON.parse(
          await readFile(path.join(root, "extensions", entry.name, "package.json"), "utf8"),
        ),
      })),
  );
}
export function runNpm(args) {
  const cli = process.env.npm_execpath;
  if (!cli) throw new Error("请通过 npm run 调用此脚本。");
  const child = spawn(process.execPath, [cli, ...args], { cwd: root, stdio: "inherit" });
  child.on("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
  child.on("exit", (code) => {
    process.exitCode = code ?? 1;
  });
}
