# Standard Operating Procedure: LLM Clarification Skill

**Document version:** 1.0  
**Applies to:** Universal LLM skill package, browser extension, and repository release workflow  
**Current release:** v0.4.1  
**Repository:** [Tselseya/llm-clarification-skill](https://github.com/Tselseya/llm-clarification-skill)

## 1. Purpose and scope

This procedure explains how to install, test, use, update, and troubleshoot the LLM Clarification Skill. It covers the universal skill package for LLM platforms and the optional generic browser extension.

The skill is an instruction layer. It does not technically force an LLM to follow the rules. The host platform's system instructions, safety policies, model behavior, account plan, workspace configuration, and file limits remain higher priority.

The browser extension is a separate local prototype. It can intercept common prompt-submission paths, ask one clarification question at a time, and append a structured brief. It is not required to use the skill.

## 2. Required files and release assets

Use the v0.4.1 release rather than the repository source archive when installing.

| Purpose | Asset |
|---|---|
| Claude, ChatGPT, Manus, or other skill upload | [Universal ZIP](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.1/llm-clarification-skill-0.4.1-universal-skill.zip) |
| Manus or another `.skill` uploader | [Universal `.skill`](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.1/llm-clarification-skill-0.4.1-universal.skill) |
| Chrome or Chromium drag-and-drop | [Chrome `.crx`](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.1/llm-clarification-skill-0.4.1-chrome.crx) |
| Chrome or Chromium manual installation | [Chrome extension ZIP](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.1/llm-clarification-skill-0.4.1-chrome.zip) |
| Firefox temporary or signed installation | [Firefox XPI](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.4.1/llm-clarification-skill-0.4.1-firefox.xpi) |

The universal skill archive must contain exactly one root-level `SKILL.md` and a short `README.md`. The browser extension archive must contain `manifest.json` at its root.

## 3. Universal skill installation

### 3.1 General preparation

Download the universal ZIP or `.skill` package from the v0.4.1 release. Do not use GitHub's green **Code > Download ZIP** archive for skill or extension installation. That archive is the entire source repository and is not the same as an upload package.

Before uploading, inspect the archive if the platform provides a preview or security scan. Confirm that it contains `SKILL.md`, that the filename is uppercase, and that there is no second skill file. Do not upload private conversations, API keys, credentials, or unrelated files.

### 3.2 Claude

Open Claude's skill management area through **Customize > Skills**. Choose **Add**, select the universal ZIP, and wait for the security scan or import process to finish. Review the skill contents and enable it.

To verify the installation, start a new conversation and use a request that has one meaningful ambiguity. The model should ask one concise question rather than displaying a questionnaire. Answer the question and check whether it reassesses the remaining uncertainty.

If the Skills feature is unavailable, open a Claude Project and paste the complete contents of `SKILL.md` into Project Instructions. The behavior is the same, but the platform may apply different limits to project instructions.

### 3.3 ChatGPT

Where ChatGPT Skills are available, open **Skills > Create > Upload from your computer** and select the universal ZIP. Review the platform's scan result and enable the skill.

If the Skills interface is not available, copy `SKILL.md` into Custom Instructions or a Project's instruction field. If the field has a length limit, use the compact copy near the end of `SKILL.md`.

### 3.4 Manus

Open **Skills**, select **+ Add**, and choose **Upload a skill**. Upload the universal `.skill` file or the universal ZIP. The archive must contain an uppercase root-level `SKILL.md`.

After import, enable or invoke the skill in a test conversation. Manus may also support importing the public repository, but the release `.skill` file is the preferred deterministic installation artifact.

### 3.5 Other LLMs, APIs, and local models

If the product supports skill or knowledge uploads, upload the universal ZIP. If it accepts only text instructions, paste the full `SKILL.md` into the highest-priority user-configurable instruction field available. For an API or local model, place the content in the system or developer message according to that application's instruction hierarchy.

Do not describe the skill as a system-level enforcement mechanism. It is a reusable behavioral instruction that may be ignored or overridden by the host model.

## 4. Browser-extension installation

### 4.1 Chrome or Chromium drag and drop

Download the `.crx` file. Open `chrome://extensions` in Chrome or a compatible Chromium browser. Enable **Developer mode**. Drag the `.crx` file onto the extensions page and confirm installation if the browser presents a confirmation dialog.

If the browser rejects an externally downloaded CRX, use the manual ZIP method below. Some browsers restrict unsigned or externally distributed extensions even when the package is structurally valid.

### 4.2 Chrome or Chromium manual ZIP method

Download the extension-only ZIP, not the repository source ZIP. Extract it into a folder. Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the extracted folder that directly contains `manifest.json`.

The correct folder looks like this:

```text
extension-package/
├── manifest.json
├── content.js
├── content.css
├── popup.html
├── popup.js
├── options.html
├── options.js
├── icons/
└── test-fixture.html
```

Do not select a parent folder containing another `extension` folder. Do not select the repository root. Do not select the ZIP file itself.

### 4.3 Firefox

Use the XPI release asset or load the extension temporarily through `about:debugging`. Select **This Firefox**, choose **Load Temporary Add-on**, and select the extension manifest or XPI according to the Firefox version's interface. A permanent public Firefox installation generally requires Mozilla signing.

## 5. First-run verification

Perform the following tests after installing the skill. Record the result if the installation will be used by a team.

### Test A: routine and unambiguous request

Use a request such as “Rewrite this sentence in a professional tone.” The model should proceed without asking a redundant question.

### Test B: missing high-value detail

Use a request such as “Create a launch plan for my product.” The model should ask one concise question, such as which audience, product, or launch goal is intended. It should not ask for every possible field at once.

### Test C: incremental clarification

Answer the first question with a partial answer. The model should reassess and ask another question only if the remaining uncertainty could materially change the result.

### Test D: user does not know

Answer a clarification question with “I don't know; choose what you think is best.” The model should choose a reasonable default, label the assumption when it matters, and continue rather than repeatedly demanding an exact answer.

### Test E: explicit override

Tell the model, “Proceed without asking more questions.” The skill should respect the override, state material assumptions where useful, and continue. The model should still flag risks or approvals required for high-impact actions.

### Test F: high-impact request

Use a request that could affect money, legal records, employment, health, government submissions, account security, public publishing, or deletion. The model should distinguish clarification from authorization and should not treat the skill as a substitute for human review or required confirmation.

### Test G: extension fixture

Open the included `extension/test-fixture.html` in a browser. If it is opened as a `file://` URL, enable the extension's **Allow access to file URLs** permission. Alternatively, serve the extension directory with a local HTTP server and open the fixture through `http://localhost:8000/test-fixture.html`.

Type an ambiguous or long request into the fixture and submit it. The clarification panel should appear. Answer the question, continue, and confirm that the resulting brief is appended. Repeat the test using **Bypass clarification and send** and verify that the original prompt is not modified when no answers have been provided.

## 6. Normal operating procedure

When starting a new LLM conversation, use the installed skill normally. Do not paste the clarification instruction again unless the platform is not applying the skill or the conversation has an explicit instruction conflict.

The skill should ask questions only when an answer could materially change the output. It should infer low-risk details from existing context. It should ask one question at a time, reassess after each answer, and stop once the task is actionable.

For routine work, expect direct execution. For complex or high-impact work, expect a concise understanding summary containing the goal, deliverable, material assumptions, and risks. Confirmation is appropriate when the task has a consequential external side effect or when the user's intent is still materially uncertain.

Do not treat a clarification question as approval to send, publish, purchase, delete, submit, or change access. Review those actions independently.

## 7. Privacy and data-handling procedure

The universal skill is plain text and does not collect data. The browser extension operates locally by default. It reads composer content while the extension is active and may store settings in extension local storage.

Before using the extension with sensitive work, review the browser permissions and the host website's privacy terms. Do not paste passwords, private keys, regulated personal data, or information that you are not authorized to share into an LLM or test fixture.

The current repository does not include project analytics, telemetry, cookies, tracking pixels, forms, iframes, third-party embeds, or a prompt archive. If a future version adds remote analysis, telemetry, account services, or hosted pages, update the Privacy Policy, Cookie Policy, Form Consent statement, and Risk Register before release.

## 8. Updating the installation

Check the [GitHub Releases page](https://github.com/Tselseya/llm-clarification-skill/releases) for a newer version. Read the release notes before updating. Disable or remove the old skill before importing a replacement if the platform would otherwise keep both copies active.

For the extension, update by removing the old unpacked extension and loading the new extension-only package, or by installing the new CRX if the browser permits it. Confirm that the extension version and icon have changed as expected.

Repeat the first-run tests after every update. At minimum, run the routine, ambiguous, user-override, and extension-fixture tests.

## 9. Troubleshooting decision tree

### Claude says “Zip must contain exactly one SKILL.md file”

You probably uploaded the repository source ZIP or an archive containing both `SKILL.md` and `skill.md`. Download the v0.4.1 universal ZIP. It contains exactly one root-level uppercase `SKILL.md`. Do not rename or combine it with another skill file.

### Manus says “SKILL.md not found in zip file”

You probably uploaded an older package with a lowercase filename or nested layout. Download the v0.4.1 universal `.skill` file or ZIP. Inspect the archive and confirm that `SKILL.md` appears at the root with uppercase letters.

### Chrome says “Manifest file is missing or unreadable”

You selected the repository root instead of the extension root. Use the `.crx` drag-and-drop asset, or extract the extension-only ZIP and select the folder that directly contains `manifest.json`. The GitHub source archive is not a loadable extension package.

### Chrome rejects the CRX

This may be a browser distribution restriction rather than a malformed package. Enable Developer mode and use the extension-only ZIP with **Load unpacked**. If the browser is managed by an organization, administrator policy may prevent local extension installation.

### The extension loads but does not intercept a website

The extension uses generic heuristics and common DOM controls. A website may use a custom editor, shadow DOM, unusual event dispatch, or an inaccessible Send control. Test the local fixture first. If the fixture works, use the extension's manual panel or bypass behavior on the affected website. Do not assume that generic interception covers every site.

### The skill installs but the model asks no questions

Check that the skill is enabled and that the conversation is using the intended project or instruction context. Test with an intentionally ambiguous complex request. If the model still does not ask, the platform or model may be applying a higher-priority instruction or may not support the uploaded skill format. Paste the standalone `SKILL.md` into the platform's instruction field as a comparison test.

### The model asks too many questions

Check whether the request is genuinely ambiguous and whether the user's answer introduced new uncertainty. The skill should ask one question per turn, not one question total. If the model is asking checklist questions that do not affect the result, report the example and use the explicit override to proceed. The example can then be used to improve a future skill revision.

## 10. Maintainer release procedure

A maintainer making a new release should first update the skill or extension source and run the relevant syntax checks. Validate `extension/manifest.json` as JSON, run `node --check` on each JavaScript file, and inspect the archive contents before uploading release assets.

The universal skill archive must be created from the package directory's files directly so that `SKILL.md` is at the archive root. It must contain exactly one `SKILL.md`. The extension ZIP must be created from the contents of `extension/` so that `manifest.json` is at the archive root. If a CRX is created, keep the private signing key outside the repository and never publish it.

After building assets, run ZIP integrity tests, inspect the root entries, verify the release asset names, and test downloads from the published release. Update the README and `docs/UNIVERSAL-INSTALL.md` only after the final release version is known. Commit source changes, push the main branch, publish the release, and verify the Git working tree is clean.

Every release should update the Risk Register when it changes permissions, network behavior, data retention, external services, legal claims, or user-facing installation behavior.

## 11. Completion criteria

An installation is complete when the correct package is uploaded, the skill is enabled, and the first-run tests pass. An extension installation is complete when the browser shows the extension as enabled, the local fixture behaves correctly, and the user understands how to bypass the workflow.

A release is complete when the package root structures are correct, all validation checks pass, the release assets are downloadable, the documentation points to the current version, and no credentials or private keys are present in Git.

## References

[1]: https://support.anthropic.com/en/articles/12512198-how-to-create-custom-skills "How to create custom skills | Claude Help Center"
[2]: https://help.openai.com/en/articles/20001066-skills-in-chatgpt "Skills in ChatGPT | OpenAI Help Center"
[3]: https://help.manus.im/en/articles/14753565-how-to-share-and-use-skills-in-manus "How to Share and Use Skills in Manus?"
[4]: https://github.com/Tselseya/llm-clarification-skill/releases/tag/v0.4.1 "LLM Clarification Skill v0.4.1 release"
