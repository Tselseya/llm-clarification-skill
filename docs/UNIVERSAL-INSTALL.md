# Universal Installation Guide

The project now ships one generalized skill package rather than separate Claude, ChatGPT, or Manus adapters. The same uppercase `SKILL.md` is intended to be uploaded or pasted wherever an LLM accepts reusable instructions.

## Download one package

Download the [universal skill ZIP](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.1/llm-clarification-skill-0.4.1-universal-skill.zip) or the [universal `.skill` package](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.1/llm-clarification-skill-0.4.1-universal.skill). Each archive contains exactly one root-level `SKILL.md` file plus a short README.

## Claude

Open **Customize > Skills**, choose **Add**, and upload the universal ZIP. Enable it after reviewing the contents. If the Skills feature is unavailable, open a Claude Project and paste the contents of `SKILL.md` into Project Instructions.

## ChatGPT

Where Skills are available, open **Skills > Create > Upload from your computer** and upload the universal ZIP. If Skills are unavailable, paste `SKILL.md` into Custom Instructions or a Project's instructions. The same file is used; there is no ChatGPT-specific adapter.

## Manus

Open **Skills > + Add > Upload a skill**, then upload the universal `.skill`, ZIP, or extracted folder. Manus can also import the public repository URL:

```text
https://github.com/Tselseya/llm-clarification-skill
```

## Any other LLM

Use one of these equivalent methods:

1. Upload the universal ZIP or `.skill` package if the LLM supports skills or knowledge files.
2. Paste the full contents of `SKILL.md` into a system prompt, developer prompt, custom instruction, project instruction, or equivalent highest-priority user-configurable field.
3. Use the compact copy near the end of `SKILL.md` when the instruction field has a length limit.

## Recommended test

After installation, test four requests: a clear routine request, an ambiguous complex request, a request where you answer “I don't know,” and a request followed by “proceed without more questions.” The model should ask only one concise question at a time when the missing detail could materially change the outcome.

## Important limitation

Uploading a skill does not technically force an LLM to follow it. The host platform's system instructions, safety rules, workspace settings, plan availability, and model behavior take priority.

## Official references

- [Claude custom skills](https://support.anthropic.com/en/articles/12512198-how-to-create-custom-skills)
- [ChatGPT Skills](https://help.openai.com/en/articles/20001066-skills-in-chatgpt)
- [Manus sharing and using Skills](https://help.manus.im/en/articles/14753565-how-to-share-and-use-skills-in-manus)
