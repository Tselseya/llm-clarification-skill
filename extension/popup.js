const enabled = document.querySelector('#enabled');
chrome.storage.local.get({ enabled: true }, (value) => { enabled.checked = value.enabled !== false; });
enabled.addEventListener('change', () => chrome.storage.local.set({ enabled: enabled.checked }));
document.querySelector('#options').addEventListener('click', () => chrome.runtime.openOptionsPage());
