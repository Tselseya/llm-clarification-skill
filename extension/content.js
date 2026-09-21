(() => {
  if (window.top !== window.self) return;

  const DEFAULT_INSTRUCTION = 'Ask me clarifying questions one at a time until you understand the task. Do not ask multiple questions in one message. Once you understand the task, briefly state your understanding and proceed.';
  const state = {
    enabled: true,
    instruction: DEFAULT_INSTRUCTION,
    injectedComposers: new WeakSet(),
    threadInjected: false,
    threadKey: location.href,
    lastComposer: null,
    mutationTimer: 0
  };

  const extractor = globalThis.LLMClarificationPromptExtractor;
  if (!extractor) return;

  chrome.storage.local.get({ enabled: true, instruction: DEFAULT_INSTRUCTION }, (settings) => {
    state.enabled = settings.enabled !== false;
    state.instruction = typeof settings.instruction === 'string' && settings.instruction.trim()
      ? settings.instruction.trim()
      : DEFAULT_INSTRUCTION;
    maybeInject();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    if (changes.enabled) state.enabled = changes.enabled.newValue !== false;
    if (changes.instruction) state.instruction = (changes.instruction.newValue || DEFAULT_INSTRUCTION).trim();
    if (changes.enabled || changes.instruction) maybeInject();
  });

  function getComposer() {
    const active = document.activeElement;
    if (active) {
      const focused = active.closest?.('textarea:not([disabled]), input[type="text"]:not([disabled]), [contenteditable="true"], [role="textbox"]');
      if (focused && extractor.isComposer(focused)) return focused;
    }
    return document.querySelector('textarea:not([disabled]), input[type="text"]:not([disabled]), [contenteditable="true"], [role="textbox"]');
  }

  function setText(el, text) {
    if (!el) return;
    if ('value' in el) {
      const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')?.set;
      if (setter) setter.call(el, text); else el.value = text;
    } else {
      el.textContent = text;
    }
    el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function threadChanged() {
    const key = location.href;
    if (key === state.threadKey) return false;
    state.threadKey = key;
    state.injectedComposers = new WeakSet();
    state.threadInjected = false;
    return true;
  }

  function isNewThreadControl(target) {
    const control = target?.closest?.('a, button, [role="button"]');
    if (!control) return false;
    const label = `${control.getAttribute('aria-label') || ''} ${control.getAttribute('title') || ''} ${control.textContent || ''}`;
    return /new\s+(chat|conversation|thread)|start\s+(a\s+)?new/i.test(label);
  }

  function inject(composer) {
    if (!state.enabled || !composer || state.threadInjected || state.injectedComposers.has(composer)) return false;
    const current = extractor.extractPrompt(composer).trim();
    if (current) return false;
    const instruction = state.instruction.trim();
    if (!instruction) return false;
    setText(composer, instruction);
    state.injectedComposers.add(composer);
    state.threadInjected = true;
    state.lastComposer = composer;
    composer.setAttribute('data-llmcs-instruction-inserted', 'true');
    return true;
  }

  function maybeInject() {
    if (!state.enabled) return;
    threadChanged();
    const composer = getComposer();
    if (composer) inject(composer);
  }

  function observePage() {
    const observer = new MutationObserver(() => {
      window.clearTimeout(state.mutationTimer);
      state.mutationTimer = window.setTimeout(maybeInject, 80);
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  document.addEventListener('focusin', (event) => {
    if (extractor.isComposer(event.target)) {
      state.lastComposer = event.target;
      maybeInject();
    }
  }, true);

  document.addEventListener('click', (event) => {
    if (isNewThreadControl(event.target)) {
      state.injectedComposers = new WeakSet();
      state.threadInjected = false;
      window.setTimeout(maybeInject, 150);
      return;
    }
    if (extractor.isComposer(event.target)) maybeInject();
  }, true);

  window.addEventListener('popstate', () => { threadChanged(); maybeInject(); });
  window.addEventListener('hashchange', () => { threadChanged(); maybeInject(); });
  observePage();
})();
