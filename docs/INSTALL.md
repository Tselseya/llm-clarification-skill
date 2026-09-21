# Install the LLM Clarification browser plugin

This guide installs the browser plugin that inserts an editable clarification instruction into a new LLM chat. It is installed in the browser, not separately inside each LLM website.

## First: download the correct file

If you use **Chrome or Chromium**, click this first:

### [Download the Chrome CRX installer](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.5.1/llm-clarification-plugin-0.5.1.crx)

After it downloads, follow the Chrome drag-and-drop steps below.

If Chrome refuses the CRX, use this instead:

### [Download the Chrome ZIP fallback](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.5.1/llm-clarification-plugin-0.5.1.zip)

If you use Firefox for temporary testing:

### [Download the Firefox XPI package](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.5.1/llm-clarification-plugin-0.5.1.xpi)

You can also open the [v0.5.1 release page](https://github.com/Tselseya/llm-clarification-skill/releases/tag/v0.5.1), where the same three files appear under **Assets**. The exact file names are:

- `llm-clarification-plugin-0.5.1.crx` — Chrome/Chromium drag-and-drop installer.
- `llm-clarification-plugin-0.5.1.zip` — Chrome/Chromium manual fallback installer.
- `llm-clarification-plugin-0.5.1.xpi` — Firefox temporary-install package.

## Chrome or Chromium: drag and drop the CRX

1. Click **[Download the Chrome CRX installer](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.5.1/llm-clarification-plugin-0.5.1.crx)** above.
2. Wait for `llm-clarification-plugin-0.5.1.crx` to finish downloading. It is normally in your **Downloads** folder.
3. Open Chrome or Chromium.
4. In the address bar, type `chrome://extensions` and press **Enter**.
5. Turn on **Developer mode** in the upper-right corner.
6. Keep the extensions page open.
7. Open your Downloads folder beside the browser, or use your file manager.
8. Click and hold `llm-clarification-plugin-0.5.1.crx`.
9. Drag that file onto the middle of the `chrome://extensions` page.
10. Release the mouse button.
11. Review the browser warning. Chrome may say that the extension is not listed in the Chrome Web Store. This is expected for a locally distributed, unsigned CRX. Install it only if you trust the source and have reviewed the repository.
12. Accept the installation prompt if Chrome provides one.
13. Open a new LLM chat and confirm that the editable opening instruction appears directly inside the empty composer.

### If Chrome refuses the CRX: use the ZIP fallback

1. Click **[Download the Chrome ZIP fallback](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.5.1/llm-clarification-plugin-0.5.1.zip)** above.
2. Open your Downloads folder.
3. Right-click `llm-clarification-plugin-0.5.1.zip` and choose **Extract** or **Extract all**.
4. Open Chrome or Chromium and go to `chrome://extensions`.
5. Turn on **Developer mode**.
6. Click **Load unpacked**.
7. Select the extracted folder that directly contains `manifest.json`.
8. Click **Select folder** or **Open**.
9. Do not select the repository root, the ZIP file, or a parent folder containing another `extension/` folder.

The selected folder must look like this:

```text
llm-clarification-plugin-0.5.1/
├── manifest.json
├── content.js
├── prompt-extractor.js
├── options.html
├── options.js
├── options.css
├── popup.html
├── popup.js
├── popup.css
└── icons/
```

## Firefox: temporary installation

1. Click **[Download the Firefox XPI package](https://github.com/Tselseya/llm-clarification-skill/releases/download/v0.5.1/llm-clarification-plugin-0.5.1.xpi)** above.
2. Open Firefox.
3. Type `about:debugging` into the address bar and press **Enter**.
4. Select **This Firefox**.
5. Click **Load Temporary Add-on**.
6. Select `llm-clarification-plugin-0.5.1.xpi` from your Downloads folder.
7. Open a new LLM chat and test the inserted instruction.
8. Keep in mind that temporary add-ons are removed when Firefox restarts.

A permanent public Firefox installation generally requires a Mozilla-signed add-on.

## Configure the plugin

1. Open the browser extension menu.
2. Find **LLM Clarification Skill**.
3. Open **Extension options** or **Options**.
4. Use **Enable automatic instruction** to turn insertion on or off.
5. Turning it off stops automatic insertion but does not delete the saved instruction.
6. Edit **Opening instruction** to customize the text.
7. Click **Save settings**.

## Test after installation

1. Open [`extension/test-fixture.html`](../extension/test-fixture.html), or open a new chat on an LLM website.
2. Confirm the instruction appears directly inside an empty composer.
3. Confirm that no clarification popup appears.
4. Trigger a rerender or refocus the composer and confirm the instruction is not duplicated.
5. Delete the instruction and send a normal message to test the bypass.
6. Disable the toggle, save, open a new thread, and confirm no instruction appears.
7. Reopen options and confirm the customized instruction is still saved.
8. Re-enable the toggle and confirm insertion returns in a later new thread.

## Updating an existing installation

1. Download the new CRX or ZIP release.
2. Open `chrome://extensions` or `about:debugging`.
3. Remove the old duplicate copy if one exists.
4. For a CRX, drag the new file onto Chrome's extensions page.
5. For a ZIP, extract it and select **Load unpacked** on the new folder.
6. Click **Reload** in the browser's extension manager.
7. Fully reload every open LLM tab.

If the old “Clarification Skill” question panel still appears, the browser is running an older copy. Close the LLM tab, remove duplicate old copies, reload the current plugin, and open a new tab.

## Important distinction

The plugin works on browser-based LLM websites such as Manus, ChatGPT, Claude, Gemini, Copilot, and other compatible chat interfaces. It does not modify API requests or local-model configurations. For APIs and local models, use [`SKILL.md`](../SKILL.md) as a system or developer instruction instead.
