# 自定义扩展

从仓库根目录运行 `npm run dev -- <本目录名>`。

- 在 `src/` 中编写命令，并在 `package.json` 的 `commands` 中登记。
- `author` 替换为自己的 Raycast 用户名。
- 默认支持 Windows / macOS；使用平台专属 API 前检查 `process.platform`。
- 密钥通过 Raycast 的 password 类型 preferences 配置，不提交到 Git。
