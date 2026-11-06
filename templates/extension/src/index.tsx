import { Action, ActionPanel, Detail } from "@raycast/api";

export default function Command() {
  return (
    <Detail
      markdown="# 扩展已就绪\n\n编辑 `src/index.tsx`，开始开发你的 Windows / macOS 扩展。"
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            title="Open API Documentation"
            url="https://developers.raycast.com"
          />
        </ActionPanel>
      }
    />
  );
}
