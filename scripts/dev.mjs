import { extensions, runNpm } from "./workspace.mjs";
const name = process.argv[2];
const items = await extensions();
if (!items.some((item) => item.directory === name)) {
  console.error(
    `用法：npm run dev -- <扩展目录名>\n可用扩展：${items.map((item) => item.directory).join(", ")}`,
  );
  process.exitCode = 1;
} else if (!["darwin", "win32"].includes(process.platform)) {
  console.error(
    "Raycast 开发模式需要 macOS 或 Windows 原生 Node.js。WSL/Linux 可运行 npm run check；Windows 请在 PowerShell 的本地仓库中开发。",
  );
  process.exitCode = 1;
} else {
  runNpm(["run", "dev", "--workspace", `extensions/${name}`]);
}
