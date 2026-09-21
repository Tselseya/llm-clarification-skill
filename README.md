# LLM Clarification Skill

A portable, platform-neutral skill that makes an LLM decide when clarification is necessary, ask **one useful question at a time**, and stop when the task is actionable. It includes platform-specific instruction copies and a lightweight browser-extension MVP for stronger, user-controlled interception.

## What this is—and is not

The skill is an instruction layer for ChatGPT, Claude, Manus, APIs, local models, and other assistants. It encourages adaptive clarification based on complexity instead of forcing a fixed number of questions. A prompt or uploaded skill cannot technically override a platform's system instructions or guarantee compliance.

The browser extension adds a generic, local-first workflow: it detects likely ambiguous prompts, pauses sending long or underspecified requests, asks one question at a time, and appends a structured requirements brief. Users can bypass the workflow at any time.

## Repository map

| Path | Purpose |
|---|---|
| `SKILL.md` | Universal skill and compact copy |
| `platform/` | Copies adapted for ChatGPT, Claude, Manus, and generic system prompts |
| `extension/` | Dependency-free Manifest V3/WebExtension MVP |
| `PRIVACY.md` | Data handling and privacy choices |
| `LICENSE` | MIT license |

## Use the skill

Copy `SKILL.md` into a platform's project instructions, custom instructions, system prompt, or skill/knowledge upload area. For a shorter field, use the compact copy at the bottom of the file. Platform-specific versions are in `platform/`.

The skill asks the model to infer low-risk details, verify important assumptions, ask exactly one question when needed, and adapt the number of questions to complexity. It does not require a confirmation for routine work and always respects an explicit user request to proceed.

## Load the extension MVP

1. Open the browser's extension manager.
2. Enable developer mode.
3. Choose **Load unpacked** and select the `extension/` directory.
4. Open any chat site, type a prompt, and submit it. The extension uses a local heuristic and may open a clarification panel.
5. Answer the current question, choose **Continue**, and repeat as needed. Choose **Bypass and send** at any time.

The generic adapter watches common `textarea` and `contenteditable` composers and common submit controls. Site-specific DOM changes can reduce reliability; the manual side-panel flow remains available from the extension icon. No build step or npm dependency is required.

## Privacy modes

The MVP is local-only by default. It does not send prompt text to a server. The options page provides a local retention toggle and an optional third-party analysis endpoint setting for advanced users who deliberately configure one. Review `PRIVACY.md` before enabling external analysis.

## Design principles

- **One question at a time:** reduce user friction and maximize answer quality.
- **Adaptive stopping:** ask until actionable, not until a fixed count.
- **User control:** explicit bypass always works.
- **Risk-aware:** high-impact tasks receive stronger assumption checks.
- **Portable:** the core behavior is plain Markdown, not vendor-specific code.
- **Honest enforcement:** instructions guide models; the extension provides stronger local interception but cannot control every website implementation.

## Roadmap

Future work can add signed releases, site-specific adapters, accessibility testing, browser-store packaging, optional model-backed ambiguity scoring, encrypted local history, and a formal evaluation set for question quality and unnecessary-question rate.

## License

MIT. See [`LICENSE`](LICENSE).
