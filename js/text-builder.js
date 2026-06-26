window.App = window.App || {};

App.TextBuilder = (() => {
  const PARAGRAPH_SEPARATOR = '\n\n';

  function buildContent(cells) {
    const nonEmptyTexts = cells
      .map(App.GridUtils.cellToText)
      .filter(text => text.length > 0);
    return nonEmptyTexts.join(PARAGRAPH_SEPARATOR);
  }

  return { buildContent };
})();
