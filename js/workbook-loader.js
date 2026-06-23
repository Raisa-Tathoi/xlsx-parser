window.App = window.App || {};

App.WorkbookLoader = (() => {
  const SHEET_TO_GRID_OPTIONS = {
    header: 1,
    defval: '',
    blankrows: true,
    raw: false,
  };

  async function loadFromFile(file) {
    const buffer = await file.arrayBuffer();
    return XLSX.read(buffer, { type: 'array' });
  }

  function getSheetNames(workbook) {
    return workbook?.SheetNames ?? [];
  }

  function getSheetGrid(workbook, sheetName) {
    const sheet = workbook?.Sheets?.[sheetName];
    if (!sheet) return null;
    return XLSX.utils.sheet_to_json(sheet, SHEET_TO_GRID_OPTIONS);
  }

  return { loadFromFile, getSheetNames, getSheetGrid };
})();
