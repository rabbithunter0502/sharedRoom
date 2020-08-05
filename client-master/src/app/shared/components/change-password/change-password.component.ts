import { Component, OnInit } from "@angular/core";
import { Account } from "src/app/models/Account";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";
import { matchPassword } from "src/app/validators/must-match.validator";
import { notMatchPassword } from "src/app/validators/not-match.password";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  email: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    let accountId = localStorage.getItem("accountId");

    this.accountService.getAccount(accountId).subscribe((account) => {
      this.email = account.email;
      this.form = this.fb.group(
        {
          email: [account.email],
          confirmEmail: ["", [Validators.required]],
        },
        {
          validator: matchPassword("email", "confirmEmail"),
        }
      );
    });
  }

  // Xử lý submit
  onSubmit() {
    this.authService
      .sendResetPasswordUrl(this.form.value.confirmEmail)
      .subscribe(
        (messageResponse) => {
          this.authService.logout();
          this.snackBar.open("Yêu cầu thành công", "Kiểm tra email", {
            duration: 3000,
          });
        },
        (error) => {
          this.snackBar.open("Đã có lỗi xảy ra", "Opps", {
            duration: 3000,
          });
        }
      );
  }
}
