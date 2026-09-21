# Standard Operating Procedure: LLM Clarification Skill

**Document version:** 2.0
**Applies to:** Universal LLM skill package, browser plugin, prompt extractor, and repository release workflow
**Current source version:** v0.5.1
**Repository:** [Tselseya/llm-clarification-skill](https://github.com/Tselseya/llm-clarification-skill)

## 1. Purpose and scope

This procedure explains how to install, configure, test, use, update, and troubleshoot the LLM Clarification Skill and its optional browser plugin. The universal skill guides an LLM to ask one concise clarifying question at a time until the task is understood. The browser plugin inserts an editable opening instruction into an empty composer once per detected new chat thread.

The skill is an instruction layer. It does not technically force an LLM to follow the rules. The host platform's system instructions, safety policies, model behavior, account plan, workspace configuration, and file limits remain higher priority.

The browser plugin is local-first and non-blocking. It does not open a clarification panel, intercept Enter or Send events, ask questions itself, append a clarification brief, or transmit prompt text to a project server. The user can edit or delete the inserted instruction before sending.

## 2. Repository components

| Component | Location | Function |
|---|---|---|
| Universal skill | `SKILL.md` | Portable LLM behavior instruction |
| Upload package | `packages/llm-clarification-skill/` | Root-level `SKILL.md` package for compatible LLMs |
| Browser plugin | `extension/` | Manifest V3/WebExtension implementation |
| Prompt extractor | `extension/prompt-extractor.js` | Detects common composers and reads their local text |
| Thread injector | `extension/content.js` | Inserts the opening instruction once per detected thread |
| Options UI | `extension/options.html` | Enables/disables insertion and edits the saved instruction |
| Test fixture | `extension/test-fixture.html` | Manual local verification page |

## 3. Browser plugin configuration

Open the extension's options page through `chrome://extensions` or the browser's extension details screen. The **Enable automatic instruction** toggle controls insertion independently of the saved text.

When enabled, the plugin inserts the configured opening instruction into an empty detected composer. When disabled, it performs no automatic insertion. Disabling does **not** delete, reset, or overwrite the saved instruction. Re-enabling restores the previous behavior and uses the saved text.

The **Opening instruction** textarea controls the text inserted into a new thread. Saving an empty textarea restores the default instruction. The optional retention and analysis-endpoint fields remain local settings; the current plugin does not call the endpoint.

## 4. Installation

For the shortest user-facing installation path, follow [`docs/INSTALL.md`](docs/INSTALL.md). It includes the exact drag-and-drop CRX steps, the ZIP fallback, Firefox steps, update steps, and troubleshooting for old installed copies.

### 4.1 Chrome or Chromium

Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the `extension/` directory that directly contains `manifest.json`. Do not select the repository root or a parent directory.

The extension root contains at least:

```text
extension/
├── manifest.json
├── content.js
├── prompt-extractor.js
├── options.html
├── options.js
├── options.css
├── popup.html
├── popup.js
├── popup.css
├── icons/
└── test-fixture.html
```

### 4.2 Firefox

Open `about:debugging`, choose **This Firefox**, select **Load Temporary Add-on**, and choose `extension/manifest.json`. A permanent public Firefox installation generally requires Mozilla signing.

## 5. First-run verification

### Test A: automatic insertion

Open a new chat page with an empty composer. Confirm that the configured opening instruction appears directly inside the normal composer. No floating panel should appear.

### Test B: one-time behavior

Trigger a DOM rerender or refocus the composer in the same thread. Confirm that the instruction is not duplicated.

### Test C: user bypass

Delete the inserted instruction and send a normal message. Confirm that the host page receives the user's text without the plugin blocking or rewriting the submission.

### Test D: disable and preserve

Open the options page, turn off **Enable automatic instruction**, and save. Open a new thread and confirm that no instruction is inserted. Reopen settings and confirm that the customized instruction is still present. Re-enable the toggle and confirm that it is inserted in the next detected new thread.

### Test E: editable instruction

Change the opening instruction in settings, save, open a new thread, and confirm that the new wording is inserted. Existing composer text must not be overwritten.

### Test F: universal skill behavior

Use an ambiguous request such as “Create a launch plan for my product.” The LLM should ask one concise, high-value question. Answer it and verify that the model reassesses remaining uncertainty instead of presenting a fixed questionnaire. Tell it to proceed without further questions and verify that it respects the override while stating material assumptions.

## 6. Prompt-extractor behavior

The extractor recognizes `textarea`, text inputs, `[contenteditable="true"]`, and `[role="textbox"]` elements. It reads `.value` from form controls and `.innerText` or `.textContent` from editable elements. It normalizes non-breaking spaces and surrounding whitespace through `normalizePrompt()`.

To support a site-specific editor, add its selector to `isComposer()` and add a site-specific branch to `extractPrompt()`. Keep extraction local and deterministic. Do not add network calls, remote code, prompt archives, or site-specific assumptions without updating the privacy and risk documents.

## 7. Troubleshooting

### The old clarification panel still appears

The browser is running an older installed copy or an old unpacked folder. Open the extension management page, identify duplicate copies, remove the old copy, reload the current `extension/` directory, and fully reload the chat tab. The current v0.5 flow has no clarification panel or send interception.

### No instruction appears

Confirm that **Enable automatic instruction** is on, the instruction is non-empty, the current composer is empty, and the browser has reloaded the current extension files. Test `extension/test-fixture.html` first. A third-party site may use a custom editor or shadow DOM that the generic extractor cannot recognize.

### The instruction appears twice

Reload the current extension and check for duplicate installed copies. The current implementation tracks one insertion per detected thread and composer. If a site changes its URL or new-thread control in a nonstandard way, record the DOM structure and update the thread-detection logic before adding a site-specific adapter.

### The extension manifest is missing

Select the folder containing `manifest.json`, not the repository root and not the ZIP file.

### The skill installs but the model asks no questions

Check that the skill is enabled and that the conversation uses the intended project or instruction context. The browser plugin only inserts text; it cannot force model behavior. Test with the standalone `SKILL.md` in the platform's supported instruction field.

## 8. Privacy and safety

The universal skill is plain text. The browser plugin reads composer text locally to determine whether a composer is empty and to extract text for its local decision. It stores settings in browser extension local storage. It does not call the optional endpoint in the current release and does not include analytics, telemetry, cookies, tracking pixels, iframes, or a project-operated server.

Review host-site permissions before installation. Do not use the plugin with secrets, private keys, authentication tokens, regulated personal data, or information that you are not authorized to share.

## 9. Release procedure

Before releasing a change, update source code and all behavior-sensitive documentation, including this SOP, README files, accessibility QA, privacy policy, risk register, terms, and build history. Run `node --check` on each JavaScript file, validate `extension/manifest.json`, run `git diff --check`, verify the fixture instructions, and inspect the final Git status.

For a universal skill package, ensure the archive contains exactly one uppercase root-level `SKILL.md`. For a browser package, ensure `manifest.json`, `prompt-extractor.js`, and `content.js` are at the package root. Record the release version and behavior changes in `BUILD-AND-DEBUG-HISTORY.md`.
