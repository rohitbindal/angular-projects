import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.css"],
})
export class ErrorPageComponent implements OnInit {
  errorMessage: string;
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.errorMessage = this._route.snapshot.data['message'];
    this._route.data.subscribe((data) => {
      this.errorMessage = data["message"];
    });
  }
}
