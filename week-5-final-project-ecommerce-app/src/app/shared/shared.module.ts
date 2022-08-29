import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { FirebaseModule } from './firebase/firebase.module';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, FirebaseModule],
  exports: [LoaderComponent, CommonModule],
})
export class SharedModule {}
