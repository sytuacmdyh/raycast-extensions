# Base64 编解码

在 Raycast 中搜索 **Base64 编解码**，选择编码或解码，输入或粘贴文本，即时显示结果。通过操作菜单复制结果，也可选择「将结果反向转换」或「清空输入」。

- 支持 UTF-8 中文、Emoji 和多行文本，编码保留原始空格、换行。
- 标准 Base64 使用 `+/` 并保留 `=` 填充；Base64URL 使用 `-_` 并省略填充。
- 解码接受有填充或无填充的输入，忽略 ASCII 空格、制表符和换行。
- 非法字符、错误长度、填充和尾部填充位会显示错误；非 UTF-8 二进制数据不作为文本输出。
- 空输入对应空输出；转换在本机完成，不请求网络、不保存转换历史。

在仓库根目录安装依赖后运行：

```sh
npm run dev -- base64
```

也可在 Raycast 的 **Import Extension** 中选择本扩展目录。Windows 使用 Windows 原生 Node.js 运行开发命令；macOS 使用本机 Node.js。首次使用前，将 `package.json` 中的 `author` 替换为你的 Raycast 用户名。

验证命令（仓库根目录）：

```sh
npm test --workspace base64
npm run check
```

自动测试覆盖转换及异常输入。实际 Raycast 界面、导入和剪贴板行为需在 Windows / macOS 上验证。
