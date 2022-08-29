import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { MainRoutingModule } from './main.routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [MainRoutingModule, SharedModule],
})
export class MainModule {}
