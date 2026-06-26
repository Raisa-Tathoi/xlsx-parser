window.App = window.App || {};

App.ColumnLabel = (() => {
  const ALPHABET_BASE = 65;
  const ALPHABET_SIZE = 26;

  function fromIndex(index) {
    let label = '';
    let remaining = index;
    do {
      const charCode = ALPHABET_BASE + (remaining % ALPHABET_SIZE);
      label = String.fromCharCode(charCode) + label;
      remaining = Math.floor(remaining / ALPHABET_SIZE) - 1;
    } while (remaining >= 0);
    return label;
  }

  return { fromIndex };
})();
