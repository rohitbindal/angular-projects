import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const storeRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(storeRoutes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
