import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth-guard.service";
import { AuthService } from "./auth.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { ServersService } from "./servers/servers.service";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    ErrorPageComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [
    ServersService,
    AuthService,
    AuthGuard,
    CanDeactivateGuard,
    ServerResolver,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
