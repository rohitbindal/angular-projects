import { Injectable } from '@angular/core';
import { Product } from '../constants/models/product.model';
import { FirebaseDataService } from './firebase/data.firebase.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _data: FirebaseDataService) {}

  /**
   *
   * @returns {Observable<Product[]>}
   */
  getAllProducts() {
    return this._data.getAllProducts();
  }

  /**
   * Returns products based on a certain category.
   * @param {string} category
   * @returns {Observable<Product[]>}
   */
  getProductsByCategory(category: string) {
    return this._data.getProductsByCategory(category);
  }

  /**
   * Returns a specific product based in id.
   * @param {number} id
   * @returns {Observable<Product>}
   */
  getProductById(id: number) {
    return this._data.getProductById(id);
  }
}
