window.App = window.App || {};

App.AppState = (() => {
  function createState() {
    return { workbook: null, lastFiles: [] };
  }

  function getDirection() {
    return document.querySelector('input[name="dir"]:checked').value;
  }

  function getSkipCount(skipInput) {
    const parsed = parseInt(skipInput.value, 10);
    return Math.max(0, Number.isFinite(parsed) ? parsed : 0);
  }

  return { createState, getDirection, getSkipCount };
})();
