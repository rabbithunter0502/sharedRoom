import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { AccountService } from "src/app/services/account.service";
import { Account } from "src/app/models/Account";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  account: Account;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("accountId")) {
      let accountId = localStorage.getItem("accountId");

      this.accountService.getAccount(accountId).subscribe(
        (account) => {
          this.account = account;
        },
        (error) => {
          this.snackBar.open("Có lỗi trong quá trình đăng nhập", "Thử lại", {
            duration: 3000,
          });
          this.authService.logout();
        }
      );
    }

    this.authService.getLoggedInAccountId.subscribe((accountId) => {
      if (accountId) {
        this.accountService.getAccount(accountId).subscribe(
          (account) => {
            this.account = account;
          },
          (error) => {
            this.snackBar.open("Có lỗi trong quá trình đăng nhập", "Thử lại", {
              duration: 3000,
            });
            this.authService.logout();
          }
        );
      } else {
        this.account = null;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
