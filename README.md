# Personal Raycast Extensions

统一管理个人 Raycast 扩展的 npm workspaces 仓库。每个 `extensions/<name>` 都是独立扩展，可以包含多个命令，默认声明 Windows 和 macOS 支持。

## 开始使用

在 Windows 和 Mac 上分别安装 Raycast、登录账号，并安装 **Node.js 24 LTS**（当前锁定的 API 要求至少 22.22.2）。Windows 使用原生 PowerShell + Windows Node.js；建议将仓库放在本地 Windows 路径，如 `C:\code\raycast-extensions`。不要用 WSL 的 Node 启动 Windows Raycast 开发模式。

在仓库根目录执行：

```sh
npm ci
npm run list
npm run dev -- personal-tools
```

`ray develop` 会导入所选扩展并监听修改。在 Raycast 中搜索 **Extension Home**。首次使用前，将各扩展 `package.json` 中的 `author: "your-raycast-handle"` 改为自己的 Raycast 用户名；模板中的同名字段也可一并修改。

也可以在 Raycast 中执行 **Import Extension**，选择 `extensions/personal-tools`，而不是仓库根目录。开发模式下终端需要保持运行；停止开发监听后可通过 Import Extension 重新导入源码。

## 时间戳转换

已新增 `timestamp-converter`：时间戳与日期字符串互转，并每秒刷新当前本地时间、UTC、秒及毫秒时间戳。

```sh
npm run dev -- timestamp-converter
```

在 Raycast 中搜索 **时间戳转换**；详见 [使用说明](extensions/timestamp-converter/README.md)。

## Base64 编解码

`base64` 支持 UTF-8 文本编码、解码，提供标准 Base64 和 Base64URL 格式、即时结果和复制操作。

```sh
npm run dev -- base64
```

在 Raycast 中搜索 **Base64 编解码**；详见 [使用说明](extensions/base64/README.md)。

## 新建与管理扩展

```sh
npm run new -- my-tool "我的工具"
npm install
npm run dev -- my-tool
```

生成器拒绝非法目录名、Windows 保留名称及已有扩展，不覆盖现有文件。新建扩展后提交更新的 `package-lock.json`。

| 命令                           | 用途                                         |
| ------------------------------ | -------------------------------------------- |
| `npm run list`                 | 查看仓库中的扩展、平台和命令数量             |
| `npm run new -- <name> "标题"` | 从模板生成一个扩展                           |
| `npm run dev -- <name>`        | 在本机 Raycast 中开发指定扩展                |
| `npm run build`                | 构建所有扩展到各自 `dist/`，不安装到 Raycast |
| `npm run typecheck`            | 检查所有扩展的 TypeScript 类型               |
| `npm run lint`                 | 使用 Raycast ESLint 配置检查源码             |
| `npm run check`                | 构建、类型、源码 lint、转换测试和格式检查    |
| `npm run format`               | 统一格式                                     |

`lint` 直接调用 ESLint，不做商店账号或发布资格校验。仓库没有自动发布脚本。GitHub Actions 已配置 Linux、Windows、macOS 检查矩阵，推送到 GitHub 后才会执行。

## 目录

```text
extensions/
  base64/              # UTF-8 文本与 Base64 / Base64URL 互转
  timestamp-converter/ # 时间戳与日期互转、当前时间实时更新
  personal-tools/       # 已创建的跨平台示例：显示并复制运行环境
    src/index.tsx       # 命令入口
    assets/             # 图标等资源
    package.json        # Raycast manifest 和扩展依赖
scripts/                # 新建、列出、开发入口
templates/extension/   # 新扩展模板（package.json.template）
.github/workflows/      # 跨平台 CI
package.json            # 工作区和统一命令
package-lock.json       # 两个平台使用同一份依赖锁文件
```

`.npmrc` 使用 nested 安装策略，让 Raycast CLI 能找到各扩展本地的 TypeScript 编译器。每个扩展声明自己的开发依赖，根目录提供统一命令。暂不抽取共享包，多个扩展出现实际重复逻辑后再增加 `packages/`。

## 添加命令和保持跨平台

1. 在扩展 `src/` 下新增 `.ts` 或 `.tsx` 文件。
2. 在扩展 `package.json` 的 `commands` 中登记，`name` 必须与入口文件名一致。
3. 优先使用 Raycast API（如 `Action.OpenInBrowser`、`Clipboard`）及 Node 内置 API。
4. 路径使用 `node:path` / `node:os`，不要硬编码盘符或 `/Users/...`。
5. 必须使用 AppleScript、PowerShell 或平台专属 API 时，按 `process.platform` 分支；如果仅支持单平台，应调整 manifest 的 `platforms`，并在不支持的平台给出明确提示。
6. 密钥使用 password 类型 preferences，机器目录使用 directory 类型 preferences，不写入源码。

## 两台电脑同步

将整个项目放入自己的 Git 仓库，两台电脑分别克隆。每次拉取源码后运行 `npm ci`，再在该电脑上开发或导入所需的扩展。Git 同步的是源码，不会自动安装另一台电脑的扩展，也不会迁移 preferences、密钥或 LocalStorage 数据；这些需在各设备配置。

不要同步 `node_modules/`、`dist/`，不要把机器绝对路径提交到仓库。扩展的 npm `private: true` 防止误发 npm；它不是 Raycast 团队私有商店权限配置。

## 官方参考

- [开发环境要求](https://developers.raycast.com/basics/getting-started)
- [Manifest 与 platforms 字段](https://developers.raycast.com/information/manifest)
- [CLI：develop / build](https://developers.raycast.com/information/developer-tools/cli)

## 验证范围

创建时在 WSL/Linux 验证构建和静态检查。Windows / macOS 的实际 Raycast UI、导入、剪贴板行为需要在各平台运行确认；CI 配置不等于已经执行过这些平台测试。

## 当前依赖审计

创建时 `npm audit` 报告 16 项 moderate、0 项 high / critical，均关联间接依赖 minimatch 的 [glob 匹配拒绝服务公告](https://github.com/advisories/GHSA-g3hv-75wg-m249)，主要涉及 CLI 与 lint 工具链。未使用 `audit fix --force` 降级 Raycast API 或强制跨主版本替换间接依赖。后续升级官方依赖后应重新审计。
