import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

// Array of all the routes
const appRoutes: Route[] = [
  // Home
  { path: "home", component: HomeComponent },

  // Users -> List of all the users
  {
    path: "users",
    component: UsersComponent,
    // Child Router inside the Users route.
    children: [{ path: ":id/:name", component: UserComponent }],
  },

  // Servers -> List of all the servers
  {
    path: "servers",
    // canActivate: [AuthGuard],  -> Works on the main route/ parent route
    canActivateChild: [AuthGuard], // -> Works for the child route
    component: ServersComponent,
    // Child router inside the Servers route.
    children: [
      {
        path: ":id",
        component: ServerComponent,
        // Resolve and provide the data from an external source / Dynamically Resolving Data
        resolve: { server: ServerResolver },
      },
      {
        path: ":id/edit",
        component: EditServerComponent,
        // Add the behavior: Can the user leave EditServer Component?
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // One way to add an error component
  // { path: "not-found", component: PageNotFoundComponent },

  // The other way
  {
    path: "not-found",
    component: ErrorPageComponent,
    // Pass in the error message to display using the data property.
    data: { message: "Page Not Found!!" },
  },

  // Redirect to home page if the url is ''
  { path: "", redirectTo: "/home", pathMatch: "full" },

  // Redirect to '/not-found' if the url does not match any of the routes.
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
