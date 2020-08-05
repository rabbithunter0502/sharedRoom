import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Post } from "src/app/models/Post";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-admin-post-list",
  templateUrl: "./admin-post-list.component.html",
  styleUrls: ["./admin-post-list.component.scss"],
})
export class AdminPostListComponent implements OnInit {
  displayedColumns: string[] = [
    "apartmentNumber",
    "street",
    "district",
    "province",
    "acreage",
    "price",
    "dateSubmitted",
    "dateExpiration",
    "isActive",
    "action",
  ];
  dataSource: MatTableDataSource<Post>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private postService: PostService) {
    this.getPosts();
  }

  ngOnInit(): void {}

  getPosts() {
    this.postService.getPosts().subscribe((posts) => {
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
}
