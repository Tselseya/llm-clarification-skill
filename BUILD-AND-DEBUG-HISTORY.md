# LLM Clarification Skill: Build and Debug History

**Project:** [Tselseya/llm-clarification-skill](https://github.com/Tselseya/llm-clarification-skill)  
**Current release:** v0.4.3  
**Project type:** Personal open-source LLM skill with a generic browser-extension prototype  
**Status:** Manus skill uploaded, Claude skill installed by drag and drop, and the browser extension loaded successfully.

## Executive summary

This project began as a request for a reusable instruction file that would make an LLM ask clarifying questions until it understood a task. The central design decision was to make clarification **adaptive rather than mandatory for every message**. The skill asks one concise, high-value question only when missing information could materially change the result. It asks more questions for complex or high-impact work, fewer for routine work, and respects an explicit user request to proceed.

The project now has two separate deliverables. The first is a universal `SKILL.md` that can be uploaded to compatible LLM skill systems or pasted into a system prompt, custom-instruction field, project instruction field, or local model configuration. The second is a generic browser extension that can pause likely ambiguous submissions, ask one question at a time, and append a clarification brief before sending. The extension is an optional enforcement aid; the skill remains the core product.

The repository was deliberately consolidated into one universal package. Earlier platform-specific wrappers for Claude, ChatGPT, and Manus were removed because they duplicated the same behavior and made installation confusing. Platform differences now appear only in installation instructions, not in the skill logic.

## Requirements established during discovery

The requirements were gathered one question at a time before implementation. The intended product became a public, reusable project rather than a private prompt. It needed to support Claude, ChatGPT, Manus, other web-based LLMs, LLM APIs, and local models.

The clarification behavior had to be complexity-aware. A simple and unambiguous request may proceed without a question. A complex or high-impact request should receive an understanding summary and confirmation when appropriate. The model should infer low-risk details, verify important assumptions, and choose reasonable defaults when the user says that they do not know. The user must always be able to override the loop by asking the model to proceed.

The interaction rule is exactly one concise question at a time. The question should be the highest-value unresolved question and may include a short reason. The LLM itself decides when enough information has been collected. There is no fixed question count because a fixed count would create unnecessary friction for easy tasks and would be insufficient for some complex tasks.

The project should be publicly distributed under the GitHub account `Tselseya`. The repository uses the MIT License. The owner disclosure intentionally lists only the GitHub username and repository URL because this is a personal open-source project rather than a declared commercial service.

## Initial repository and skill implementation

The public repository was created as `Tselseya/llm-clarification-skill`. The first implementation added the following files:

- `SKILL.md`, containing the universal behavioral specification and compact copy.
- `README.md`, documenting purpose, limitations, installation, and testing.
- `extension/`, containing a dependency-free Manifest V3/WebExtension prototype.
- `extension/test-fixture.html`, providing a local page for deterministic interception tests.
- `LICENSE`, containing the MIT License.
- `PRIVACY.md`, describing the local-first behavior.

The skill defines an internal readiness test covering the goal, audience, deliverable, format, constraints, resources, timing, success criteria, permissions, and risks. It explicitly distinguishes low-risk inference from important assumptions. It also states that the skill is subordinate to platform system instructions and cannot technically force another model to comply.

## Browser-extension MVP

The extension uses a generic content script rather than an integration with one particular LLM site. It looks for common `textarea`, text-input, and `contenteditable` composers. It watches common Enter-key and Send-button paths. A local heuristic estimates complexity from prompt length, task verbs, compound requests, risk-related terms, and the apparent absence of audience, format, constraints, or success criteria.

When the heuristic decides that clarification may help, the extension opens a responsive popover anchored above or below the active LLM composer. The popover uses the composer width and follows scrolling and resizing rather than remaining in a fixed lower-screen corner. It then appends a structured clarification brief to the original prompt and submits it. The user can close the panel or choose **Bypass clarification and send** at any time.

The extension is local-first. It does not include analytics, telemetry, cookies, tracking pixels, iframes, third-party embeds, or a project-operated server. It stores settings in browser extension local storage. The optional analysis endpoint field remains empty by default and is not called by the current MVP.

## Debugging incident 1: asynchronous interception race

The first extension implementation checked the enabled setting with an asynchronous `chrome.storage.local.get()` call inside the Enter or click event handler. That created a race condition. The host website could process its own submit handler before the extension received the storage callback and called `preventDefault()`.

The fix was to cache the enabled state when the content script loads and update it through `chrome.storage.onChanged`. The interception function now checks that cached state and calls `preventDefault()` and `stopImmediatePropagation()` synchronously before opening the clarification panel. This change is essential because event cancellation must happen during the original browser event dispatch.

## Debugging incident 2: bypass added an empty clarification header

The first bypass path always appended the text `--- Clarification brief ---`, even when the user had not answered a question. That modified the original prompt unnecessarily.

The fix makes the clarification brief conditional. If the answer list is empty, bypass sends the original prompt without an added header. If the user has answered questions and then chooses bypass, the answers are appended as the current brief.

## Debugging incident 3: the extension manifest error

The first installation instructions directed users toward the repository source archive. The source archive has this shape:

```text
llm-clarification-skill-main/
├── README.md
├── SKILL.md
└── extension/
    └── manifest.json
```

Chrome cannot load the repository root because `manifest.json` is inside the `extension/` directory. Selecting the repository root produces the error **“Manifest file is missing or unreadable.”**

The fix was to create an extension-only release package whose archive root contains `manifest.json`. The v0.4.1 release also included a Chromium-packed `.crx` file so users could try drag-and-drop installation. The fallback ZIP must be extracted and loaded by selecting the folder that directly contains `manifest.json`.

## Debugging incident 6: Chrome non-Web-Store warning

When the user dragged the CRX onto Chrome's extensions page, Chrome displayed: **“This extension is not listed in the Chrome Web Store and may have been added without your knowledge.”** This is an expected warning for a locally distributed, unsigned extension that is not published in the Chrome Web Store. It is a browser trust warning, not evidence that `manifest.json` is missing or that the archive is corrupt.

The extension-only ZIP worked successfully through **Developer mode > Load unpacked**. Because Chrome policies vary, the ZIP is now the recommended installation path. The CRX remains available as an optional drag-and-drop test asset. Users should review the package and install it only when they trust the source.

## Debugging incident 7: fixed lower-screen panel was not integrated enough

The first panel used `position: fixed` with a bottom-right offset, which made it look like an unrelated chat box rather than part of the active LLM interface. The implementation also used descendant CSS selectors without assigning the corresponding panel class.

The v0.4.3 fix assigns the panel class, appends it to the document body, measures the active composer with `getBoundingClientRect()`, and positions the popover above or below that composer. Resize and scroll listeners recalculate the position. The panel width follows the composer within viewport limits, making the generic UI feel integrated without depending on a vendor-specific adapter.

## Debugging incident 8: extension files and hosted skills have separate lifecycles

Deleting a downloaded CRX, ZIP, or extracted installer does not necessarily remove an extension already installed in Chrome. Chrome stores the installed copy in its own browser profile. The extension must be removed through `chrome://extensions`.

The same principle applies to a skill uploaded to Manus, Claude, or another hosted LLM workspace. Deleting the local `.skill` or ZIP file does not delete the uploaded workspace copy. The user must disable or remove the skill inside the host platform.

## Debugging incident 4: Claude reported two `SKILL.md` files

The first universal package used a nested directory and a lowercase `skill.md`. The repository also contained an uppercase `SKILL.md`. Depending on the archive selected and the platform's case handling, Claude could report that the ZIP contained two skill files.

The corrected v0.4.1 universal packages contain exactly two files at the archive root:

```text
SKILL.md
README.md
```

There is exactly one uppercase `SKILL.md`. The package does not contain a nested skill directory, a second lowercase skill file, platform notes, executable code, or user data.

## Debugging incident 5: Manus reported that `SKILL.md` was missing

Manus did not recognize the earlier lowercase and nested packaging reliably. The corrected package uses an uppercase root-level `SKILL.md`, which also matches the expected conventional filename. The `.skill` file and ZIP contain the same root-level structure.

## Universal-package consolidation

The project originally contained separate platform files for ChatGPT, Claude, Manus, and a generic system prompt. Those files were useful during early design but created a confusing installation model. They were removed from the repository.

The current package is `packages/llm-clarification-skill/`. It contains one `SKILL.md` and one short `README.md`. The same package is intended for every compatible LLM. Platform documentation explains where users upload or paste the same package, but it does not change the skill behavior.

## Branding work

Three logo concepts were generated for the extension. The project owner selected Concept 3: an indigo speech bubble with three white dots and a cyan question-mark badge. The mark represents conversation and clarification without relying on text.

The selected source is stored at `assets/logo-concept-3.png`. Deterministic resizing produces 16px, 32px, 48px, and 128px icons in `extension/icons/`. The project does not claim that the generated image is exclusive, trademark-cleared, or legally protected in every jurisdiction.

## Privacy, legal, and accessibility review

The repository was audited for analytics, tracking, cookies, forms, iframes, external embeds, and external endpoints. The current code contains no project analytics, telemetry, cookies, tracking pixels, project-operated forms, iframes, third-party embeds, or automatic prompt archive. GitHub and the LLM platforms remain independent services with their own terms, cookies, and privacy practices.

The repository now includes a Privacy Policy, Terms and Conditions, Cookie Policy, Form Consent statement, Owner Disclosure, Accessibility QA record, Copyright and Brand Review, and Risk Register. These documents describe the current implementation and flag future risks. They are not legal advice and do not guarantee compliance in every jurisdiction.

Accessibility improvements include semantic dialog attributes, a visible title, a labeled answer field, live status announcements, clearer button labels, Escape-key closing, visible keyboard focus, sufficient color contrast for the project-defined controls, and narrow-screen styling. The generic extension still runs on third-party websites whose accessibility trees and DOM behavior are outside the project's control. Accessibility conformance has not been certified.

## Release history

| Release | Main contents | Debugging or product purpose |
|---|---|---|
| `v0.1.0` | Initial universal skill and generic extension | Established the core workflow and local fixture. |
| `v0.2.0` | Initial public extension release | Added extension release packaging and branding infrastructure. |
| `v0.3.0` | Platform upload packages, policies, and selected branding | Added policy audit, accessibility work, and multiple upload packages. |
| `v0.4.0` | One universal package | Removed platform-specific wrappers and consolidated the skill. |
| `v0.4.1` | Corrected packaging and drag-and-drop installers | Added root-level uppercase `SKILL.md`, `.crx`, extension-only ZIP, and corrected instructions. |
| `v0.4.2` | ChatGPT interception compatibility patch | Improved nested composer detection and removed the arbitrary 80-character gate. |
| `v0.4.3` | Composer-integrated clarification popover | Replaced the fixed lower-screen panel with a responsive popover anchored to the active composer. |

## Validation performed

The v0.4.3 validation included JavaScript syntax checks, JSON manifest validation, ZIP integrity checks, extension-root inspection, CRX generation, and a clean Git working tree. The v0.4.3 release contains the Chrome `.crx`, Chrome extension ZIP, and Firefox XPI. The universal skill package remains available from v0.4.1.

The user confirmed that the Manus skill uploaded successfully, the Claude skill installed by drag and drop, and the browser extension loaded successfully. The user then reported that the CRX produced a Chrome non-Web-Store warning while the ZIP installed successfully. That result established the ZIP as the recommended extension installation method.

## Current limitations

The universal skill remains a guidance layer. It cannot override system instructions, platform safety rules, account restrictions, workspace settings, or model behavior. The extension uses generic heuristics and common browser controls. It cannot guarantee interception on every website or understand every task as deeply as an LLM.

The current project does not provide a hosted account system, a prompt vault, a support service, a payment flow, a newsletter, or a commercial business identity. Adding any of those features would require a new privacy, security, consent, legal, accessibility, and operational review.

## References

[1]: https://support.anthropic.com/en/articles/12512198-how-to-create-custom-skills "How to create custom skills | Claude Help Center"
[2]: https://help.openai.com/en/articles/20001066-skills-in-chatgpt "Skills in ChatGPT | OpenAI Help Center"
[3]: https://help.manus.im/en/articles/14753565-how-to-share-and-use-skills-in-manus "How to Share and Use Skills in Manus?"
[4]: https://github.com/Tselseya/llm-clarification-skill/releases/tag/v0.4.3 "LLM Clarification Skill v0.4.3 release"

## v0.5.0 redesign: automatic opening instruction and prompt-extractor plugin

The v0.5.0 direction replaces the composer-anchored clarification popover with a simpler, user-editable opening instruction. When an empty composer appears at the start of a detected new thread, the browser plugin inserts the configured instruction once. The user can edit or delete that text; deletion is the bypass path. The plugin no longer intercepts Enter or Send events, asks questions itself, appends a clarification brief, or blocks ordinary submissions.

The former generic content script was split conceptually into `prompt-extractor.js`, which exposes local composer detection and text extraction, and `content.js`, which handles thread changes and one-time injection. The universal skill package now uses the same direct instruction: “Ask me clarifying questions one at a time until you understand the task.”
