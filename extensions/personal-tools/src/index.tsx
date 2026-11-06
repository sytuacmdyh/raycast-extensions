import { Action, ActionPanel, Detail, environment } from "@raycast/api";
import os from "node:os";

export default function Command() {
  const platform = process.platform === "win32" ? "Windows" : "macOS";
  const summary = `平台：${platform}\n架构：${os.arch()}\nRaycast：${environment.raycastVersion}\nNode.js：${process.version}`;

  return (
    <Detail
      markdown={`# Personal Tools\n\n你的自定义扩展已就绪。\n\n- **平台**：${platform}\n- **架构**：${os.arch()}\n- **Raycast**：${environment.raycastVersion}\n- **Node.js**：${process.version}\n\n编辑此扩展的源文件即可开始添加自己的工具。`}
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Environment Info" content={summary} />
          <Action.OpenInBrowser
            title="Open API Documentation"
            url="https://developers.raycast.com"
          />
        </ActionPanel>
      }
    />
  );
}
