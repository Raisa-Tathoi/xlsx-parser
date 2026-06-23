window.App = window.App || {};

App.StatusBar = (() => {
  const ERROR_CLASS = 'err';
  const INFO_CLASS = 'muted';

  function setMessage(element, message, isError) {
    element.textContent = message;
    element.className = isError ? ERROR_CLASS : INFO_CLASS;
  }

  function info(element, message) {
    setMessage(element, message, false);
  }

  function error(element, message) {
    setMessage(element, message, true);
  }

  return { info, error };
})();
