export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock: boolean;
  disabled: boolean;
  count?: number;
}

export interface Order {
  total: number;
  uid: string;
  products: Product[];
}

const productsData = require('../data.json');

export const PRODUCTS: Product[] = productsData;
