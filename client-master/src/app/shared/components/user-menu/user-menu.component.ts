import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/Account';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
 account: Account;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("accountId")) {
      let accountId = localStorage.getItem("accountId");

      this.accountService.getAccount(accountId).subscribe(account => {
        this.account = account;
      })
    }

    this.authService.getLoggedInAccountId.subscribe(accountId => {
      if (accountId) {
        this.accountService.getAccount(accountId).subscribe(account => {
          this.account = account;
        })
      } else {
        this.account = null;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
