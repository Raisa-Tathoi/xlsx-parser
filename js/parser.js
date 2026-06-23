window.App = window.App || {};

App.Parser = (() => {
  function getLinesByDirection(grid, direction) {
    return direction === 'row' ? grid : App.GridUtils.transpose(grid);
  }

  function findStartIndex(lines, skipCount) {
    const isNonEmpty = App.GridUtils.isNonEmpty;
    let skipped = 0;
    for (let idx = 0; idx < lines.length; idx++) {
      if (!isNonEmpty(lines[idx])) continue;
      if (skipped < skipCount) { skipped++; continue; }
      return { startIndex: idx, skippedCount: skipped };
    }
    return { startIndex: lines.length, skippedCount: skipped };
  }

  function buildFiles(lines, startIndex, direction, sheetName) {
    const { isNonEmpty } = App.GridUtils;
    const { buildContent, buildFileName } = App.TextBuilder;
    const files = [];
    for (let idx = startIndex; idx < lines.length; idx++) {
      if (!isNonEmpty(lines[idx])) continue;
      files.push({
        name: buildFileName(sheetName, direction, idx),
        content: buildContent(lines[idx]),
      });
    }
    return files;
  }

  function parse({ workbook, sheetName, direction, skipCount }) {
    const grid = App.WorkbookLoader.getSheetGrid(workbook, sheetName);
    if (!grid) return { files: [], skippedCount: 0 };
    const lines = getLinesByDirection(grid, direction);
    const { startIndex, skippedCount } = findStartIndex(lines, skipCount);
    const files = buildFiles(lines, startIndex, direction, sheetName);
    return { files, skippedCount };
  }

  return { parse };
})();
