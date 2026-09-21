# Install the LLM Clarification browser plugin

This guide installs the browser plugin that inserts an editable clarification instruction into a new LLM chat. It is installed in the browser, not separately inside each LLM website.

## Recommended Chrome or Chromium installation: drag and drop

Use the release asset named **`llm-clarification-plugin-0.5.1.crx`**.

1. Download the `.crx` file from the [GitHub v0.5.1 release](https://github.com/Tselseya/llm-clarification-skill/releases/tag/v0.5.1). Do not rename the file.
2. Open Chrome or Chromium.
3. In the address bar, open `chrome://extensions`.
4. Turn on **Developer mode** in the upper-right corner.
5. Keep the extensions page open.
6. Drag `llm-clarification-plugin-0.5.1.crx` from your Downloads folder onto the middle of the extensions page.
7. Review the browser warning. Chrome may say that the extension is not listed in the Chrome Web Store. This is expected for a locally distributed, unsigned CRX. Install it only if you trust the source and have reviewed the repository.
8. Accept the installation prompt if Chrome provides one.
9. Pin the plugin from the puzzle-piece menu if you want quick access to its toolbar settings.
10. Open a new chat on an LLM website and confirm that the editable opening instruction appears in the empty composer.

### If Chrome refuses the CRX

Some Chrome builds, managed browsers, or browser policies block drag-and-drop installation of externally distributed CRX files. Use the ZIP fallback:

1. Download **`llm-clarification-plugin-0.5.1.zip`** from the same release.
2. Extract the ZIP into a normal folder.
3. Open `chrome://extensions`.
4. Turn on **Developer mode**.
5. Click **Load unpacked**.
6. Select the extracted folder that directly contains `manifest.json`.
7. Do not select the repository root, the ZIP file, or a parent folder containing `extension/`.

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

## Firefox installation

For testing, use the asset **`llm-clarification-plugin-0.5.1.xpi`** or the extracted extension folder:

1. Open Firefox and navigate to `about:debugging`.
2. Select **This Firefox**.
3. Click **Load Temporary Add-on**.
4. Select the downloaded `.xpi` file or select `manifest.json` inside the extracted plugin folder.
5. Keep the browser window open; temporary add-ons are removed when Firefox restarts.

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
