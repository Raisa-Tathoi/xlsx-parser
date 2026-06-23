window.App = window.App || {};

App.Downloader = (() => {
  const TEXT_MIME = 'text/plain;charset=utf-8';

  function triggerAnchorDownload(url, fileName) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      anchor.remove();
    }, 0);
  }

  function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    triggerAnchorDownload(url, fileName);
  }

  function downloadText(fileName, textContent) {
    downloadBlob(new Blob([textContent], { type: TEXT_MIME }), fileName);
  }

  async function downloadZip(files, zipFileName) {
    const zip = new JSZip();
    files.forEach(file => zip.file(file.name, file.content));
    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, zipFileName);
  }

  return { downloadBlob, downloadText, downloadZip };
})();
