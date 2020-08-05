import { Component, OnInit } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { Account } from "src/app/models/Account";

@Component({
  selector: "app-admin-home",
  templateUrl: "./admin-home.component.html",
  styleUrls: ["./admin-home.component.scss"],
})
export class AdminHomeComponent implements OnInit {
  account: Account;
  time;

  constructor(private accountService: AccountService) {
    this.time = new Date().getHours();
  }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount() {
    const accountId = localStorage.getItem("accountId");
    this.accountService.getAccount(accountId).subscribe((account) => {
      this.account = account;
    });
  }
}
