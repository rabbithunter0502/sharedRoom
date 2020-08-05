import { FormGroup } from "@angular/forms";

export function matchPassword(password, rePassword) {
  return (formGroup: FormGroup) => {
    let passwordControl = formGroup.get(password);
    let rePasswordControl = formGroup.get(rePassword);

    if (rePasswordControl.errors && !rePasswordControl.errors.matchPassword)
      return;

    if (passwordControl.value !== rePasswordControl.value) {
      rePasswordControl.setErrors({
        matchPassword: true,
      });
    } else {
      rePasswordControl.setErrors(null);
    }
  };
}
