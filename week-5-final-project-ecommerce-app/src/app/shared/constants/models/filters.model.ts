export interface FiltersModel {
  stock: boolean;
  rating: number;
  price: [number, number];
  sort: [string, string];
  active: boolean;
}
