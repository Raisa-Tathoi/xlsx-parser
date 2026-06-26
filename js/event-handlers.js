window.App = window.App || {};

App.EventHandlers = (() => {
  function onDownloadFile(file) {
    App.Downloader.downloadText(file.name, file.content);
  }

  function onDirectionChange(refs) {
    const direction = App.AppState.getDirection();
    refs.skipLabel.textContent = direction === 'row' ? 'rows' : 'columns';
  }

  function applyLoadedWorkbook(refs, state, file, sheetNames) {
    App.UiRenderer.populateSheetSelect(refs.sheetSelect, sheetNames);
    refs.sheetSelect.disabled = false;
    refs.parseButton.disabled = false;
    const message = `Loaded "${file.name}" — ${sheetNames.length} sheet(s).`;
    App.StatusBar.info(refs.statusElement, message);
  }

  async function onFileChange(event, refs, state) {
    const file = event.target.files[0];
    if (!file) return;
    App.StatusBar.info(refs.statusElement, 'Reading file…');
    try {
      state.workbook = await App.WorkbookLoader.loadFromFile(file);
      const sheetNames = App.WorkbookLoader.getSheetNames(state.workbook);
      applyLoadedWorkbook(refs, state, file, sheetNames);
    } catch (err) {
      App.StatusBar.error(refs.statusElement, `Failed to read file: ${err.message}`);
    }
  }

  function buildParseStatusMessage(result, direction) {
    const unit = direction === 'row' ? 'row(s)' : 'column(s)';
    if (!result.files.length) {
      return `No content found after skipping ${result.skippedCount} non-empty ${unit}.`;
    }
    return `Generated ${result.files.length} file(s). Skipped ${result.skippedCount} non-empty ${unit}.`;
  }

  function runParse(refs, state) {
    const direction = App.AppState.getDirection();
    const result = App.Parser.parse({
      workbook: state.workbook,
      sheetName: refs.sheetSelect.value,
      direction,
      skipCount: App.AppState.getSkipCount(refs.skipInput),
    });
    state.lastFiles = result.files;
    App.UiRenderer.renderFiles(refs.outputContainer, result.files, onDownloadFile);
    refs.zipButton.disabled = result.files.length === 0;
    App.StatusBar.info(refs.statusElement, buildParseStatusMessage(result, direction));
  }

  function onParseClick(refs, state) {
    if (!state.workbook) return;
    runParse(refs, state);
  }

  async function onZipClick(state) {
    if (!state.lastFiles.length) return;
    const zipName = `parsed-${Date.now()}.zip`;
    await App.Downloader.downloadZip(state.lastFiles, zipName);
  }

  return { onFileChange, onParseClick, onZipClick, onDirectionChange };
})();
