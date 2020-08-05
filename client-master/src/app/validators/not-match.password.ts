import { FormGroup } from "@angular/forms";

export function notMatchPassword(oldPassword, password) {
  return (formGroup: FormGroup) => {
    let oldPasswordControl = formGroup.get(oldPassword);
    let passwordControl = formGroup.get(password);

    if (passwordControl.errors && !passwordControl.errors.notMatchPassword)
      return;

    if (oldPasswordControl.value === passwordControl.value) {
      passwordControl.setErrors({
        notMatchPassword: true,
      });
    } else {
      passwordControl.setErrors(null);
    }
  };
}
