# LLM Clarification Skill

A portable instruction package and browser plugin that helps an LLM clarify tasks one question at a time.

## Download the browser plugin here

Choose **one** file based on your browser. These are direct download links:

| Browser | Click this file | What to do next |
|---|---|---|
| Chrome or Chromium — easiest | [**Download the CRX installer**](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.5.1/llm-clarification-plugin-0.5.1.crx) | Drag the downloaded file onto `chrome://extensions`. |
| Chrome or Chromium — if CRX is blocked | [**Download the ZIP installer**](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.5.1/llm-clarification-plugin-0.5.1.zip) | Extract it, then choose **Developer mode > Load unpacked**. |
| Firefox — temporary testing | [**Download the XPI installer**](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.5.1/llm-clarification-plugin-0.5.1.xpi) | Open `about:debugging` > **This Firefox** > **Load Temporary Add-on**. |

If you are using **Chrome or Chromium**, click **Download the CRX installer** first. The complete step-by-step guide is in [`docs/INSTALL.md`](docs/INSTALL.md). You can also view the [v0.5.1 release page](https://github.com/Tselseya/llm-clarification-skill/releases/tag/v0.5.1).

## What this is

The universal `SKILL.md` guides an LLM to ask concise clarifying questions until it understands the task. The optional browser plugin automatically inserts an editable opening instruction once into the first empty composer of each detected new chat thread:

> Ask me clarifying questions one at a time until you understand the task.

The user can edit or delete that inserted text before sending. This replaces the earlier clarification popover and avoids blocking or rewriting ordinary submissions. The plugin extracts the composer text locally; it does not ask questions, intercept sends, or transmit prompts to a project server.

## Repository map

| Path | Purpose |
|---|---|
| `SKILL.md` | Universal skill and compact copy |
| `packages/llm-clarification-skill/` | Universal upload package |
| `extension/` | No-build browser plugin and reusable prompt extractor |
| `assets/` | Logo concepts and extension branding |
| `PRIVACY.md` | Data handling and privacy choices |
| `LICENSE` | MIT license |

## Use the skill

Copy `SKILL.md` into an LLM's project instructions, custom instructions, system prompt, or skill/knowledge upload area. The same file is intended for Claude, ChatGPT, Manus, APIs, local models, and other compatible LLMs. The skill guides model behavior; it cannot technically force a platform or model to comply.

## Install the browser plugin

For the easiest installation, download the current release's **CRX** and drag it onto `chrome://extensions`. If Chrome blocks the CRX because it is not Chrome Web Store-signed, download the release **ZIP**, extract it, and use **Developer mode > Load unpacked**. Firefox users can load the release XPI temporarily through `about:debugging`. Follow the complete, explicit steps in [`docs/INSTALL.md`](docs/INSTALL.md).

After installation, open a chat site. When a new thread has an empty composer, the plugin inserts the opening instruction once. Edit or delete that text whenever you want; deleting it is the bypass. Open the plugin action or options page to customize the instruction. The **Enable automatic instruction** toggle can disable insertion without deleting the saved instruction; re-enable it later to restore the behavior.

For local testing, open [`extension/test-fixture.html`](extension/test-fixture.html) after loading the unpacked plugin. The fixture verifies insertion and ordinary host submission without a popup or send interception.

## Privacy and limitations

The plugin is local-only by default. It uses browser extension storage for settings and reads composer text only to decide whether an empty composer is ready for insertion. It has no analytics, telemetry, cookies, iframes, tracking pixels, or project-operated server. Generic browser integration cannot guarantee coverage of every website's editor or new-thread controls.

Review the [Privacy Policy](docs/PRIVACY-POLICY.md), [Terms and Conditions](docs/TERMS-AND-CONDITIONS.md), [Accessibility QA record](docs/ACCESSIBILITY.md), and [Risk Register](docs/RISK-REGISTER.md) before distributing modified builds.

## License

MIT. See [`LICENSE`](LICENSE).
