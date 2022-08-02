import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.css']
})
export class PropertyBindingComponent implements OnInit {
  imageUrl: string;

  constructor() {
    this.imageUrl = 'https://source.unsplash.com/random/?cars';

  }

  ngOnInit(): void {
  }

  onSubmit(input: HTMLInputElement) {
    const newImage = input.value;
    if (newImage.length === 0) {
      return;
    }
    this.imageUrl = newImage;
  }

}
