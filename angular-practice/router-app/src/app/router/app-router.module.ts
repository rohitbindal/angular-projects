import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DetailsComponent } from "../details/details.component";
import { HomeComponent } from "../home/home.component";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";
import { UserListComponent } from "../user-list/user-list.component";

// Setting up the routes.
const routes: Route[] = [
  {
    // Redirect to home component if the path is empty
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'users', component: UserListComponent
  },
  {
    path: 'users/:id', component: DetailsComponent
  },
  {
    // If the path is invalid or not found, Show the Page Not Found Component.
    path: '**', component: PageNotFoundComponent
  },
]

// Configure NgModule to import and export the router.
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
