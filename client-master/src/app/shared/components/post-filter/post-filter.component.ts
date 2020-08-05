import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { PostService } from "src/app/services/post.service";
import { Post } from "src/app/models/post";
import { Category } from "src/app/models/Category";
import { CategoryService } from "src/app/services/category.service";
import { FilterService } from "src/app/services/filter.service";

declare var $: any;

@Component({
  selector: "app-post-filter",
  templateUrl: "./post-filter.component.html",
  styleUrls: ["./post-filter.component.scss"],
})
export class PostFilterComponent implements OnInit {
  @Output() filterEvent = new EventEmitter();
  @Output() searchEvent = new EventEmitter();

  posts: Post[];
  categories: Category[];

  // For map
  zoom = 5;
  isFitBounds = false;

  defaultPosition = {
    lat: 16.4637,
    lng: 107.5909,
  };

  userPosition = {
    lat: 16.4637,
    lng: 107.5909,
    isAgmFitBounds: false
  }

  // Dữ liệu lọc
  filters = {
    categoryId: [],
    acreage: [],
    price: [],
  };

  // Danh sách lọc
  filterCategories;
  filterAcreages;
  filterPrices;

  userAcreageMin = 0;
  userAcreageMax = 0;

  userPriceMin = 0;
  userPriceMax = 0;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private filterService: FilterService
  ) {
    this.filterAcreages = this.filterService.getAcreageFilters();
    this.filterPrices = this.filterService.getPriceFilters();
  }

  ngOnInit(): void {
    this.getPosts();
    this.getCategories();
  }

  // Lấy danh sách post
  getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  // Danh sách chuyên mục
  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;

      this.filterCategories = categories.map((category) => {
        return {
          dataFilter: category.id,
          dataLabel: category.categoryName,
          isCheck: false,
        };
      });
    });
  }

  // Tên danh mục từ id
  getCategoryName(id) {
    const category = this.categories?.find((category) => category.id === id);
    return category?.categoryName;
  }

  getCurrentPosition() {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      this.zoom = 8;

      navigator.geolocation.getCurrentPosition(position => {
        this.userPosition.lat = position.coords.latitude;
        this.userPosition.lng = position.coords.longitude;
        this.userPosition.isAgmFitBounds = true;

        this.isFitBounds = true;
      });
    }
  }

  setUserPosition($event) {
    this.zoom = 8;

    this.userPosition.lat = $event.coords.lat;
    this.userPosition.lng = $event.coords.lng;
    this.userPosition.isAgmFitBounds = true;

    this.isFitBounds = true;
  }

  // Xử lý nhấn category filter
  // onCategoryClick(i) {
  //   const categoryFilter = this.filterCategories[i];

  //   if (this.filters.categoryId.includes(categoryFilter.dataFilter)) {
  //     this.filters.categoryId = [];
  //     categoryFilter.isCheck = false;
  //   } else {
  //     this.filters.categoryId = [categoryFilter.dataFilter];
  //     this.filterCategories.forEach((category) => (category.isCheck = false));
  //     categoryFilter.isCheck = true;
  //   }

  //   this.filterEvent.emit(JSON.stringify(this.filters));
  // }

  // Xử lý nhấn category filter
  onCategoryClick(i) {
    const categoryFilter = this.filterCategories[i];

    if (this.filters.categoryId.includes(categoryFilter.dataFilter)) {
      this.filters.categoryId.splice(this.filters.categoryId.indexOf(categoryFilter.dataFilter), 1);
      categoryFilter.isCheck = false;
    } else {
      this.filters.categoryId.push(categoryFilter.dataFilter);
      categoryFilter.isCheck = true;
    }

    this.filterEvent.emit(JSON.stringify(this.filters));
  }

  // Xử lý nhấn acreage filter
  onAcreageClick(i) {
    const acreageFilter = this.filterAcreages[i];

    if(i !== this.filterAcreages[this.filterAcreages.length]) {
      $("#collapseUserAcreage").collapse("hide");
    }

    if (JSON.stringify(this.filters).includes(JSON.stringify(acreageFilter.dataFilter))) {
      this.filters.acreage = [];
      acreageFilter.isCheck = false;
    } else {
      this.filters.acreage = [acreageFilter.dataFilter];
      this.filterAcreages.forEach((acreage) => (acreage.isCheck = false));
      acreageFilter.isCheck = true;
    }

    this.filterEvent.emit(JSON.stringify(this.filters));
  }

  // Xử lý nhấn price filter
  onPriceClick(i) {
    const priceFilter = this.filterPrices[i];

    if(i !== this.filterPrices[this.filterPrices.length]) {
      $("#collapseUserPrice").collapse("hide");
    }

    if (
      JSON.stringify(this.filters).includes(
        JSON.stringify(priceFilter.dataFilter)
      )
    ) {
      this.filters.price = [];
      priceFilter.isCheck = false;
    } else {
      this.filters.price = [priceFilter.dataFilter];
      this.filterPrices.forEach((price) => (price.isCheck = false));
      priceFilter.isCheck = true;
    }

    this.filterEvent.emit(JSON.stringify(this.filters));
  }

  // Xử lý nhấn user acreage filter
  onApplyUserAcreageClick() {
    let acreageFilter = this.filterAcreages[this.filterAcreages.length - 1];
    acreageFilter.dataFilter = [+this.userAcreageMin, +this.userAcreageMax];

    this.filters.acreage = [acreageFilter.dataFilter];

    this.filterEvent.emit(JSON.stringify(this.filters));
  }

  // Xử lý nhấn user price filter
  onApplyUserPriceClick() {
    let priceFilter = this.filterPrices[this.filterPrices.length - 1];
    priceFilter.dataFilter = [+this.userPriceMin, +this.userPriceMax];

    this.filters.price = [priceFilter.dataFilter];

    this.filterEvent.emit(JSON.stringify(this.filters));
  }

  // Xử lý nhập ô search
  onSearchKeyup($event) {
    this.searchEvent.emit($event.target.value);
  }
}
