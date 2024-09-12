export function getInput(
  formName: HTMLFormElement,
  inputName: string
): HTMLInputElement {
  return formName.elements.namedItem(inputName) as HTMLInputElement;
}
