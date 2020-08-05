import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { AccountService } from "src/app/services/account.service";
import { UploadService } from "src/app/services/upload.service";
import { Account } from "src/app/models/Account";
import { Router } from "@angular/router";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-change-avatar",
  templateUrl: "./change-avatar.component.html",
  styleUrls: ["./change-avatar.component.scss"],
})
export class ChangeAvatarComponent implements OnInit {
  account: Account;
  maxDate: Date;

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  links = [];

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private uploadService: UploadService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      let accountId = localStorage.getItem("accountId");

      this.accountService.getAccount(accountId).subscribe((account) => {
        this.account = account;
      });
    } else {
      this.router.navigate(["/auth"]);
    }
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
    if (this.links.length !== 0) {
      this.account.avatar = this.links[0];

      this.accountService.editAccount(this.account).subscribe((account) => {
        if (account) {
          this.snackBar.open("Thay đổi thành công", this.account.fullName, {
            duration: 3000,
          });
          this.router.navigateByUrl("/auth").then(() => {
            this.router.navigate(["user/change-avatar"]);
          });
        }
      });
    } else {
      this.snackBar.open("Bạn chưa chọn ảnh", "Opps", {
        duration: 3000,
      });
    }
  }
}
