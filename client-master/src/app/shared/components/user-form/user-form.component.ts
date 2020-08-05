import { Component, OnInit } from "@angular/core";
import { Account } from "src/app/models/account";
import { AuthService } from "src/app/services/auth.service";
import { AccountService } from "src/app/services/account.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.scss"],
})
export class UserFormComponent implements OnInit {
  account: Account;
  form: FormGroup;
  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnInit(): void {
    let accountId = localStorage.getItem("accountId");

    this.accountService.getAccount(accountId).subscribe((account) => {
      this.account = account;

      let dateOfBirth = new Date(account.dateOfBirth);
      let dateOfBrithFormat = `${dateOfBirth.getMonth() + 1}/${dateOfBirth.getDate()}/${dateOfBirth.getFullYear()}`;

      this.form = this.fb.group({
        id: [this.account.id],
        fullName: [
          this.account.fullName,
          [Validators.required, Validators.minLength(8)],
        ],
        avatar: [this.account.avatar],
        email: [
          this.account.email,
          [Validators.required, Validators.minLength(8), Validators.email],
        ],
        phoneNumber: [
          this.account.phoneNumber,
          [Validators.required, Validators.pattern("^0[0-9]{9}$")],
        ],
        sex: [this.account.sex],
        dateOfBirth: [dateOfBrithFormat, [Validators.required]],
        role: [this.account.role],
      });
    });
  }

  // Xử lý submit
  onSubmit() {
    this.form.value.dateOfBirth = this.form.value.dateOfBirth.toString();
    this.account = { ...this.form.value };

    this.accountService.editAccount(this.account).subscribe((account) => {
      if (account) {
        this.snackBar.open("Cập nhật thành công", account.fullName, {
          duration: 3000,
        });
        this.router.navigate(["/auth"]);
      }
    });
  }
}
