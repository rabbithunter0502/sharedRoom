import { Component, OnInit } from "@angular/core";
import { Category } from 'src/app/models/Category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-admin-category-edit",
  templateUrl: "./admin-category-edit.component.html",
  styleUrls: ["./admin-category-edit.component.scss"],
})
export class AdminCategoryEditComponent implements OnInit {
  category: Category;
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private location: Location,
    private snackbar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.route.params.subscribe(params => {
      this.categoryService.getCategory(params.id).subscribe(category => {
        this.category = category;

        this.categoryForm = this.fb.group({
          id: [category.id],
          categoryName: [category.categoryName, Validators.required],
          isActive: [category.isActive],
        });
      })
    })
  }

  onSubmit() {
    this.category = this.categoryForm.value;

    this.categoryService.edit(this.category).subscribe((category) => {
      if (category) {
        this.snackbar.open("Cập nhật thành công", category.categoryName, {
          duration: 3000,
        });
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
