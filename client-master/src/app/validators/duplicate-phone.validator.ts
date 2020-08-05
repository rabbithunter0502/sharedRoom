import { AbstractControl } from "@angular/forms";
import { AccountService } from "../services/account.service";
import { map } from "rxjs/operators";

export function duplicatePhone(accountService: AccountService) {
  return (c: AbstractControl) => {
    return accountService.getAccounts().pipe(
      map((accounts) => {
        let i = accounts.findIndex((account) => account.phoneNumber === c.value);

        if (i !== -1) {
          return {
            duplicatePhone: true,
          };
        } else {
          return null;
        }
      })
    );
  };
}
