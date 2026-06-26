window.App = window.App || {};

App.GridUtils = (() => {
  function cellToText(cell) {
    return String(cell ?? '').trim();
  }

  function isNonEmpty(cells) {
    return cells.some(cell => cellToText(cell).length > 0);
  }

  function getMaxRowLength(grid) {
    return grid.reduce((max, row) => Math.max(max, row.length), 0);
  }

  function buildColumn(grid, colIdx) {
    const column = [];
    for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
      column.push(grid[rowIdx][colIdx] ?? '');
    }
    return column;
  }

  function transpose(grid) {
    if (!grid.length) return [];
    const columnCount = getMaxRowLength(grid);
    const transposed = [];
    for (let colIdx = 0; colIdx < columnCount; colIdx++) {
      transposed.push(buildColumn(grid, colIdx));
    }
    return transposed;
  }

  return { cellToText, isNonEmpty, transpose };
})();
