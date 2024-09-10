import { FormNames } from "@/types/types";

export function findForm(formName: FormNames) {
  const form = document.forms.namedItem(formName);
  return form;
}
