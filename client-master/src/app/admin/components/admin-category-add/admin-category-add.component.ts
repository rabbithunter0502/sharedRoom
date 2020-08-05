import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/models/Category";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CategoryService } from "src/app/services/category.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-admin-category-add",
  templateUrl: "./admin-category-add.component.html",
  styleUrls: ["./admin-category-add.component.scss"],
})
export class AdminCategoryAddComponent implements OnInit {
  category: Category;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private location: Location,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.category = new Category();

    this.form = this.fb.group({
      categoryName: ["", Validators.required],
      isActive: [true]
    });
  }

  onSubmit() {
    this.category = this.form.value;

    this.categoryService.add(this.category).subscribe((category) => {
      if (category) {
        this.snackbar.open("Thêm thành công", category.categoryName, {
          duration: 3000,
        });

        this.router.navigate(["/admin/category-list"]);
      } else {
        this.snackbar.open("Đã có lỗi xảy ra", "Opps", {
          duration: 3000,
        });
      }
    });
  }

  back() {
    this.location.back();
  }
}
