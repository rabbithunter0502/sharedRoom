import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // private apiURL = "https://us-central1-da2-server.cloudfunctions.net/api/categories";
  private apiURL = "http://localhost:5000/da2-server/us-central1/api/categories";

  constructor(
    private http: HttpClient
  ) { }

  // Lấy danh sách chuyên mục
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURL);
  }

  // Lấy chuyên mục theo mã chuyên mục
  getCategory(categoryId): Observable<Category> {
    const url = `${this.apiURL}/${categoryId}`;
    return this.http.get<Category>(url);
  }

  // Thêm chuyên mục mới
  add(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURL, category);
  }

  // Sửa chuyên mục
  edit(category: Category): Observable<Category> {
    const url = `${this.apiURL}/${category.id}`;
    return this.http.put<Category>(url, category);
  }

  // Xóa chuyên mục
  remove(category: Category): Observable<Category> {
    const url = `${this.apiURL}/${category.id}`;
    return this.http.delete<Category>(url);
  }
}
