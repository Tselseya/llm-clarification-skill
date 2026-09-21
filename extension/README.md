# LLM Clarification browser plugin

This is a no-build Manifest V3/WebExtension plugin. It uses a small prompt-extractor module plus a generic content script to recognize common LLM composers.

## Behavior

When an empty composer is detected at the start of a new chat thread, the plugin inserts the configurable opening instruction:

> Ask me clarifying questions one at a time until you understand the task.

The instruction is inserted once per detected thread. The user remains in control: they can edit it, delete it, or send it as-is. The plugin does not pause submission, open a clarification popup, ask questions itself, or send prompt text to a server.

The plugin detects URL/history changes, common “New chat” controls, dynamically created composers, `textarea`, text inputs, `contenteditable`, and ARIA textbox elements. Website DOM changes can reduce reliability because this is a generic, vendor-neutral integration.

## Installation

For Chrome or Chromium, open `chrome://extensions`, enable Developer mode, select **Load unpacked**, and choose this directory. For Firefox development, open `about:debugging`, choose **This Firefox**, select **Load Temporary Add-on**, and choose `manifest.json`.

## Settings

Open the extension action and choose **Edit instruction and settings**, or open the options page directly. The instruction can be changed without editing code. Disable **Enable automatic instruction** to stop insertion.

## Local verification fixture

Open `test-fixture.html` after loading the unpacked plugin. Verify that an empty textarea receives the instruction once, that a second DOM render does not duplicate it, and that deleting the instruction leaves the composer empty. Click **Send** to confirm the host page receives the user's final text normally.

## Files

- `prompt-extractor.js` — reusable local composer and prompt extraction plugin.
- `content.js` — thread detection and one-time editable instruction injection.
- `options.html` / `options.js` — local settings.
- `test-fixture.html` — deterministic manual fixture.
