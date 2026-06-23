window.App = window.App || {};

App.DomRefs = (() => {
  function getRefs() {
    return {
      fileInput:        document.getElementById('file'),
      sheetSelect:      document.getElementById('sheet'),
      skipInput:        document.getElementById('skip'),
      skipLabel:        document.getElementById('skipLabel'),
      parseButton:      document.getElementById('parseBtn'),
      zipButton:        document.getElementById('zipBtn'),
      statusElement:    document.getElementById('status'),
      outputContainer:  document.getElementById('output'),
      directionRadios:  document.querySelectorAll('input[name="dir"]'),
    };
  }

  return { getRefs };
})();
