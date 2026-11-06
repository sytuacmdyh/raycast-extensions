import { Buffer } from "node:buffer";
import { TextDecoder } from "node:util";

export type ConversionMode = "encode" | "decode";
export type Base64Format = "base64" | "base64url";
export type ConversionResult = { value: string } | { error: string };

export function convertBase64(
  input: string,
  mode: ConversionMode,
  format: Base64Format = "base64",
): ConversionResult {
  if (mode === "encode") {
    return { value: Buffer.from(input, "utf8").toString(format) };
  }
  const compact = input.replace(/[\t\n\r ]/g, "");
  const alphabet = format === "base64" ? /^[A-Za-z0-9+/]*={0,2}$/ : /^[A-Za-z0-9_-]*={0,2}$/;
  if (!alphabet.test(compact)) {
    return { error: "包含非法字符或填充位置不正确，请检查所选 Base64 格式。" };
  }
  const unpadded = compact.replace(/=+$/, "");
  const remainder = unpadded.length % 4;
  const padding = compact.length - unpadded.length;
  if (remainder === 1 || (padding > 0 && (remainder === 0 || padding !== 4 - remainder))) {
    return { error: "Base64 长度或末尾的 = 填充数量不正确。" };
  }
  const bytes = Buffer.from(unpadded, format);
  // Buffer's decoder is permissive; round-trip to reject nonzero unused bits.
  if (bytes.toString(format).replace(/=+$/, "") !== unpadded) {
    return { error: "Base64 尾部填充位无效，无法可靠解码。" };
  }
  try {
    return { value: new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes) };
  } catch {
    return { error: "解码后的数据不是有效的 UTF-8 文本；此工具不支持二进制文件。" };
  }
}
