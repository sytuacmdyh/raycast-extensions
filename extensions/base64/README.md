# Base64 Text Converter

Convert UTF-8 text to and from standard Base64 or Base64URL. The command interface is in Simplified Chinese and works locally without an account or external service.

## Usage

1. Open **Convert Base64 Text** (also searchable as **Base64 编解码**).
2. Choose **编码：文本 → Base64** to encode or **解码：Base64 → 文本** to decode.
3. Select standard Base64 or Base64URL, then type or paste your input. The result updates as you type.
4. Use **复制结果** to copy the result, **将结果反向转换** to use it as input for the opposite operation, or **清空输入** to clear the input.

| Format          | Alphabet                      | Encoding padding         | Example: `f` |
| --------------- | ----------------------------- | ------------------------ | ------------ |
| Standard Base64 | `A–Z`, `a–z`, `0–9`, `+`, `/` | Includes `=` when needed | `Zg==`       |
| Base64URL       | `A–Z`, `a–z`, `0–9`, `-`, `_` | Omits `=`                | `Zg`         |

Both formats accept correctly padded or unpadded input when decoding. ASCII spaces, tabs, and line breaks in encoded input are ignored. The selected format determines which alphabet is accepted; formats are not detected automatically.

Chinese characters, emoji, and multiline text are supported. Encoding preserves the original spaces and line breaks. For example, `你好` encodes to `5L2g5aW9` in either format.

Malformed characters, lengths, padding, or nonzero unused bits produce an error. Decoding rejects data that is not valid UTF-8; this extension does not convert binary files. Empty input produces empty output.

## Privacy

Conversions run on your device. The extension makes no network requests and stores no conversion history. Text is copied to the system clipboard only when you use the copy action.

## 中文说明

在 Raycast 中搜索 **Convert Base64 Text** 或 **Base64 编解码**，选择编码或解码，以及标准 Base64 或 Base64URL 格式。输入或粘贴文本后即时显示结果，通过操作菜单复制结果、反向转换或清空输入。

- 支持 UTF-8 中文、Emoji 和多行文本，编码保留原始空格、换行。
- 标准 Base64 使用 `+/` 并保留 `=` 填充；Base64URL 使用 `-_` 并省略填充。
- 解码接受正确填充或无填充的输入，忽略 ASCII 空格、制表符和换行。格式需要手动选择。
- 非法字符、错误长度、填充和尾部填充位会显示错误；非 UTF-8 二进制数据不作为文本输出。
- 空输入对应空输出；转换在本机完成，不请求网络、不保存转换历史，仅在使用复制操作时写入系统剪贴板。
