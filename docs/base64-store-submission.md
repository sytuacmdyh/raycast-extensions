# Base64 Text Converter — 商店提交准备

## 当前状态

仅在本地准备，尚未创建审核 PR 或发布到公共商店。与时间戳插件的审核 PR 分开提交。

- 作者：`sytuacmdyh`，已验证 Raycast 账号。
- 商店标识：`base64-text-converter`。2026-11-06 检查时官方仓库尚无此目录，正式提交前需重新检查。
- 本地目录保留为 `extensions/base64/`，根目录开发命令仍为 `npm run dev -- base64`。
- 将来向官方仓库提交时，目标目录应为 `extensions/base64-text-converter/`，与 manifest 的 `name` 一致。
- 保留中文界面，使用英文商店标题和命令标题，并提供中文搜索关键词和双语 README。
- 独立 `package-lock.json` 用于脱离本仓库的安装；根目录锁文件用于本仓库 workspaces 安装。
- 构建和自动检查不代表实际 Raycast UI 已验证；真实截图与手动验证仍待完成。

## 已完成的验证（2026-11-06）

- WSL/Linux：仓库 `npm run check` 通过，包括所有扩展的构建、类型、源码 lint、格式检查及 19 项测试（Base64 6 项、时间戳 13 项）。
- Base64 官方 `ray lint` 通过：manifest、作者、512 × 512 PNG 图标、ESLint 和 Prettier。
- 将源码单独复制到工作区外的 `base64-text-converter` 目录后，使用扩展自己的锁文件执行 `npm ci`、构建、类型检查、官方 lint 和 6 项测试，全部通过。
- 尚未完成本次发布构建在 Windows/macOS Raycast 中的 UI、复制、反向转换和截图验证；自动检查不替代这些步骤。

## 开发与自动检查

在本仓库根目录运行：

```sh
npm ci
npm run dev -- base64
```

开发命令必须使用 Windows 或 macOS 原生 Node.js。Windows 可在本地仓库的 PowerShell 中运行，或通过 Raycast 的 **Import Extension** 选择 `extensions/base64`。插件标识由 `base64` 改为 `base64-text-converter` 后，旧开发安装可能仍然存在；新安装验证通过后可在 Raycast 设置中移除旧项。

针对本地扩展的检查命令（仓库根目录）：

```sh
npm run build --workspace extensions/base64
npm run typecheck --workspace extensions/base64
npm run store:check --workspace extensions/base64
npm test --workspace extensions/base64
npm run check
```

验证独立安装时，将扩展源码复制到一个不属于 npm workspace 的临时目录，排除 `node_modules/` 和 `dist/`，然后执行 `npm ci`、`npm run build`、`npm run typecheck`、`npm run store:check`、`npm test`。更新独立锁文件可在扩展目录运行 `npm install --package-lock-only --ignore-scripts --workspaces=false`。

`publish` 脚本用于以后正式提交；当前不要运行它。GitHub Release 不会自动提交到 Raycast Store。

## 提交前待办

- [ ] 在原生 Windows Raycast 运行发布构建，验证下表中的交互。
- [ ] 在 macOS Raycast 验证相同行为；如尚未验证，在 PR 中如实说明平台验证范围。
- [ ] 添加真实 Raycast 窗口截图至 `metadata/`，PNG、2000 × 1250，建议展示编码、解码和格式切换。
- [ ] 若 README 引用截图，另将对应文件放入 `media/`，不引用 `metadata/` 中的图片。
- [ ] 正式提交前重新运行自动检查，并确认官方仓库没有相同标识或高度重叠的待审 PR。
- [ ] 更新下方 PR 草稿的验证和截图说明后，再创建独立审核 PR。

| 场景                                        | 预期结果                           |
| ------------------------------------------- | ---------------------------------- |
| 标准格式编码 `你好`                         | `5L2g5aW9`，复制内容完全一致       |
| 标准格式编码 `f`                            | `Zg==`                             |
| URL 格式编码 `f`                            | `Zg`                               |
| 解码 `Zg` 和 `Zg==`                         | 均得到 `f`                         |
| 解码夹有 ASCII 空格、制表符、换行的有效输入 | 正常解码                           |
| 中文、Emoji、多行及首尾空格编码后反向转换   | 与原始输入一致                     |
| 输入 `Zg=`、`Zh==` 或格式不匹配的字母表     | 显示错误，不显示可复制的旧结果     |
| 标准格式解码 `/w==`                         | 显示无效 UTF-8 错误                |
| 清空输入后再次输入                          | 空输入显示空文本，新结果随输入更新 |
| 切换编码/解码和标准/URL 格式                | 立即按新设置重新计算               |

## PR 标题草稿

Add Base64 Text Converter extension

## PR 正文草稿

### Description

Add a UTF-8 text converter with a Simplified Chinese form interface. Users can choose encoding or decoding and standard Base64 or Base64URL, see results as they type, copy the result, or use it as input for the reverse conversion. Decoding validates the selected alphabet, padding, unused bits, and UTF-8 instead of silently replacing malformed bytes. All conversions happen locally, with no network requests or stored conversion history.

The Store already has [Base64](https://www.raycast.com/DanielSinclair/base64), including Windows support and clipboard conversion, as well as [Encoding Tools](https://www.raycast.com/eth-p/encoding-tools). This proposal combines an editable form, explicit format selection, strict text validation, and a Simplified Chinese interface. It does not claim Base64 conversion or Windows support is unique. Maintainers may prefer contributing these features to an existing extension; a new name alone does not resolve functional overlap.

### Screencast

Pending: add real screenshots of the extension running in Raycast before submitting. No screenshots or manual distribution-build UI verification have been completed for this submission preparation.

### Checklist

- [x] I read the extension guidelines.
- [x] I read the documentation about publishing.
- [ ] I ran `npm run build` and tested the distribution build in Raycast. (Automated checks alone do not complete this item.)
- [x] I checked that files in the `assets` folder are used by the extension itself.
- [ ] I checked that README media are correctly located. (Recheck after adding screenshots.)

## 官方参考

- [Prepare an Extension for Store](https://developers.raycast.com/basics/prepare-an-extension-for-store)
- [Publish an Extension](https://developers.raycast.com/basics/publish-an-extension)
- [Extension Guidelines](https://manual.raycast.com/extensions-guidelines)
