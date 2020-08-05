import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UploadService } from "src/app/services/upload.service";
import { AccountService } from "src/app/services/account.service";
import { Account } from "src/app/models/Account";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-change-avatar",
  templateUrl: "./admin-change-avatar.component.html",
  styleUrls: ["./admin-change-avatar.component.scss"],
})
export class AdminChangeAvatarComponent implements OnInit {
  account: Account;
  maxDate: Date;

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  links = [];

  constructor(
    private accountService: AccountService,
    private uploadService: UploadService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    let accountId = localStorage.getItem("accountId");

    this.accountService.getAccount(accountId).subscribe((account) => {
      this.account = account;
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
          console.log(event.body);
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
    if (this.links.length !== 0) {
      this.account.avatar = this.links[0];

      this.accountService.editAccount(this.account).subscribe((account) => {
        if (account) {
          this.snackBar.open(
            "Đổi hình đại diện thành công!",
            account.fullName,
            {
              duration: 3000,
            }
          );
          this.router.navigateByUrl("/auth").then(() => {
            this.router.navigate(["/admin/change-avatar"]);
          });
        } else {
          this.snackBar.open("Đã có lỗi xảy ra", "Opps", {
            duration: 3000,
          });
        }
      });
    }
  }

  // Xử lý click back
  back() {
    this.location.back();
  }
}
