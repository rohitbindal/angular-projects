import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { defer, from, map } from 'rxjs';
import { User } from '../../constants/authorization.model';
import { Product } from '../../constants/product.model';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  private readonly USERS_COLLECTION = 'users';
  private readonly PRODUCTS_COLLECTION = 'products';
  private productsCollection: AngularFirestoreCollection<Product>;
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    private _firestore: AngularFirestore,
    private _fireAuth: AngularFireAuth,
    private _authorize: AuthorizationService
  ) {
    this.productsCollection = this._firestore.collection<Product>(
      this.PRODUCTS_COLLECTION
    );
    this.usersCollection = this._firestore.collection<User>(
      this.USERS_COLLECTION
    );
  }

  createProduct(product: Product) {
    this.productsCollection
      .doc(product.id.toString())
      .set({ ...product })
      .then(() => console.log('Product Created: ' + product))
      .catch((e) => console.log(e));
  }

  getProductsByCategory(category: string) {
    let products: Product[] = [];
    return defer(() =>
      from(this.productsCollection.ref.where('category', '==', category).get())
    ).pipe(
      map((qS) => {
        if (qS.docs) {
          qS.docs.forEach((doc) => {
            products.push(doc.data());
          });
        }
        return products;
      })
    );
  }

  updateProduct(product: Product) {
    // if (!this.user) return;

    // if (this._authorize.canEdit(this.user))
    this.productsCollection
      .doc(product.id.toString())
      .set({ ...product }, { merge: true })
      .then(() => console.log('Data Updated for: ' + product.id))
      .catch((e) => console.log(e));
  }

  deleteProduct(id: number) {
    // if (!this.user) return;

    // if (this._authorize.canDelete(this.user))
    this.productsCollection
      .doc(id.toString())
      .delete()
      .then(() => console.log('Product deleted: ' + id))
      .catch((e) => console.log(e));
  }

  updateUser(user: User) {
    this.usersCollection
      .doc(user.uid)
      .set(user, { merge: true })
      .then()
      .catch((e) => console.log(e));
  }

  deleteUser(id: string) {
    this.usersCollection
      .doc(id)
      .delete()
      .then(() => console.log('User Deleted: ' + id))
      .catch((e) => console.log(e));
  }
}
