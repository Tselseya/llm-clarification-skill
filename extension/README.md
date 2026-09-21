# Browser Extension MVP

This is a no-build Manifest V3/WebExtension prototype. Release ZIP and XPI packages are published on the [GitHub Releases page](https://github.com/Tselseya/llm-clarification-skill/releases). The extension uses the Clarify-Then-Act logo selected by the project owner: an indigo speech bubble with three white dots and a cyan question-mark badge.

For Chrome/Chromium, download the ZIP, extract it, open `chrome://extensions`, enable Developer mode, and choose **Load unpacked** on the extracted folder containing `manifest.json`. For Firefox development, open `about:debugging`, choose **This Firefox**, select **Load Temporary Add-on**, and choose `manifest.json`. Store-ready installs require browser-store signing.

## Behavior

The content script uses local heuristics to estimate whether a prompt is long or complex and whether it appears to omit audience, format, constraints, or success criteria. When it decides clarification may help, it intercepts common Enter and Send-button submission paths and opens a floating panel. The user answers one question at a time, then the extension appends a structured clarification brief and sends the prompt. **Bypass and send** is always available.

## Known MVP limits

Websites use different editors, event handlers, shadow DOM, and accessibility labels. Generic interception cannot guarantee coverage. A production release should improve the general event-detection layer, add a manual command to open the panel, strengthen event isolation, complete accessibility review, and add browser-store packaging. The extension does not itself understand every task like an LLM; it is a local heuristic companion to the portable skill.

## Local verification fixture

Open `test-fixture.html` directly in Chrome after loading the unpacked extension. The fixture includes a long ambiguous prompt, a contenteditable composer, Send buttons, and a host event log. Verify that an ambiguous prompt is blocked before the fixture's submit handler runs, that the panel asks one question at a time, that answers are appended after completion, and that **Bypass and send** allows the original prompt through. Short or sufficiently specified prompts should submit directly.
