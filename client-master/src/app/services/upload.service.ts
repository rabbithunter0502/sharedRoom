import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL = "https://api.cloudinary.com/v1_1/chienn1402/image/upload";

  constructor(private http: HttpClient) { }

  public upload(formData) {
    return this.http.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
