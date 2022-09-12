import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { increment } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { defer, from, map, switchMap, take } from 'rxjs';
import { APP_ROUTES } from '../../constants/app-routes';
import { HELPERS } from '../../constants/helpers';
import { User } from '../../constants/models/authorization.model';
import { Order, Product } from '../../constants/models/product.model';
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

  // Objects to store the collection refs.
  private productsCollection: AngularFirestoreCollection<Product>;
  private usersCollection: AngularFirestoreCollection<User>;
  private ordersCollection: AngularFirestoreCollection<Order>;

  constructor(
    private _firestore: AngularFirestore,
    private _fireAuth: AngularFireAuth,
    private _authorize: AuthorizationService,
    private _toast: ToastService,
    private _router: Router
  ) {
    this.productsCollection = this._firestore.collection<Product>(
      this.PRODUCTS_COLLECTION
    );
    this.usersCollection = this._firestore.collection<User>(
      this.USERS_COLLECTION
    );
    this.ordersCollection = this._firestore.collection<Order>(
      this.ORDERS_COLLECTION
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
      from(
        this.productsCollection.ref
          .where('category', '==', category)
          .where('disabled', '==', false)
          .get()
      )
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

  updateQuantity(id: number, count: number = 1) {
    this._fireAuth.user.subscribe((user) => {
      if (user) {
        this.getProductQty(id, user.uid).subscribe((res) => {
          if (!this.quantityLessThenFive(res!)) {
            this._toast.showErrorToast(HELPERS.toast.message.MAX_PRODUCT_LIMIT);
            return;
          }
          // Update Item counter in cart.
          this.usersCollection
            .doc(user.uid)
            .collection(this.CHECKOUT_COLLECTION)
            .doc(id.toString())
            .update({ count: increment(count) })
            .then(() => {
              this._toast.showInfoToast(HELPERS.toast.message.QTY_UPDATED);
              this.updateUserCartCount(count, user.uid);
            })
            .catch((e) => console.log(e));
        });
      }
    });
  }

  removeProductFromCart(id: number, count: number = -1) {
    this._fireAuth.user.subscribe((user) => {
      if (user) {
        this.usersCollection
          .doc(user.uid)
          .collection(this.CHECKOUT_COLLECTION)
          .doc(id.toString())
          .delete()
          .then(() => {
            this._toast.showInfoToast(HELPERS.toast.message.REMOVED_FROM_CART);
            this.updateUserCartCount(count, user.uid);
          })
          .catch((e) => console.log(e));
      }
    });
  }

  addProductToCart(product: Product) {
    const incrementBy = 1;
    this._fireAuth.user.subscribe((user) => {
      if (user) {
        this.getProductQty(product.id, user.uid).subscribe((res) => {
          if (res && !this.quantityLessThenFive(res)) {
            console.log(res);
            this._toast.showErrorToast(HELPERS.toast.message.MAX_PRODUCT_LIMIT);
            return;
          }
          // Add to cart
          this.usersCollection
            .doc(user.uid)
            .collection(this.CHECKOUT_COLLECTION)
            .doc(product.id.toString())
            // @ts-ignore
            .set({ ...product, count: increment(incrementBy) }, { merge: true })
            .then(() => {
              this._toast.showSuccessToast(HELPERS.toast.message.ADD_TO_CART);
              this.updateUserCartCount(incrementBy, user.uid);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      }
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

  /**
   * Method to add a new document to Orders collection
   * @param {Order} order
   */
  generateOrder(order: Order) {
    const docId = this._firestore.createId();
    this.ordersCollection
      .doc(docId)
      .set(order)
      .then(() => {
        // Show a toast with order id
        this._toast.showSuccessToast(
          `Order generated successfully! Order id: ${docId}`
        );
        // Delete the Checkout collection from the users collection to clear cart
        this.clearCart(order.uid);
        // Update cart counter to 0
        this.updateUserCartCount(0, order.uid);
      })
      .catch((e) => console.log(e.message));
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

  updateUserStatus(user: User) {
    this.usersCollection
      .doc(user.uid)
      .set(user, { merge: true })
      .then(() => this._toast.showSuccessToast('User updated!'))
      .catch((e) => console.log(e));
  }

  getUsers() {
    let users: User[] = [];
    return defer(() => from(this.usersCollection.get())).pipe(
      map((qS) => {
        if (qS.docs) {
          qS.docs.forEach((doc) => {
            users.push(doc.data());
          });
        }
        return users;
      })
    );
  }

  deleteUser(id: string) {
    this.usersCollection
      .doc(id)
      .delete()
      .then(() => console.log('User Deleted: ' + id))
      .catch((e) => console.log(e));
  }

  /**
   * Method to delete all the documents in 'checkout' collection to clear the cart.
   * @param {string} uid Id of the logged-in user.
   * @private
   */
  private clearCart(uid: string) {
    this.usersCollection
      .doc(uid)
      .collection(this.CHECKOUT_COLLECTION)
      .get()
      .subscribe((snapshot) => {
        // Create a batch
        const batch = this._firestore.firestore.batch();
        // Setup batch delete
        snapshot.forEach((doc) => batch.delete(doc.ref));
        // Delete all the document
        batch
          .commit()
          .then(() => {
            // Navigate to Home Screen
            this._router.navigate([APP_ROUTES.absolute.main.home]).then();
          })
          .catch((e) => console.log(e.message));
      });
  }

  private quantityLessThenFive(qty: number) {
    if (qty) {
      return qty < 5;
    }
    return false;
  }

  private getProductQty(pid: number, uid: string) {
    return this.usersCollection
      .doc(uid)
      .collection<Product>(this.CHECKOUT_COLLECTION)
      .doc(pid.toString())
      .get()
      .pipe(
        take(1),
        map((data) => {
          return <number | undefined>data.get('count');
        })
      );
  }

  /**
   * Method to update the cart count field in the user document
   * @param {number} count
   * @param {string} uid
   * @private
   */
  private updateUserCartCount(count: number, uid: string) {
    let incrementBy;
    // If the count is set to be 0 -> When the cart is cleared
    if (count === 0) {
      incrementBy = 0;
    } else {
      incrementBy = increment(count);
    }
    // Update the cart count
    this.usersCollection
      .doc(uid)
      // @ts-ignore
      .update({ cart: incrementBy })
      .then()
      .catch((e) => console.log(e));
  }
}
