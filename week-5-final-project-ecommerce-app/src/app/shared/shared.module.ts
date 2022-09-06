import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/Toaster/toast/toast.component';
import { ToasterComponent } from './components/toaster/toaster.component';

@NgModule({
  declarations: [LoaderComponent, ToasterComponent, ToastComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, CommonModule, ToasterComponent],
})
export class SharedModule {}
