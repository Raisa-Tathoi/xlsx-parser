(() => {
  function bindHandlers(refs, state) {
    const handlers = App.EventHandlers;
    refs.fileInput.addEventListener('change',
      event => handlers.onFileChange(event, refs, state));
    refs.parseButton.addEventListener('click',
      () => handlers.onParseClick(refs, state));
    refs.zipButton.addEventListener('click',
      () => handlers.onZipClick(state));
    refs.directionRadios.forEach(radio =>
      radio.addEventListener('change', () => handlers.onDirectionChange(refs)));
  }

  function init() {
    const refs = App.DomRefs.getRefs();
    const state = App.AppState.createState();
    bindHandlers(refs, state);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
