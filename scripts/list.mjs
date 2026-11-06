import { extensions } from "./workspace.mjs";
console.table(
  (await extensions()).map(({ directory, manifest }) => ({
    扩展: directory,
    名称: manifest.title,
    平台: manifest.platforms.join(" / "),
    命令数: manifest.commands.length,
  })),
);
