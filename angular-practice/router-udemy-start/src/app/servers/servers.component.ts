import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServersService } from "./servers.service";

@Component({
  selector: "app-servers",
  templateUrl: "./servers.component.html",
  styleUrls: ["./servers.component.css"],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private _serversService: ServersService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get all the servers using ServersService.
    this.servers = this._serversService.getServers();
  }
  onReload() {
    this._router.navigate(["servers"]);
    // Using the 'route' object and 'relativeTo' property, we can tell the 'navigate' method
    // which route are we currently on.
    // this._router.navigate(['servers'], { relativeTo: this.route });
  }
}
