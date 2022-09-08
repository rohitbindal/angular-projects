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
}

const productsData = require('./data.json');

export const PRODUCTS: Product[] = productsData;
