import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Post } from "src/app/models/Post";
import { Category } from "src/app/models/Category";
import { Province } from "src/app/models/Province";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { CategoryService } from "src/app/services/category.service";
import { LocalService } from "src/app/services/local.service";
import { UploadService } from "src/app/services/upload.service";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { PostService } from "src/app/services/post.service";
import { Router } from "@angular/router";
import { MapService } from "src/app/services/map.service";
import { number } from "src/app/validators/number.validator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PaymentService } from "src/app/services/payment.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-post-form",
  templateUrl: "./post-form.component.html",
  styleUrls: ["./post-form.component.scss"],
})
export class PostFormComponent implements OnInit {
  post: Post;
  accountId: string;
  accountRole: string;
  categories: Category[];
  provinces: Province[];
  districts: any;
  wards: any;
  streets: any;
  address: string;
  form: FormGroup;
  utilityList: string[];

  postLocation = {
    lat: null,
    lng: null,
  };
  isFitBounds = false;

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  links = [];

  constructor(
    private categoryService: CategoryService,
    private localService: LocalService,
    private uploadService: UploadService,
    private mapService: MapService,
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private snackBar: MatSnackBar,
    private paymentService: PaymentService,
    private location: Location
  ) {
    this.utilityList = this.postService.getUtilities();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProvinces();

    this.accountId = localStorage.getItem("accountId");
    this.accountRole = localStorage.getItem("accountRole");

    this.form = this.fb.group({
      categoryId: ["", Validators.required],
      accountId: [this.accountId],
      province: ["", Validators.required],
      district: ["", Validators.required],
      ward: ["", Validators.required],
      street: ["", Validators.required],
      apartmentNumber: ["", Validators.required],
      describe: ["", [Validators.required, Validators.minLength(50)]],
      utilities: this.fb.array([]),
      images: [""],
      acreage: ["", [Validators.required, number]],
      direction: ["", Validators.required],
      numberOfRooms: ["", [Validators.required, number]],
      numberOfToliets: ["", [Validators.required, number]],
      tolietType: ["Khép kín", Validators.required],
      status: ["", Validators.required],
      rentalObject: ["Cả hai", Validators.required],
      closingTime: ["0", Validators.required],
      price: ["", [Validators.required, number]],
      dateSubmitted: [""],
      postDays: [10, [Validators.required, number, Validators.min(10)]],
      dateExpiration: [""],
      isActive: [false],
    });
  }

  // Lấy utilities control
  get utilities() {
    return this.form.get("utilities") as FormArray;
  }

  // Thêm utility
  onAddUtility(utility) {
    this.utilities.push(this.fb.control(utility));
  }

  // Xóa utility
  onRemoveUtility(i) {
    this.utilities.removeAt(i);
  }

  // Xử lý nhấn check box
  onUtilityChange($event) {
    if ($event.target.checked) {
      this.onAddUtility($event.target.value);
    } else {
      let i = this.utilities.controls.findIndex((c) => {
        return c.value === $event.target.value;
      });
      this.onRemoveUtility(i);
    }
  }

  // Lấy danh sách chuyên mục bài đăng
  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Lấy danh sách tỉnh/tp
  getProvinces() {
    this.localService.getProvinces().subscribe((provinces) => {
      this.provinces = provinces;
    });
  }

  // Lấy danh sách quận/huyện theo tỉnh/tp
  getDistricts(provinceName) {
    let province = this.provinces.find((province) => {
      return province.name === provinceName;
    });

    this.districts = province.districts;
  }

  // Lấy danh sách phường/xã, đường/phố theo quận/huyện
  getWardsAndStreets(districtName) {
    let district = this.districts.find((district) => {
      return district.name === districtName;
    });

    this.wards = district.wards;
    this.streets = district.streets;
  }

  // Lấy địa chỉ chính xác
  getAddress() {
    this.isFitBounds = false;
    this.address = `${this.form.value.apartmentNumber}, ${this.form.value.street}, ${this.form.value.ward}, ${this.form.value.district}, ${this.form.value.province}`;
    this.mapService.getGeocode(this.address).subscribe((geocode) => {
      let location = geocode.results[0].geometry.location;

      this.postLocation.lat = location.lat;
      this.postLocation.lng = location.lng;
      this.isFitBounds = true;
    });
  }

  // Xử lý click bản đồ
  onMapClick($event) {
    this.postLocation.lat = $event.coords.lat;
    this.postLocation.lng = $event.coords.lng;

    this.isFitBounds = true;
  }

  // Upload file
  uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file.data);
    formData.append("upload_preset", "ml_default");
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

  // Xử lý khi submit form
  onSubmit() {
    let formValue = this.form.value;
    let amount;

    if (this.accountRole === "2") {
      formValue.isActive = true;
    } else {
      amount = formValue.postDays * 10000;
    }

    formValue.images = this.links.join(";");
    formValue.utilities = JSON.stringify(formValue.utilities);
    formValue.dateSubmitted = new Date().toString();

    formValue.dateExpiration = new Date();
    formValue.dateExpiration.setDate(
      formValue.dateExpiration.getDate() + Number(formValue.postDays)
    );
    formValue.dateExpiration = formValue.dateExpiration.toString();

    delete formValue.postDays;

    this.post = { ...formValue };
    this.post.categoryId = this.post.categoryId;
    this.post.closingTime = Number(this.post.closingTime);
    this.post.acreage = Number(this.post.acreage);
    this.post.numberOfRooms = Number(this.post.numberOfRooms);
    this.post.numberOfToliets = Number(this.post.numberOfToliets);
    this.post.price = Number(this.post.price);
    this.post.lat = this.postLocation.lat;
    this.post.lng = this.postLocation.lng;

    this.postService.add(this.post).subscribe((post) => {
      if (post) {
        if (this.post.isActive) {
          this.snackBar.open(
            "Đăng thành công",
            `${this.post.apartmentNumber} ${this.post.street}`,
            {
              duration: 3000,
            }
          );
          this.router.navigate(["/user/posts"]);
        } else {
          this.paymentService
            .getPaymentUrl(post.id, amount)
            .subscribe((res) => {
              window.location.href = res.data;
            });
        }
      }
    });
  }
}
