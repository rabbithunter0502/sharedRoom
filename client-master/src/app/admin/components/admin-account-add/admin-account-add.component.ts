import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Account } from "src/app/models/Account";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UploadService } from "src/app/services/upload.service";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "@angular/common";
import { duplicateEmail } from "src/app/validators/duplicate-email.validator";
import { duplicatePhone } from "src/app/validators/duplicate-phone.validator";

@Component({
  selector: "app-admin-account-add",
  templateUrl: "./admin-account-add.component.html",
  styleUrls: ["./admin-account-add.component.scss"],
})
export class AdminAccountAddComponent implements OnInit {
  account: Account;
  form: FormGroup;
  maxDate: Date;

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  links = [];

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: ["", [Validators.required, Validators.minLength(8)]],
      email: [
        "",
        [Validators.required, Validators.minLength(8), Validators.email],
        duplicateEmail(this.accountService),
      ],
      phoneNumber: [
        "",
        [Validators.required, Validators.pattern("^0[0-9]{9}$")],
        duplicatePhone(this.accountService),
      ],
      sex: ["Nam"],
      dateOfBirth: ["", [Validators.required]],
      password: ["NDndndKdkjnfdfF"],
      role: ["1"],
      isActive: [true],
    });
  }

  // Upload file
  uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file.data);
    formData.append("upload_preset", "mk32kn4h");
    file.inProgress = true;

    this.uploadService
      .upload(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === "object") {
          this.links.push(event.body.url);
        }
      });
  }

  // Upload files
  private uploadFiles() {
    this.fileUpload.nativeElement.value = "";
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  // Xử lý khi upload file
  upload() {
    this.links = [];
    this.files = [];

    const fileUpload = this.fileUpload.nativeElement;
    for (let index = 0; index < fileUpload.files.length; index++) {
      const file = fileUpload.files[index];
      this.files.push({ data: file, inProgress: false, progress: 0 });
    }
    this.uploadFiles();
  }

  // Xử lý submit
  onSubmit() {
    this.form.value.dateOfBirth = this.form.value.dateOfBirth.toString();
    delete this.form.value.rePassword;

    this.account = { ...this.form.value };
    this.account.avatar = this.links[0];
    this.account.role = Number(this.account.role);

    this.accountService.addAccount(this.account).subscribe((account) => {
      if (account) {
        this.router.navigate([`/admin/account-detail/${account.id}`]);

        this.snackBar.open("Thêm thành công", account.fullName, {
          duration: 3000,
        });
      } else {
        this.snackBar.open("Đã có lỗi xảy ra", "Opps", {
          duration: 3000,
        });
      }
    });
  }

  // Xử lý nhấn back
  back() {
    this.location.back();
  }
}
