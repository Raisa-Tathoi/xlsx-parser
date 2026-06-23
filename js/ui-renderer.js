window.App = window.App || {};

App.UiRenderer = (() => {
  function clearChildren(container) {
    container.innerHTML = '';
  }

  function createCardPreview(content) {
    const preview = document.createElement('pre');
    preview.textContent = content;
    return preview;
  }

  function createCardHeader(file, onDownload) {
    const header = document.createElement('header');
    const nameSpan = document.createElement('span');
    nameSpan.className = 'name';
    nameSpan.textContent = file.name;
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download';
    downloadButton.addEventListener('click', () => onDownload(file));
    header.appendChild(nameSpan);
    header.appendChild(downloadButton);
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
