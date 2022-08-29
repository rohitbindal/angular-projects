import { Injectable } from '@angular/core';
import { Product, PRODUCTS } from '../constants/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[];

  constructor() {
    this.products = PRODUCTS;
  }

  /**
   * Method to return the list of all the products.
   * @returns {Product[]}
   */
  getAllProducts() {
    return this.products;
  }

  /**
   * Returns products based on a certain category.
   * @param {string} category
   * @returns {Product[]}
   */
  getProductsByCategory(category: string) {
    return this.products.filter((product) => product.category === category);
  }

  /**
   * Returns a specific product based in id.
   * @param {number} id
   * @returns {Product}
   */
  getProductById(id: number) {
    return this.products.filter((product) => product.id == id)[0];
  }
}
