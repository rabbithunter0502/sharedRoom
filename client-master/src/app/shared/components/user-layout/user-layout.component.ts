import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-layout",
  templateUrl: "./user-layout.component.html",
  styleUrls: ["./user-layout.component.scss"],
})
export class UserLayoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()) {
      const role = Number(localStorage.getItem("accountRole"));

      if(role === 1) {
        this.router.navigate(["/admin"])
      }
    } else {
      this.router.navigate(["/auth"])
    }
  }
}
