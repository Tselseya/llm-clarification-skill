# Platform Upload and Installation Guide

This guide covers the portable skill packages. The browser extension is a separate product and is not required to use the skill.

## Claude

Download the [Claude skill package](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.3.0/llm-clarification-skill-0.3.0-claude.zip) or inspect the source under [`packages/claude/`](../packages/claude/). In Claude, open **Customize > Skills**, choose **Add**, and upload the ZIP. Review the skill contents, enable it, and test it with a routine request and a complex request. Claude custom skills require the relevant Claude feature and account/workspace access; availability can vary by plan and workspace settings.

The Claude package uses a skill directory containing `skill.md` with YAML frontmatter. The frontmatter identifies the skill and tells Claude when it is relevant. Do not upload secrets, private conversations, or executable files you have not reviewed.

If Skills are unavailable, paste [`platform/claude-project-instructions.md`](../platform/claude-project-instructions.md) into Claude Project Instructions instead.

## ChatGPT

Download the [ChatGPT skill package](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.3.0/llm-clarification-skill-0.3.0-chatgpt.zip) or inspect the source under [`packages/chatgpt/`](../packages/chatgpt/). Where ChatGPT Skills are available, open **Skills > Create > Upload from your computer**, select the ZIP, and review the scan result before installing. Skills availability and workspace permissions vary by ChatGPT product and plan.

If the Skills upload area is unavailable, copy [`platform/chatgpt-custom-instructions.md`](../platform/chatgpt-custom-instructions.md) into Custom Instructions or a ChatGPT Project's instructions. The platform-specific file is intentionally shorter than the full universal skill.

## Manus

Download the [Manus `.skill` package](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.3.0/llm-clarification-skill-0.3.0-manus.skill) or inspect the source under [`packages/manus/`](../packages/manus/). In Manus, open **Skills**, choose **+ Add**, select **Upload a skill**, and upload the ZIP, `.skill`, or extracted folder. Manus also supports importing a public GitHub repository; use `https://github.com/Tselseya/llm-clarification-skill`.

After import, enable or invoke the skill in a test conversation. Review the repository before importing because community skills may contain scripts or other resources.

## Generic API or local model

Use [`platform/generic-system-prompt.md`](../platform/generic-system-prompt.md) as a system prompt. A system prompt guides model behavior but cannot override the host application's system instructions or guarantee that a model will ask questions.

## Installation review checklist

Review the package contents before uploading. Confirm that the package contains only the expected Markdown files, that no API keys or personal conversations are included, and that any scripts are understood. Test a simple unambiguous task, a complex task, a task with missing information, and an explicit “proceed without more questions” override.

## Official references

- [Claude custom skills](https://support.anthropic.com/en/articles/12512198-how-to-create-custom-skills)
- [ChatGPT Skills](https://help.openai.com/en/articles/20001066-skills-in-chatgpt)
- [Manus sharing and using Skills](https://help.manus.im/en/articles/14753565-how-to-share-and-use-skills-in-manus)
