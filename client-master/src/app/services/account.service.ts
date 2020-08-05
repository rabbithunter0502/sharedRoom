import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/Account';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // private apiURL = "https://us-central1-da2-server.cloudfunctions.net/api/accounts";
  private apiURL = "http://localhost:5000/da2-server/us-central1/api/accounts";

  constructor(
    private http: HttpClient
  ) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiURL);
  }

  getAccount(accountId): Observable<Account> {
    return this.http.get<Account>(`${this.apiURL}/${accountId}`);
  }

  addAccount(account): Observable<Account> {
    return this.http.post<any>(this.apiURL, account);
  }

  editAccount(account): Observable<Account> {
    return this.http.put<Account>(`${this.apiURL}/${account.id}`, account);
  }

  remove(id): Observable<Account> {
    return this.http.delete<Account>(`${this.apiURL}/${id}`);
  }

  // Lấy bài đăng theo account
  getPostsByAccount(accountId): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiURL}/${accountId}/posts`);
  }

}
