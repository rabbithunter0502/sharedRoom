import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "src/app/models/Post";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UploadService } from "src/app/services/upload.service";
import { LocalService } from "src/app/services/local.service";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "src/app/models/Category";
import { Province } from "src/app/models/Province";
import { HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { number } from "src/app/validators/number.validator";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-post-edit",
  templateUrl: "./post-edit.component.html",
  styleUrls: ["./post-edit.component.scss"],
})
export class PostEditComponent implements OnInit {
  @Input() post: Post;
  postImages = [];

  accountId: string;
  categories: Category[];
  provinces: Province[];
  districts: any;
  wards: any;
  streets: any;
  form: FormGroup;
  utilityList: string[];

  @ViewChild("fileUpload", { static: false }) fileUpload: ElementRef;
  files = [];
  links = [];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private localService: LocalService,
    private uploadService: UploadService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.utilityList = this.postService.getUtilities();
  }

  ngOnInit(): void {
    this.getPost();
    this.getCategories();
    this.getProvinces();

    this.accountId = localStorage.getItem("accountId");
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get("id");
    this.postService.getPost(id).subscribe((post) => {
      this.post = post;
      this.postImages = post.images.split(";");

      let cs = JSON.parse(this.post.utilities).map((utility) => {
        return this.fb.control(utility);
      });

      this.form = this.fb.group({
        id: [this.post.id],
        categoryId: [this.post.categoryId, Validators.required],
        accountId: [this.post.accountId],
        province: [this.post.province, Validators.required],
        district: [this.post.district, Validators.required],
        ward: [this.post.ward, Validators.required],
        street: [this.post.street, Validators.required],
        apartmentNumber: [this.post.apartmentNumber, Validators.required],
        describe: [
          this.post.describe,
          [Validators.required, Validators.minLength(50)],
        ],
        utilities: this.fb.array(cs),
        images: [this.post.images, Validators.required],
        acreage: [this.post.acreage, [Validators.required, number]],
        direction: [this.post.direction, Validators.required],
        numberOfRooms: [this.post.numberOfRooms, [Validators.required, number]],
        numberOfToliets: [
          this.post.numberOfToliets,
          [Validators.required, number],
        ],
        tolietType: [this.post.tolietType, Validators.required],
        status: [this.post.status, Validators.required],
        rentalObject: [this.post.rentalObject, Validators.required],
        closingTime: [this.post.closingTime, Validators.required],
        price: [this.post.price, [Validators.required, number]],
        dateSubmitted: [this.post.dateSubmitted, Validators.required],
        dateExpiration: [this.post.dateExpiration, Validators.required],
        lat: [this.post.lat],
        lng: [this.post.lng],
        isActive: [this.post.isActive],
      });
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
      let i = this.findUtilityIndex($event.target.value);
      this.onRemoveUtility(i);
    }
  }

  findUtilityIndex(value) {
    return this.utilities.controls.findIndex((c) => {
      return c.value === value;
    });
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

  // Xử lý khi submit form
  onSubmit() {
    let formValue = this.form.value;

    if (this.links.length > 0) {
      formValue.images = this.links.join(";");
    }

    formValue.utilities = JSON.stringify(formValue.utilities);

    this.post = { ...formValue };
    this.post.categoryId = this.post.categoryId;
    this.post.closingTime = Number(this.post.closingTime);
    this.post.acreage = Number(this.post.acreage);
    this.post.numberOfRooms = Number(this.post.numberOfRooms);
    this.post.numberOfToliets = Number(this.post.numberOfToliets);
    this.post.price = Number(this.post.price);

    this.postService.edit(this.post).subscribe((post) => {
      if (post) {
        this.snackBar.open(
          "Chỉnh sửa thành công",
          `${this.post.apartmentNumber} ${this.post.street}`,
          {
            duration: 3000,
          }
        );
      }
    });
  }
}
