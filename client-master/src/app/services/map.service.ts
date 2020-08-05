import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private apiKey = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCbT3Pxb5GcCi1jazGWm8z6jZMB1joTvak";

  constructor(
    private http: HttpClient
  ) { }

  getGeocode(address): Observable<any> {
    return this.http.get<any>(`${this.apiKey}&address=${address}`);
  }
}
