import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";

import { ServersService } from "../servers.service";
import { CanComponentDeactivate } from "./can-deactivate-guard.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };

  // Local properties to be used with ngModel
  serverName = "";
  serverStatus = "";
  // Boolean states to handle updates.
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  // Using canDeactivate method to manage the user leaving the page.
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    // If the user is not allowed to edit, let the user leave
    if (!this.allowEdit) {
      return true;
    }
    // If the user is allowed to edit, there are any changes, or unsaved changes
    // ask for confirmation
    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    )
      return confirm("Do you want to discard the changes?");
    else return true;
  }
  ngOnInit() {
    // Get the allowEdit property from route parameters.
    this._route.queryParams.subscribe((params) => {
      this.allowEdit = params["allowEdit"] === "1";
    });
    // Get the current server id from route params.
    const id = Number(this._route.snapshot.params["id"]);
    // Get the server info using the ServersService and the server id
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  // When the server data is updated
  onUpdateServer() {
    // Use the update method in ServersService to update the server data.
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    // Update the changes state
    this.changesSaved = true;
    // Navigate to the parent url relative to the current route.
    this._router.navigate(["../"], { relativeTo: this._route });
  }
}
