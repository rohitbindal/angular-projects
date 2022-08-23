import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template:
    '<div class="row text-center"><div class="col-sm-12"> <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div>',
  styleUrls: ['loader.component.css'],
})
export class LoaderComponent {}
