import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

// Creating a Server interface
interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
// Using the Server type for the generic Resolve interface
export class ServerResolver implements Resolve<Server> {
  constructor(private _servers: ServersService) {}
  // Method that is used as data provider
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Server | Observable<Server> | Promise<Server> {
    // + is used for typecasting from string to number.
    return this._servers.getServer(+route.params["id"]);
  }
}
