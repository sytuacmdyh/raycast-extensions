import { cp, mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { root } from "./workspace.mjs";

const [name, ...titleParts] = process.argv.slice(2);
if (
  !name ||
  name.length > 64 ||
  !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(name) ||
  /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/.test(name)
) {
  console.error(
    '用法：npm run new -- my-extension "我的扩展"\n名称须为小写字母、数字及短横线，字母开头，最长 64 字符，不能使用 Windows 保留名称。',
  );
  process.exitCode = 1;
} else {
  const destination = path.join(root, "extensions", name);
  try {
    await mkdir(path.join(root, "extensions"), { recursive: true });
    await mkdir(destination); // Exclusive creation: never overwrite an existing extension.
    await cp(path.join(root, "templates", "extension"), destination, {
      recursive: true,
      force: false,
    });
    const source = path.join(destination, "package.json.template");
    const manifest = JSON.parse(await readFile(source, "utf8"));
    manifest.name = name;
    manifest.title = titleParts.join(" ") || name;
    manifest.description = `${manifest.title} — 自定义跨平台 Raycast 扩展`;
    await writeFile(source, JSON.stringify(manifest, null, 2) + "\n");
    await rename(source, path.join(destination, "package.json"));
    console.log(
      `已创建 extensions/${name}\n下一步：npm install，然后 npm run dev -- ${name}\n请将 package.json 中的 author 替换为你的 Raycast 用户名。`,
    );
  } catch (error) {
    console.error(error.code === "EEXIST" ? `扩展 ${name} 已存在，未覆盖。` : error.message);
    process.exitCode = 1;
  }
}
