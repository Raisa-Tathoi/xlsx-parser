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

  function transpose(grid) {
    if (!grid.length) return [];
    const columnCount = getMaxRowLength(grid);
    const transposed = [];
    for (let colIdx = 0; colIdx < columnCount; colIdx++) {
      const column = [];
      for (let rowIdx = 0; rowIdx < grid.length; rowIdx++) {
        column.push(grid[rowIdx][colIdx] ?? '');
      }
      transposed.push(column);
    }
    return transposed;
  }

  function colLetter(index) {
    let label = '';
    let remaining = index;
    do {
      label = String.fromCharCode(65 + (remaining % 26)) + label;
      remaining = Math.floor(remaining / 26) - 1;
    } while (remaining >= 0);
    return label;
  }

  return { cellToText, isNonEmpty, transpose, colLetter };
})();
