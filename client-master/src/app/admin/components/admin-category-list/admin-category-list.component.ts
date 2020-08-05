import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Category } from "src/app/models/Category";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CategoryService } from "src/app/services/category.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-admin-category-list",
  templateUrl: "./admin-category-list.component.html",
  styleUrls: ["./admin-category-list.component.scss"],
})
export class AdminCategoryListComponent implements OnInit {
  displayedColumns: string[] = ["id", "categoryName", "isActive", "action"];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoryService) {
    this.getAccounts();
  }

  ngOnInit(): void {}

  getAccounts() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.dataSource = new MatTableDataSource<Category>(categories);
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
