window.App = window.App || {};

App.TextBuilder = (() => {
  const PARAGRAPH_SEPARATOR = '\n\n';
  const INVALID_NAME_CHARS = /[^a-z0-9_\-]+/gi;
  const TRIM_UNDERSCORES = /^_+|_+$/g;

  function sanitizeName(rawName) {
    const cleaned = String(rawName)
      .replace(INVALID_NAME_CHARS, '_')
      .replace(TRIM_UNDERSCORES, '');
    return cleaned || 'sheet';
  }

  function buildContent(cells) {
    const utils = App.GridUtils;
    const nonEmptyTexts = cells
      .map(utils.cellToText)
      .filter(text => text.length > 0);
    return nonEmptyTexts.join(PARAGRAPH_SEPARATOR);
  }

  function buildLabel(direction, lineIndex) {
    if (direction === 'row') return `row-${lineIndex + 1}`;
    return `col-${App.GridUtils.colLetter(lineIndex)}`;
  }

  function buildFileName(sheetName, direction, lineIndex) {
    const label = buildLabel(direction, lineIndex);
    return `${sanitizeName(sheetName)}_${label}.txt`;
  }

  return { buildContent, buildFileName };
})();
