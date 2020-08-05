import { AbstractControl, ValidationErrors } from "@angular/forms";

export function number(c: AbstractControl) {
  let value = c.value;

  if (value && (isNaN(value) || value < 1)) {
    return { number: true };
  } else {
    return null;
  }
}
