document.querySelector('#nse-only').addEventListener('change', (e) => {
  chrome.storage.sync.set({ 'config.nseOnly': e.target.checked.toString() });
});

chrome.storage.sync.get('config.nseOnly', (storageObject) => {
  if (storageObject['config.nseOnly']) {
    document.querySelector('#nse-only').checked = Boolean(
      storageObject['config.nseOnly']
    );
  }
});
