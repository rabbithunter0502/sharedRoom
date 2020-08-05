import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AccountService } from "./account.service";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private apiURL = "https://us-central1-da2-server.cloudfunctions.net/api/auth";
  private apiURL = "http://localhost:5000/da2-server/us-central1/api/auth";
  public getLoggedInAccountId = new Subject();

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router: Router
  ) {}

  login(data) {
    return this.http.post<any>(this.apiURL, {
      email: data.email,
      password: data.password,
    });
  }

  isLoggedIn() {
    if (
      localStorage.getItem("accountId") &&
      localStorage.getItem("accountRole")
    ) {
      this.getLoggedInAccountId.next(localStorage.getItem("accountId"));

      return true;
    }

    return false;
  }

  logout() {
    this.getLoggedInAccountId.next(null);

    localStorage.removeItem("accountId");
    localStorage.removeItem("accountRole");
    localStorage.removeItem("token");

    this.router.navigateByUrl("auth");
  }

  // Forgot, reset password
  sendResetPasswordUrl(email): Observable<string> {
    return this.http.get<string>(
      `${this.apiURL}/reset-password?email=${email}`
    );
  }
}
