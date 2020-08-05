import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  // private apiUrl = 'https://us-central1-da2-server.cloudfunctions.net/api/payment';
  private apiUrl = "http://localhost:5000/da2-server/us-central1/api/payment";

  constructor(private http: HttpClient) {}

  getPaymentUrl(orderDescription: string, amount: number) {
    return this.http.post<any>(`${this.apiUrl}/create`, {
      amount: amount,
      orderDescription: orderDescription,
      orderType: "topup",
      language: "vn",
    });
  }
}
