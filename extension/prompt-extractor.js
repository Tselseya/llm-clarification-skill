(() => {
  function isComposer(el) {
    return Boolean(el && (
      el.matches?.('textarea, input[type="text"], [contenteditable="true"]') ||
      el.getAttribute?.('role') === 'textbox'
    ));
  }

  function extractPrompt(composer) {
    if (!composer) return '';
    return 'value' in composer ? composer.value || '' : composer.innerText || composer.textContent || '';
  }

  function normalizePrompt(text) {
    return String(text || '').replace(/\u00a0/g, ' ').replace(/[ \t]+\n/g, '\n').trim();
  }

  globalThis.LLMClarificationPromptExtractor = Object.freeze({ isComposer, extractPrompt, normalizePrompt });
})();
