import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Product } from '../../constants/product.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  private readonly USERS_COLLECTION = 'users';
  private readonly PRODUCTS_COLLECTION = 'products';
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(
    private _firestore: AngularFirestore,
    private _fireAuth: AngularFireAuth
  ) {
    this.productsCollection = this._firestore.collection<Product>(
      this.PRODUCTS_COLLECTION
    );
  }

  create(product: Product) {
    this.productsCollection
      .doc(product.id.toString())
      .set({ ...product })
      .then()
      .catch((e) => console.log(e));

    console.log('Data Written');
  }

  update(id: number) {}

  delete(id: number) {}
}
