import { Component, OnInit, ViewChild } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { Account } from "src/app/models/Account";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: "app-admin-account-list",
  templateUrl: "./admin-account-list.component.html",
  styleUrls: ["./admin-account-list.component.scss"],
})
export class AdminAccountListComponent implements OnInit {
  displayedColumns: string[] = [
    "avatar",
    "fullName",
    "sex",
    "email",
    "phoneNumber",
    "dateOfBirth",
    "role",
    "isActive",
    "action",
  ];
  dataSource: MatTableDataSource<Account>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.getAccounts();
  }

  ngOnInit(): void {}

  getAccounts() {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.dataSource = new MatTableDataSource<Account>(accounts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // remove(id) {
  //   const currentAccountId = localStorage.getItem("accountId");

  //   if (currentAccountId == id) {
  //     this.snackBar.open("Opps! Bạn không thể xóa chính mình.", "Lỗi", {
  //       duration: 3000,
  //     });
  //   } else {
  //     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //       width: '500px',
  //       data: {title: "Xác nhận", message: "Bạn chắc muốn xóa tài khoản này chứ?"}
  //     });
  
  //     dialogRef.afterClosed().subscribe(result => {
  //       if(result) {
  //         this.accountService.remove(id).subscribe(account => {
  //           if(account) {
  //             this.snackBar.open("Đã xóa.", account.fullName, {
  //               duration: 3000,
  //             });
  //           } else {
  //             this.snackBar.open("Opps! Đã có lỗi xảy ra.", "Lỗi", {
  //               duration: 3000,
  //             });
  //           }
  //         })
  //       }
  //     });
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
