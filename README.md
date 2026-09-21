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

## Download and load the extension MVP in Chrome

You do not install this MVP from the Chrome Web Store yet. Download the repository as a ZIP from GitHub using [this direct download link](https://github.com/Tselseya/llm-clarification-skill/archive/refs/heads/main.zip), or open the repository, click the green **Code** button, and choose **Download ZIP**.

After downloading:

1. Extract the ZIP file. Do not select the ZIP itself in Chrome.
2. Open `chrome://extensions` in Chrome.
3. Turn on **Developer mode** in the upper-right corner.
4. Click **Load unpacked**.
5. Open the extracted repository folder and select its **`extension` subfolder**. Select the folder containing `manifest.json`, not the repository root.
6. Confirm that **LLM Clarification Skill** appears in the extension list and is enabled.
7. Open a chat website, type a long or ambiguous prompt, and submit it. The extension may open a clarification panel.
8. Answer the current question, choose **Continue**, and repeat as needed. Choose **Bypass and send** at any time.

For local testing, use the included [`extension/test-fixture.html`](extension/test-fixture.html), or serve the extension directory with `python3 -m http.server 8000` and open `http://localhost:8000/test-fixture.html`. If you open the fixture as a `file://` URL instead, enable **Allow access to file URLs** for the extension on `chrome://extensions`.

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
