import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
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
        [Validators.required, Validators.minLength(8), Validators.email],
      ],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    // this.authService.login(this.form.value).subscribe(
    //   () => {
    //     if (this.authService.isLoggedIn()) {
    //       let accountRole = localStorage.getItem("accountRole");

    //       if (accountRole === "1") {
    //         this.router.navigate(["admin"]);
    //       } else {
    //         this.router.navigate([""]);
    //       }
    //     } else {
    //       this.snackBar.open(
    //         "Tên đăng nhập hoặc mật khẩu không chính xác",
    //         "Opps",
    //         {
    //           duration: 5000,
    //         }
    //       );
    //     }
    //   }
    // );

    this.authService.login(this.form.value).subscribe(
      (res) => {
        localStorage.setItem("accountId", res.id);
        localStorage.setItem("token", res.token);
        this.accountService.getAccount(res.id).subscribe((account) => {
          if (account.isActive) {
            localStorage.setItem("accountRole", account.role.toString());

            if (account.role === 1) {
              this.router.navigate(["/admin"]);
            } else {
              this.router.navigate([""]);
            }
          } else {
            this.authService.logout();
            this.snackBar.open(
              "Tài khoản của bạn không còn hoạt động",
              "Opps",
              {
                duration: 3000,
              }
            );
          }
        });
      },
      (error) => {
        this.snackBar.open(
          "Tên đăng nhập hoặc mật khẩu không chính xác",
          "Opps",
          {
            duration: 3000,
          }
        );
      }
    );
  }
}
