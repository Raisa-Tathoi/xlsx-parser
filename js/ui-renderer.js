window.App = window.App || {};

App.UiRenderer = (() => {
  const COPIED_FLASH_MS = 1500;

  function clearChildren(container) {
    container.innerHTML = '';
  }

  function createCardPreview(content) {
    const preview = document.createElement('pre');
    preview.textContent = content;
    return preview;
  }

  function flashButtonLabel(button, transientLabel, disableWhileFlashing) {
    const originalLabel = button.textContent;
    button.textContent = transientLabel;
    if (disableWhileFlashing) button.disabled = true;
    setTimeout(() => {
      button.textContent = originalLabel;
      if (disableWhileFlashing) button.disabled = false;
    }, COPIED_FLASH_MS);
  }

  async function handleCopyClick(button, content) {
    try {
      await App.Clipboard.copyPlainText(content);
      flashButtonLabel(button, 'Copied!', true);
    } catch (err) {
      flashButtonLabel(button, 'Copy failed', false);
    }
  }

  function createCopyButton(content) {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.addEventListener('click', () => handleCopyClick(button, content));
    return button;
  }

  function createDownloadButton(file, onDownload) {
    const button = document.createElement('button');
    button.textContent = 'Download';
    button.addEventListener('click', () => onDownload(file));
    return button;
  }

  function createActionsBar(file, onDownload) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.appendChild(createCopyButton(file.content));
    actions.appendChild(createDownloadButton(file, onDownload));
    return actions;
  }

  function createCardHeader(file, onDownload) {
    const header = document.createElement('header');
    const nameSpan = document.createElement('span');
    nameSpan.className = 'name';
    nameSpan.textContent = file.name;
    header.appendChild(nameSpan);
    header.appendChild(createActionsBar(file, onDownload));
    return header;
  }

  function createFileCard(file, onDownload) {
    const card = document.createElement('div');
    card.className = 'file-card';
    card.appendChild(createCardHeader(file, onDownload));
    card.appendChild(createCardPreview(file.content));
    return card;
  }

  function showEmptyState(container, message) {
    clearChildren(container);
    const paragraph = document.createElement('p');
    paragraph.className = 'muted';
    paragraph.textContent = message;
    container.appendChild(paragraph);
  }

  function renderFiles(container, files, onDownload) {
    clearChildren(container);
    if (!files.length) {
      showEmptyState(container, 'No files generated.');
      return;
    }
    files.forEach(file => container.appendChild(createFileCard(file, onDownload)));
  }

  function populateSheetSelect(selectElement, sheetNames) {
    clearChildren(selectElement);
    sheetNames.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      selectElement.appendChild(option);
    });
  }

  return { renderFiles, showEmptyState, populateSheetSelect };
})();
