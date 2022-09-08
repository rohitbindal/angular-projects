import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { defer, from, map, switchMap, take } from 'rxjs';
import { User } from '../../constants/authorization.model';
import { HELPERS } from '../../constants/helpers';
import { Product } from '../../constants/product.model';
import { ToastService } from '../toast.service';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  private readonly USERS_COLLECTION = 'users';
  private readonly PRODUCTS_COLLECTION = 'products';
  private readonly WISHLIST_COLLECTION = 'wishlist';
  private readonly CHECKOUT_COLLECTION = 'checkout';
  private readonly ORDERS_COLLECTION = 'orders';
  private productsCollection: AngularFirestoreCollection<Product>;
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(
    private _firestore: AngularFirestore,
    private _fireAuth: AngularFireAuth,
    private _authorize: AuthorizationService,
    private _toast: ToastService
  ) {
    this.productsCollection = this._firestore.collection<Product>(
      this.PRODUCTS_COLLECTION
    );
    this.usersCollection = this._firestore.collection<User>(
      this.USERS_COLLECTION
    );
  }

  getAllProducts() {
    let products: Product[] = [];
    return defer(() => from(this.productsCollection.get())).pipe(
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

  getProductById(id: number) {
    let product: Product;
    return defer(() =>
      from(this.productsCollection.doc(id.toString()).get())
    ).pipe(
      map((qS) => {
        if (qS.exists) {
          product = qS.data()!;
        }
        return product;
      })
    );
  }

  addProductToWishlist(product: Product) {
    this._fireAuth.user.subscribe((user) => {
      if (user)
        this.usersCollection
          .doc(user.uid)
          .collection(this.WISHLIST_COLLECTION)
          .doc(product.id.toString())
          .set({ ...product }, { merge: true })
          .then(() =>
            this._toast.showSuccessToast(HELPERS.toast.message.ADD_TO_WISHLIST)
          )
          .catch((e) => console.log(e));
    });
  }

  removeProductFromWishlist(id: number) {
    this._fireAuth.user.subscribe((user) => {
      if (user)
        this.usersCollection
          .doc(user.uid)
          .collection(this.WISHLIST_COLLECTION)
          .doc(id.toString())
          .delete()
          .then(() => {
            this._toast.showInfoToast(
              HELPERS.toast.message.REMOVED_FROM_WISHLIST
            );
          })
          .catch((e) => console.log(e));
    });
  }

  removeProductFromCart(id: number) {
    this._fireAuth.user.subscribe((user) => {
      if (user)
        this.usersCollection
          .doc(user.uid)
          .collection(this.CHECKOUT_COLLECTION)
          .doc(id.toString())
          .delete()
          .then(() => {
            this._toast.showInfoToast(HELPERS.toast.message.REMOVED_FROM_CART);
          })
          .catch((e) => console.log(e));
    });
  }

  addProductToCart(product: Product) {
    this._fireAuth.user.subscribe((user) => {
      if (user)
        this.usersCollection
          .doc(user.uid)
          .collection(this.CHECKOUT_COLLECTION)
          .doc(product.id.toString())
          .set({ ...product }, { merge: true })
          .then(() => {
            this._toast.showSuccessToast(HELPERS.toast.message.ADD_TO_CART);
          })
          .catch((e) => {
            console.log(e);
          });
    });
  }

  getWishlist() {
    return this._fireAuth.user.pipe(
      take(1),
      switchMap((user) => {
        return defer(() =>
          from(
            this.usersCollection
              .doc(user?.uid.toString())
              .collection<Product>(this.WISHLIST_COLLECTION)
              .get()
          )
        ).pipe(
          map((qS) => {
            let products: Product[] = [];
            if (qS.docs) {
              qS.docs.forEach((doc) => {
                products.push(doc.data());
              });
            }
            return products;
          })
        );
      })
    );
  }

  getCart() {
    return this._fireAuth.user.pipe(
      take(1),
      switchMap((user) => {
        return defer(() =>
          from(
            this.usersCollection
              .doc(user?.uid.toString())
              .collection<Product>(this.CHECKOUT_COLLECTION)
              .get()
          )
        ).pipe(
          map((qS) => {
            let products: Product[] = [];
            if (qS.docs) {
              qS.docs.forEach((doc) => {
                products.push(doc.data());
              });
            }
            return products;
          })
        );
      })
    );
  }

  orderProducts(products: string[]) {}

  createProduct(product: Product) {
    this.productsCollection
      .doc(product.id.toString())
      .set({ ...product })
      .then(() => console.log('Product Created: ' + product))
      .catch((e) => console.log(e));
  }

  updateProduct(product: Product) {
    return defer(() =>
      from(
        this.productsCollection
          .doc(product.id.toString())
          .set({ ...product }, { merge: true })
      )
    );
  }

  deleteProduct(id: number) {
    return defer(() =>
      from(this.productsCollection.doc(id.toString()).delete())
    );
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
