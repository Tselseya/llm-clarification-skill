const DEFAULT_INSTRUCTION = 'Ask me clarifying questions one at a time until you understand the task. Do not ask multiple questions in one message. Once you understand the task, briefly state your understanding and proceed.';
const fields = {
  enabled: document.querySelector('#enabled'),
  retain: document.querySelector('#retain'),
  instruction: document.querySelector('#instruction'),
  endpoint: document.querySelector('#endpoint')
};

chrome.storage.local.get({ enabled: true, retain: false, instruction: DEFAULT_INSTRUCTION, endpoint: '' }, (values) => {
  fields.enabled.checked = values.enabled !== false;
  fields.retain.checked = values.retain === true;
  fields.instruction.value = values.instruction || DEFAULT_INSTRUCTION;
  fields.endpoint.value = values.endpoint || '';
});

document.querySelector('#save').addEventListener('click', () => {
  const instruction = fields.instruction.value.trim() || DEFAULT_INSTRUCTION;
  chrome.storage.local.set({
    enabled: fields.enabled.checked,
    retain: fields.retain.checked,
    instruction,
    endpoint: fields.endpoint.value.trim()
  }, () => {
    document.querySelector('#status').textContent = ' Saved';
    setTimeout(() => { document.querySelector('#status').textContent = ''; }, 1500);
  });
});
