(() => {
  const state = { workbook: null, lastFiles: [] };
  let refs = null;

  function init() {
    refs = App.DomRefs.getRefs();
    refs.fileInput.addEventListener('change', handleFileChange);
    refs.parseButton.addEventListener('click', handleParseClick);
    refs.zipButton.addEventListener('click', handleZipClick);
    refs.directionRadios.forEach(radio =>
      radio.addEventListener('change', handleDirectionChange));
  }

  function getDirection() {
    return document.querySelector('input[name="dir"]:checked').value;
  }

  function getSkipCount() {
    const parsed = parseInt(refs.skipInput.value, 10);
    return Math.max(0, Number.isFinite(parsed) ? parsed : 0);
  }

  function handleDirectionChange() {
    refs.skipLabel.textContent = getDirection() === 'row' ? 'rows' : 'columns';
  }

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    App.StatusBar.info(refs.statusElement, 'Reading file…');
    try {
      state.workbook = await App.WorkbookLoader.loadFromFile(file);
      const sheetNames = App.WorkbookLoader.getSheetNames(state.workbook);
      App.UiRenderer.populateSheetSelect(refs.sheetSelect, sheetNames);
      refs.sheetSelect.disabled = false;
      refs.parseButton.disabled = false;
      App.StatusBar.info(refs.statusElement,
        `Loaded "${file.name}" — ${sheetNames.length} sheet(s).`);
    } catch (err) {
      App.StatusBar.error(refs.statusElement, `Failed to read file: ${err.message}`);
    }
  }

  function onDownloadFile(file) {
    App.Downloader.downloadText(file.name, file.content);
  }

  function handleParseClick() {
    if (!state.workbook) return;
    const direction = getDirection();
    const result = App.Parser.parse({
      workbook: state.workbook,
      sheetName: refs.sheetSelect.value,
      direction,
      skipCount: getSkipCount(),
    });
    state.lastFiles = result.files;
    App.UiRenderer.renderFiles(refs.outputContainer, result.files, onDownloadFile);
    refs.zipButton.disabled = result.files.length === 0;
    showParseStatus(result, direction);
  }

  function showParseStatus(result, direction) {
    const unit = direction === 'row' ? 'row(s)' : 'column(s)';
    const message = result.files.length
      ? `Generated ${result.files.length} file(s). Skipped ${result.skippedCount} non-empty ${unit}.`
      : `No content found after skipping ${result.skippedCount} non-empty ${unit}.`;
    App.StatusBar.info(refs.statusElement, message);
  }

  async function handleZipClick() {
    if (!state.lastFiles.length) return;
    await App.Downloader.downloadZip(state.lastFiles, `parsed-${Date.now()}.zip`);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
