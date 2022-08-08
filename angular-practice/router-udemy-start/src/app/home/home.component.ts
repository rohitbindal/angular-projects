import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit() {}

  onLoadServer(id: number) {
    // Go the Edit Server Component with multiple params
    this._router.navigate(["servers", id, "edit"], {
      queryParams: { allowEdit: 1 },
      fragment: "loading",
    });
  }

  onLogin() {
    this._authService.logIn();
  }

  onLogOut() {
    this._authService.logOut();
  }
}
