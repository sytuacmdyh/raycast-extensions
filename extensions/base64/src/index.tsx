import { Action, ActionPanel, Form, Icon } from "@raycast/api";
import { useState } from "react";
import { convertBase64, type Base64Format, type ConversionMode } from "./base64";

export default function Command() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ConversionMode>("encode");
  const [format, setFormat] = useState<Base64Format>("base64");
  const result = convertBase64(input, mode, format);

  return (
    <Form
      actions={
        <ActionPanel>
          {"value" in result && (
            <>
              <Action.CopyToClipboard title="复制结果" content={result.value} />
              <Action
                title="将结果反向转换"
                icon={Icon.ArrowClockwise}
                onAction={() => {
                  setInput(result.value);
                  setMode(mode === "encode" ? "decode" : "encode");
                }}
              />
            </>
          )}
          <Action title="清空输入" icon={Icon.Trash} onAction={() => setInput("")} />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="mode" title="操作" value={mode} onChange={(value) => setMode(value as ConversionMode)}>
        <Form.Dropdown.Item value="encode" title="编码：文本 → Base64" />
        <Form.Dropdown.Item value="decode" title="解码：Base64 → 文本" />
      </Form.Dropdown>
      <Form.Dropdown id="format" title="格式" value={format} onChange={(value) => setFormat(value as Base64Format)}>
        <Form.Dropdown.Item value="base64" title="标准 Base64（+/，保留填充）" />
        <Form.Dropdown.Item value="base64url" title="Base64URL（-_，省略填充）" />
      </Form.Dropdown>
      <Form.TextArea
        id="input"
        title={mode === "encode" ? "原始文本" : "Base64 文本"}
        placeholder={mode === "encode" ? "输入或粘贴文本，支持中文和多行" : "输入或粘贴 Base64"}
        value={input}
        onChange={setInput}
        error={"error" in result ? result.error : undefined}
      />
      <Form.Description
        title="转换结果"
        text={"value" in result ? result.value || "（空文本）" : "无法解码，请检查输入和所选格式。"}
      />
      <Form.Description text="输入后即时转换，使用操作菜单复制结果。文本使用 UTF-8；解码允许省略填充及包含空格、换行。所有转换均在本机完成。" />
    </Form>
  );
}
