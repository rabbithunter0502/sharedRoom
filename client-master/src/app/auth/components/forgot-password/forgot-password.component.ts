import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AccountService } from "src/app/services/account.service";
import { duplicateEmail } from "src/app/validators/duplicate-email.validator";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.email
        ],
      ],
    });
  }

  onSubmit() {
    this.authService.sendResetPasswordUrl(this.form.value.email).subscribe(
      (messageResponse) => {
        this.router.navigateByUrl("/auth");
        this.snackBar.open("Yêu cầu thành công", "Kiểm tra email", {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open("Email này không tồn tại", "Opps", {
          duration: 3000,
        });
      }
    );
  }
}
