import { Component, OnInit } from "@angular/core";
import { Account } from "src/app/models/Account";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { matchPassword } from "src/app/validators/must-match.validator";

@Component({
  selector: "app-admin-change-password",
  templateUrl: "./admin-change-password.component.html",
  styleUrls: ["./admin-change-password.component.scss"],
})
export class AdminChangePasswordComponent implements OnInit {
  form: FormGroup;
  email: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private accountService: AccountService,
    private location: Location,
    private snackBar: MatSnackBar,
    private router: Router
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

  back() {
    this.location.back();
  }
}
