# LLM Clarification Skill

A portable, platform-neutral skill that makes an LLM decide when clarification is necessary, ask **one useful question at a time**, and stop when the task is actionable. It includes one universal upload package and a lightweight browser-extension MVP for stronger, user-controlled interception.

## What this is—and is not

The skill is an instruction layer for ChatGPT, Claude, Manus, APIs, local models, and other assistants. It encourages adaptive clarification based on complexity instead of forcing a fixed number of questions. A prompt or uploaded skill cannot technically override a platform's system instructions or guarantee compliance.

The browser extension adds a generic, local-first workflow: it detects likely ambiguous prompts, pauses sending long or underspecified requests, asks one question at a time, and appends a structured requirements brief. Users can bypass the workflow at any time.

## Repository map

| Path | Purpose |
|---|---|
| `SKILL.md` | Universal skill and compact copy |
| `packages/llm-clarification-skill/` | One universal upload package for any compatible LLM |
| `extension/` | Dependency-free Manifest V3/WebExtension MVP |
| `assets/` | Logo concepts and selected extension branding |
| `PRIVACY.md` | Data handling and privacy choices |
| `LICENSE` | MIT license |

## Use the skill

Copy `SKILL.md` into any LLM's project instructions, custom instructions, system prompt, or skill/knowledge upload area. For a shorter field, use the compact copy at the bottom of the file. The same file is intended for Claude, ChatGPT, Manus, APIs, local models, and other compatible LLMs.

The skill asks the model to infer low-risk details, verify important assumptions, ask exactly one question when needed, and adapt the number of questions to complexity. It does not require a confirmation for routine work and always respects an explicit user request to proceed.

## One universal upload package

Download the single [universal skill ZIP](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.0/llm-clarification-skill-0.4.0-universal-skill.zip) or [universal `.skill` package](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.0/llm-clarification-skill-0.4.0-universal.skill). Both contain the same `skill.md`. Upload that one package wherever your LLM supports reusable skills, or paste `skill.md` into its instruction field. See [`docs/UNIVERSAL-INSTALL.md`](docs/UNIVERSAL-INSTALL.md).

Claude users can upload it under **Customize > Skills**. ChatGPT users can use **Skills > Create > Upload from your computer** where that feature is available. Manus users can use **Skills > + Add > Upload a skill** or import this public repository. No platform-specific skill adapters are required.

## Quick download and install

The easiest route is to download the latest release asset from the [GitHub Releases page](https://github.com/Tselseya/llm-clarification-skill/releases): [Chrome/Chromium ZIP](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.0/llm-clarification-skill-0.4.0-chrome.zip) or [Firefox XPI](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.0/llm-clarification-skill-0.4.0-firefox.xpi).

The repository currently provides a developer-mode package rather than a store-signed extension. That means Chrome still requires Developer mode and Firefox may require a temporary/developer install unless the XPI is signed by Mozilla.

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

The generic content script watches common `textarea` and `contenteditable` composers and common submit controls. Website DOM changes can reduce reliability; the manual side-panel flow remains available from the extension icon. No build step or npm dependency is required.

## Firefox

Download the XPI from the [GitHub Releases page](https://github.com/Tselseya/llm-clarification-skill/releases). For local development, open `about:debugging`, select **This Firefox**, choose **Load Temporary Add-on**, and select `manifest.json` inside the extracted `extension/` directory. A production Firefox install requires a signed add-on.

## Branding

The selected logo is an indigo speech bubble with three white dots and a cyan question-mark badge, representing conversation and clarification. Icon sizes are included in `extension/icons/`. Alternate concepts remain in `assets/` for future branding revisions.

## Privacy modes

The MVP is local-only by default. It does not send prompt text to a server. The options page provides a local retention toggle and an optional third-party analysis endpoint setting for advanced users who deliberately configure one. Review `PRIVACY.md` before enabling external analysis.

## Policies and risk review

The repository includes a [Privacy Policy](docs/PRIVACY-POLICY.md), [Terms and Conditions](docs/TERMS-AND-CONDITIONS.md), [Cookie Policy](docs/COOKIE-POLICY.md), [Form Consent statement](docs/FORM-CONSENT.md), [Accessibility QA record](docs/ACCESSIBILITY.md), [Copyright and Brand Review](docs/COPYRIGHT-AND-BRAND-REVIEW.md), [Owner Disclosure](docs/OWNER-DISCLOSURE.md), and [Risk Register](docs/RISK-REGISTER.md). The current code contains no project analytics, telemetry, cookies, forms, iframes, or third-party embeds. These documents do not constitute legal advice or a guarantee of compliance.

## Design principles

- **One question at a time:** reduce user friction and maximize answer quality.
- **Adaptive stopping:** ask until actionable, not until a fixed count.
- **User control:** explicit bypass always works.
- **Risk-aware:** high-impact tasks receive stronger assumption checks.
- **Portable:** the core behavior is plain Markdown, not vendor-specific code.
- **Honest enforcement:** instructions guide models; the extension provides stronger local interception but cannot control every website implementation.

## Roadmap

Future work can add signed releases, more accessibility testing, browser-store packaging, optional model-backed ambiguity scoring, encrypted local history, and a formal evaluation set for question quality and unnecessary-question rate.

## License

MIT. See [`LICENSE`](LICENSE).
