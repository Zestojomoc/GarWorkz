export function trapDialogFocus(event) {
  if (event.key !== 'Tab') return;
  const elements = [
    ...event.currentTarget.querySelectorAll(
      'a[href],button:not([disabled]),input,select,textarea,[tabindex="0"]',
    ),
  ].filter((element) => element.checkVisibility());
  const first = elements[0];
  const last = elements.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
}
