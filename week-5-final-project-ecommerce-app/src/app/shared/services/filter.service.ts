import { Injectable } from '@angular/core';
import { FiltersModel } from '../constants/filters.model';
import { Product } from '../constants/product.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  filterProducts(products: Product[], filters: FiltersModel) {
    // Filter out the products based on stack
    products = this.byStock(filters.stock, products);

    // Filter out the products with appropriate rating
    if (filters.rating) {
      filters.active = true;
      products = this.byRating(filters.rating, products);
    }

    // Filter out the products with appropriate price
    // index 0, 1 --> lower and upper limit respectively
    if (filters.price[1]) {
      filters.active = true;
      products = this.byPrice(filters.price, products);
    }

    // Sort the products base on name, price and rating
    if (filters.sort[0]) {
      filters.active = true;
      products = this.sortProducts(filters.sort, products);
    }

    return { products, filters };
  }

  /**
   * Method to filter products based on a range
   * @param {[number, number]} price Price range
   * @param {Product[]} products
   * @returns {Product[]} A filtered array with the products within the price range.
   */
  byPrice(price: [number, number], products: Product[]) {
    return products.filter(
      (product) => product.price < price[1] && product.price >= price[0]
    );
  }

  /**
   * Method to filter products based on rating
   * @param {number} rating
   * @param {Product[]} products
   * @returns {Product[]} A filtered products array of products with the rating higher or equal to the filter
   */
  byRating(rating: number, products: Product[]) {
    return products.filter((product) => product.rating.rate >= rating);
  }

  /**
   * Method to filter the products based on stock
   * @param {boolean} stock
   * @param {Product[]} products
   * @returns {Product[]}
   */
  byStock(stock: boolean, products: Product[]) {
    if (!stock) return products.sort((x, y) => +y.stock - +x.stock);
    return products.filter((product) => product.stock);
  }

  /**
   * Method to sort the products based on name, price and rating
   * @param {[string, string]} sortBy A tuple of format ['name', 0] or ['name',1] for
   * ascending and descending respectively.
   * @param {Product[]} products Array of products
   * @returns {Product[]} Array of sorted products
   */
  sortProducts(sortBy: [string, string], products: Product[]) {
    if (!products) return products;

    const sortByType = sortBy[0]; // --> 'name', 'price' ,...
    const sortDirection = +sortBy[1]; // --> 0: 'Asc', 1: 'Desc'

    switch (sortByType) {
      case 'name':
        return this.sortByTitle(products, sortDirection);
      case 'price':
        return this.sortByPrice(products, sortDirection);
      case 'rating':
        return this.sortByRating(products, sortDirection);
      default:
        return products;
    }
  }

  sortByTitle(products: Product[], dir: number) {
    // Descending
    if (dir) return products.sort((a, b) => b.title.localeCompare(a.title));
    // Ascending
    return products.sort((a, b) => a.title.localeCompare(b.title));
  }

  sortByPrice(products: Product[], dir: number) {
    // Descending
    if (dir) return products.sort((a, b) => b.price - a.price);
    // Ascending
    return products.sort((a, b) => a.price - b.price);
  }

  sortByRating(products: Product[], dir: number) {
    // Descending
    if (dir) return products.sort((a, b) => b.rating.rate - a.rating.rate);
    // Ascending
    return products.sort((a, b) => a.rating.rate - b.rating.rate);
  }
}
