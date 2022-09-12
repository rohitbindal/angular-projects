import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../shared/constants/helpers';
import { Product } from '../../../shared/constants/models/product.model';
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
  categories = [
    {
      category: 'Electronics',
      image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
      route: this.helpers.routing.productCategories.electronics,
    },
    {
      category: 'Jewelery',
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      route: this.helpers.routing.productCategories.jewelery,
    },
    {
      category: "Men's Clothing",
      image:
        'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      route: this.helpers.routing.productCategories.menClothing,
    },
    {
      category: "Women's Clothing",
      image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
      route: this.helpers.routing.productCategories.womenClothing,
    },
  ];

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
