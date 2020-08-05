import { Component, OnInit, ViewChild } from "@angular/core";
import { Account } from "src/app/models/Account";
import { Post } from "src/app/models/Post";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
import { PostService } from "src/app/services/post.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: "app-admin-account-detail",
  templateUrl: "./admin-account-detail.component.html",
  styleUrls: ["./admin-account-detail.component.scss"],
})
export class AdminAccountDetailComponent implements OnInit {
  currentAccountId: string;
  account: Account;
  posts: Post[];
  accountForm: FormGroup;

  displayedColumns: string[] = [
    "apartmentNumber",
    "street",
    "district",
    "province",
    "acreage",
    "price",
    "dateSubmitted",
    "dateExpiration",
    "action",
  ];
  dataSource: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private postService: PostService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAccountAndPosts();
    this.currentAccountId = localStorage.getItem("accountId");
  }

  getAccountAndPosts() {
    const id = this.route.snapshot.paramMap.get("id");

    this.accountService.getAccount(id).subscribe((account) => {
      this.account = account;

      this.accountForm = this.fb.group({
        id: [account.id],
        fullName: [account.fullName],
        email: [account.email],
        phoneNumber: [account.phoneNumber],
        avatar: [account.avatar],
        sex: [account.sex],
        dateOfBirth: [account.dateOfBirth],
        role: [account.role.toString()],
        isActive: [account.isActive]
      });
    });

    this.accountService.getPostsByAccount(id).subscribe((posts) => {
      this.posts = posts;
      this.dataSource = new MatTableDataSource<Post>(posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    this.account.role = Number(this.accountForm.value.role);
    this.account.isActive = this.accountForm.value.isActive;

    this.accountService.editAccount(this.account).subscribe(account => {
      if (account) {
        this.snackBar.open("Cập nhật thành công!", account.fullName, {
          duration: 3000,
        });
      } else {
        this.snackBar.open("Opps! Đã có lỗi xảy ra...", "", {
          duration: 3000,
        });
      }
    })
  }

  back() {
    this.location.back();
  }
}
