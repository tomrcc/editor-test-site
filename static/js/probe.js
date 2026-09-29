// T-TIMING: when is window.inEditorMode set relative to a deferred script and DOMContentLoaded?
console.log("[T-TIMING] deferred script ran: inEditorMode =", window.inEditorMode);
document.addEventListener("DOMContentLoaded", function () {
  console.log("[T-TIMING] DOMContentLoaded: inEditorMode =", window.inEditorMode);
});
window.addEventListener("load", function () {
  console.log("[T-TIMING] load: inEditorMode =", window.inEditorMode);
});
