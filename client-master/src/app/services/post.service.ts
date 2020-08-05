import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoryService } from "./category.service";
import { Observable } from "rxjs";
import { Post } from "../models/Post";

@Injectable({
  providedIn: "root",
})
export class PostService {
  // private apiURL = "https://us-central1-da2-server.cloudfunctions.net/api/posts";
  private apiURL = "http://localhost:5000/da2-server/us-central1/api/posts";
  private utilityList: string[] = [
    "Internet",
    "Máy giặt",
    "Tủ đồ",
    "Giường ngủ",
    "Tivi",
    "Diều hòa",
    "Tủ lạnh",
    "Thiết bị vệ sinh",
    "Bàn ghế",
    "Camera an ning",
    "Thang máy",
    "Thiết bị PCCC",
    "Khu để xe",
    "Khóa vân tay",
  ];

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  // Lấy danh sách bài đăng
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL);
  }

  // Lấy bài đăng theo mã
  getPost(postId): Observable<Post> {
    const url = `${this.apiURL}/${postId}`;
    return this.http.get<Post>(url);
  }

  // Thêm bài đăng
  add(post): Observable<Post> {
    return this.http.post<any>(this.apiURL, post);
  }

  edit(post): Observable<Post> {
    return this.http.put<Post>(`${this.apiURL}/${post.id}`, post);
  }

  // Lấy danh sách tiện ích
  getUtilities(): string[] {
    return this.utilityList;
  }
}
