export function placeCursorToEnd(ref) {
  setTimeout(() => {
    ref.current.setSelectionRange(
      ref.current.value.length,
      ref.current.value.length
    );
    ref.current.focus();
  }, 0);
}
