import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/models/Post";
import { Category } from "src/app/models/Category";
import { PostService } from "src/app/services/post.service";
import { CategoryService } from "src/app/services/category.service";

declare var $: any;

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
  posts: Post[];
  categories: Category[];
  field: string = "postDayASC";
  searchKeyword = "";

  userPosition = {
    latitude: 21.0313,
    longitude: 105.8516,
  };

  filters = {
    categoryId: [],
    acreage: [],
    price: [],
  };

  constructor(
    private postService: PostService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getCategories();
  }

  getPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  getCategoryName(id) {
    const category = this.categories?.find((category) => category.id === id);
    return category?.categoryName;
  }

  onSortChange($event) {
    this.field = $event.target.value;
  }

  onFilterChange(filterString) {
    this.filters = JSON.parse(filterString);
  }

  onSearchKeyup(searchKeyword) {
    this.searchKeyword = searchKeyword;
  }

  showMap() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.setUserPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  setUserPosition = (position) => {
    this.userPosition.latitude = position.coords.latitude;
    this.userPosition.longitude = position.coords.longitude;
    console.log(this.userPosition);
  };
}
