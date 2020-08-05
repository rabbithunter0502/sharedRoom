import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/models/Post";
import { PostService } from "src/app/services/post.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
import * as XLSX from "xlsx";

@Component({
  selector: "app-user-posts",
  templateUrl: "./user-posts.component.html",
  styleUrls: ["./user-posts.component.scss"],
})
export class UserPostsComponent implements OnInit {
  accountId: string;
  posts: Post[];
  field: string = "postDayASC";
  searchKeyword = "";

  filters = {
    categoryId: [],
    acreage: [],
    price: [],
  };

  constructor(
    private accountService: AccountService,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPostsByAccount();
  }

  getPostsByAccount() {
    this.accountId = localStorage.getItem("accountId");
    this.accountService.getPostsByAccount(this.accountId).subscribe((posts) => {
      this.posts = posts;
    });
  }

  checkExpiration(post: Post) {
    return new Date(post.dateExpiration).getTime() - new Date().getTime();
  }

  onSortChange($event) {
    this.field = $event.target.value;
  }

  onFilterChange(filterString) {
    this.filters = JSON.parse(filterString);
  }

  onSearchKeyup(searchKeyword) {
    this.searchKeyword = searchKeyword;
  }

  fileName = "Danh sách bài đăng.xlsx";
  exportExcel() {
    /* table id is passed over here */

    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
