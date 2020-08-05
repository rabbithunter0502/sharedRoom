import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      const role = Number(localStorage.getItem("accountRole"));

      if(role !== 1) {
        this.router.navigate(["/user"])
      }
    } else {
      this.router.navigate(["/auth"]);
    }
  }
}
