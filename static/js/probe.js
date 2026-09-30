// T-TIMING: when is window.inEditorMode set relative to a deferred script and DOMContentLoaded?
console.log("[T-TIMING] deferred script ran: inEditorMode =", window.inEditorMode);
document.addEventListener("DOMContentLoaded", function () {
  console.log("[T-TIMING] DOMContentLoaded: inEditorMode =", window.inEditorMode);
});
window.addEventListener("load", function () {
  console.log("[T-TIMING] load: inEditorMode =", window.inEditorMode);
});

// T-SUMMARY-FIX: open <details data-editor-open> in the editor, so regions inside are reachable.
function openDetailsInEditor() {
  if (!window.inEditorMode) return false;
  document.querySelectorAll("details[data-editor-open]").forEach(function (d) { d.open = true; });
  return true;
}
if (!openDetailsInEditor()) {
  document.addEventListener("DOMContentLoaded", openDetailsInEditor);
  window.addEventListener("load", function () {
    console.log("[T-SUMMARY-FIX] load: opened =", openDetailsInEditor());
  });
}
