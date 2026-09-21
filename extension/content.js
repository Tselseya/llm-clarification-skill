(() => {
  if (window.top !== window.self) return;
  const state = { pending: false, bypass: false, enabled: true, composer: null, original: '', answers: [], queue: [], index: 0, positioned: false };
  const byId = (id) => document.getElementById(id);
  chrome.storage.local.get({ enabled: true }, (settings) => { state.enabled = settings.enabled; });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.enabled) state.enabled = changes.enabled.newValue;
  });

  function getComposer() {
    const active = document.activeElement;
    if (active) {
      const focusedComposer = active.closest?.('textarea:not([disabled]), input[type="text"]:not([disabled]), [contenteditable="true"], [role="textbox"]');
      if (focusedComposer && isComposer(focusedComposer)) return focusedComposer;
    }
    return document.querySelector('textarea:not([disabled]), input[type="text"]:not([disabled]), [contenteditable="true"], [role="textbox"]');
  }
  function isComposer(el) { return el && (el.matches('textarea, input[type="text"], [contenteditable="true"]') || el.getAttribute('role') === 'textbox'); }
  function textOf(el) { return el?.value ?? el?.innerText ?? el?.textContent ?? ''; }
  function setText(el, text) {
    if (!el) return;
    if ('value' in el) {
      const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')?.set;
      if (setter) setter.call(el, text); else el.value = text;
    } else { el.textContent = text; }
    el.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: text }));
  }
  function complexity(prompt) {
    let score = 0;
    if (prompt.length > 180) score++;
    if (prompt.length > 500) score++;
    if (/\b(build|create|design|develop|plan|launch|analy[sz]e|compare|implement|write a report|make a)\b/i.test(prompt)) score++;
    if (/\b(and|also|then|with|for|including)\b/gi.test(prompt)) score++;
    if (/\b(legal|medical|financial|employment|government|security|privacy|public|production|delete|send|publish)\b/i.test(prompt)) score += 2;
    return Math.min(4, score);
  }
  function missingQuestions(prompt) {
    const score = complexity(prompt);
    const q = [];
    const hasAudience = /\b(for|audience|users?|customers?|students?|developers?|children|executives?|team|client|public)\b/i.test(prompt);
    const hasFormat = /\b(format|return|output|deliverable|email|report|table|list|code|website|app|pdf|markdown|json|slide|summary)\b/i.test(prompt);
    const hasConstraints = /\b(must|should|don't|do not|avoid|constraint|limit|budget|deadline|today|before|under)\b/i.test(prompt);
    const hasSuccess = /\b(success|goal|objective|achieve|measure|criteria|optimi[sz]e|result)\b/i.test(prompt);
    if (score >= 1 && !hasAudience) q.push('Who is the intended audience or user? That changes the language, depth, and priorities.');
    if (score >= 1 && !hasFormat) q.push('What output format and level of detail do you want? That determines how I should structure the result.');
    if (score >= 2 && !hasConstraints) q.push('What constraints, exclusions, deadline, or tools should I account for? This prevents avoidable rework.');
    if (score >= 3 && !hasSuccess) q.push('What would make the result successful to you? That gives me a concrete target for judging the work.');
    return q.slice(0, Math.max(1, Math.min(4, score)));
  }
  function findSubmit() {
    const c = state.composer;
    const root = c?.closest('form, [role="dialog"], main') || document;
    return root.querySelector('button[type="submit"], button[aria-label*="send" i], button[aria-label*="submit" i], button[data-testid*="send" i]');
  }
  function shouldIntercept(prompt) {
    return prompt.trim().length > 0 && missingQuestions(prompt).length > 0;
  }
  function submitOriginal() {
    state.bypass = true;
    const brief = state.answers.length
      ? '\n\n--- Clarification brief ---\n' + state.answers.map((a, i) => `${i + 1}. ${a.question}\nAnswer: ${a.answer}`).join('\n')
      : '';
    setText(state.composer, state.original + brief);
    const button = findSubmit();
    if (button) button.click(); else state.composer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
    setTimeout(() => { state.bypass = false; state.pending = false; closePanel(); }, 250);
  }
  function positionPanel() {
    const panel = byId('llmcs-panel');
    const composer = state.composer;
    if (!panel || panel.hidden || !composer?.getBoundingClientRect) return;
    const rect = composer.getBoundingClientRect();
    const margin = 12;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = document.documentElement.clientHeight;
    const width = Math.min(Math.max(rect.width, 320), viewportWidth - margin * 2);
    panel.style.width = `${width}px`;
    panel.style.left = `${Math.max(margin, Math.min(rect.left, viewportWidth - width - margin))}px`;
    const panelHeight = panel.getBoundingClientRect().height;
    const above = rect.top - panelHeight - 10;
    const below = rect.bottom + 10;
    const top = above >= margin ? above : Math.min(below, viewportHeight - panelHeight - margin);
    panel.style.top = `${Math.max(margin, top)}px`;
  }
  function watchPanelPosition() {
    if (state.positioned) return;
    state.positioned = true;
    window.addEventListener('resize', positionPanel, true);
    window.addEventListener('scroll', positionPanel, true);
  }
  function openPanel() {
    let panel = byId('llmcs-panel');
    if (!panel) {
      panel = document.createElement('section'); panel.id = 'llmcs-panel'; panel.className = 'llmcs-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'false'); panel.setAttribute('aria-labelledby', 'llmcs-title'); panel.setAttribute('aria-describedby', 'llmcs-intro');
      panel.innerHTML = '<div class="llmcs-head"><strong id="llmcs-title">Clarification Skill</strong><button id="llmcs-close" type="button" aria-label="Close clarification panel">×</button></div><p id="llmcs-intro">This request may benefit from one or two details before it is sent.</p><div id="llmcs-question" role="status" aria-live="polite"></div><label for="llmcs-answer">Your answer</label><textarea id="llmcs-answer" rows="3" placeholder="Type your answer"></textarea><div class="llmcs-actions"><button id="llmcs-next" type="button">Continue to next question</button><button id="llmcs-bypass" type="button" class="secondary">Bypass clarification and send</button></div><small id="llmcs-progress" role="status" aria-live="polite"></small>';
      document.body.appendChild(panel);
      byId('llmcs-close').onclick = () => { state.pending = false; closePanel(); };
      byId('llmcs-bypass').onclick = () => submitOriginal();
      byId('llmcs-next').onclick = nextAnswer;
      byId('llmcs-answer').addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) nextAnswer(); });
    }
    panel.hidden = false; renderQuestion(); watchPanelPosition(); requestAnimationFrame(positionPanel);
  }
  function closePanel() { const p = byId('llmcs-panel'); if (p) p.hidden = true; }
  function renderQuestion() {
    const q = state.queue[state.index];
    byId('llmcs-question').textContent = q || 'No further clarification is needed.';
    byId('llmcs-answer').value = '';
    byId('llmcs-answer').focus();
    byId('llmcs-progress').textContent = `Question ${state.index + 1} of ${state.queue.length} · Ctrl/Cmd+Enter to continue`;
  }
  function nextAnswer() {
    const answer = byId('llmcs-answer').value.trim();
    if (!answer) return;
    state.answers.push({ question: state.queue[state.index], answer });
    state.index++;
    if (state.index >= state.queue.length) submitOriginal(); else renderQuestion();
  }
  function intercept(e) {
    if (state.bypass || state.pending || !state.enabled) return;
    const composer = getComposer(); const prompt = textOf(composer).trim();
    if (!composer || !prompt || !shouldIntercept(prompt)) return;
    // Block synchronously; an asynchronous storage lookup would let the host
    // site's own submit handler send the prompt before the panel opens.
    e.preventDefault(); e.stopImmediatePropagation();
    state.pending = true; state.composer = composer; state.original = prompt; state.answers = []; state.queue = missingQuestions(prompt); state.index = 0;
    openPanel();
  }
  document.addEventListener('keydown', (e) => {
    const targetComposer = e.target?.closest?.('textarea, input[type="text"], [contenteditable="true"], [role="textbox"]');
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && (isComposer(e.target) || targetComposer)) intercept(e);
  }, true);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.pending) { state.pending = false; closePanel(); } }, true);
  document.addEventListener('click', (e) => { const b = e.target.closest?.('button, [role="button"]'); if (!b) return; const label = `${b.getAttribute('aria-label') || ''} ${b.textContent || ''}`; if (/send|submit/i.test(label)) intercept(e); }, true);
})();
