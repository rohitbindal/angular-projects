import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../shared/constants/helpers';
import { Product } from '../../../shared/constants/product.model';
import { FirebaseDataService } from '../../../shared/services/firebase/data.firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  helpers = HELPERS;
  allProducts: Product[] | null;
  allProducts$: Subscription | null;
  recommendedProducts: Product[] | null;
  sliderProducts: Product[] | null;
  screenWidth: Number = window.innerWidth;
  screenBreakpoint = 1;
  loading = false;

  constructor(private _router: Router, private _data: FirebaseDataService) {
    this.sliderProducts = null;
    this.allProducts = null;
    this.allProducts$ = null;
    this.recommendedProducts = null;
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: Event) {
    if (this.recommendedProducts) {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth >= 576) {
        this.screenBreakpoint = 1;
        this.sliderProducts = this.recommendedProducts!.slice(
          0,
          this.screenBreakpoint
        );
      }
      if (this.screenWidth >= 768) {
        this.screenBreakpoint = 2;
        this.sliderProducts = this.recommendedProducts!.slice(
          0,
          this.screenBreakpoint
        );
      }
      if (this.screenWidth >= 992) {
        this.screenBreakpoint = 3;
        this.sliderProducts = this.recommendedProducts!.slice(
          0,
          this.screenBreakpoint
        );
      }
    }
  }

  ngOnInit(): void {
    this.updateUI();
  }

  private updateUI() {
    this.loading = true;
    this.allProducts$ = this._data.getAllProducts().subscribe((products) => {
      if (products) {
        this.allProducts = products;
        this.recommendedProducts = this.allProducts.filter(
          (product) => product.rating.rate > 4
        );
        this.sliderProducts = this.recommendedProducts;
        this.getScreenSize();
        this.loading = false;
      }
    });
  }
}
