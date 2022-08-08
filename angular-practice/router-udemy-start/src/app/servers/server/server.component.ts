import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private _serversService: ServersService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    // Get server info using the Resolver
    this._route.data.subscribe((data) => {
      this.server = data["server"];
    });

    // Getting server info using Route Params
    // this._route.paramMap.subscribe(param => {
    //   const id = +param['params']['id'];
    //   this.server = this._serversService.getServer(id);
    // })
  }

  onEdit() {
    // Navigate to EditServer component relative to the current server.
    this._router.navigate(["edit"], {
      relativeTo: this._route,
      // To make sure that the queryParameters are not lost while navigating to child
      // use the property below.
      queryParamsHandling: "preserve",
    });
  }
}
