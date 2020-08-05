import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Province } from '../models/Province';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  // private apiURL = 'https://us-central1-da2-server.cloudfunctions.net/api/locals';
  private apiURL = 'http://localhost:5000/da2-server/us-central1/api/locals';

  constructor(
    private http: HttpClient
  ) { }

  // Lấy danh sách tỉnh/thành phố
  getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.apiURL);
  }
}
