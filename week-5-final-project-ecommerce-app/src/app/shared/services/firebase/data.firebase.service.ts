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

@Injectable({
  providedIn: 'root',
})
export class FirebaseDataService {
  // Objects to store collection names
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

  /**
   * Method to fetch all products from firestore
   * @returns {Observable<Product[]>}
   */
  getAllProducts() {
    let products: Product[] = [];
    // Convert promise to Observable
    return defer(() => from(this.productsCollection.get())).pipe(
      map((qS) => {
        // If the collection is not empty
        if (qS.docs) {
          qS.docs.forEach((doc) => {
            products.push(doc.data());
          });
        }
        return products;
      })
    );
  }

  /**
   * Method to fetch products based on a given category
   * @param {string} category
   * @returns {Observable<Product[]>}
   */
  getProductsByCategory(category: string) {
    let products: Product[] = [];
    // Convert promise to Observable
    return defer(() =>
      from(
        this.productsCollection.ref
          .where('category', '==', category)
          .where('disabled', '==', false)
          .get()
      )
    ).pipe(
      map((qS) => {
        // If the collection is not empty
        if (qS.docs) {
          qS.docs.forEach((doc) => {
            products.push(doc.data());
          });
        }
        return products;
      })
    );
  }

  /**
   * Method to fetch product with a given id.
   * @param {string} id
   * @returns {Observable<Product>}
   */
  getProductById(id: string) {
    let product: Product;
    // Convert promise to Observable
    return defer(() => from(this.productsCollection.doc(id).get())).pipe(
      map((qS) => {
        // If the collection is not empty
        if (qS.exists) {
          product = qS.data()!;
        }
        return product;
      })
    );
  }

  /**
   * Method to add a product to Wishlist
   * @param {Product} product
   */
  addProductToWishlist(product: Product) {
    // Get current user
    this._fireAuth.user.pipe(take(1)).subscribe((user) => {
      if (user)
        this.usersCollection
          .doc(user.uid)
          .collection(this.WISHLIST_COLLECTION)
          .doc(product.id)
          .set({ ...product }, { merge: true })
          .then(() =>
            // If the operation is successful, show the success toast.
            this._toast.showSuccessToast(HELPERS.toast.message.ADD_TO_WISHLIST)
          )
          .catch((e) => console.log(e));
    });
  }

  /**
   * Method to remove a product from Wishlist
   * @param {string} id
   */
  removeProductFromWishlist(id: string) {
    // Get current user
    this._fireAuth.user.pipe(take(1)).subscribe((user) => {
      if (user)
        this.usersCollection
          .doc(user.uid)
          .collection(this.WISHLIST_COLLECTION)
          .doc(id)
          .delete()
          .then(() => {
            // If the operation is successful, show the success toast.
            this._toast.showInfoToast(
              HELPERS.toast.message.REMOVED_FROM_WISHLIST
            );
          })
          .catch((e) => console.log(e));
    });
  }

  /**
   * Method to update the quantity of a product with the given id.
   * @param {string} id
   * @param {number} count UpdateBy counter -> could be 1 or -1
   */
  updateQuantity(id: string, count: number = 1) {
    // Get the current user
    this._fireAuth.user.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.getProductQty(id, user.uid).subscribe((res) => {
          // If the product is already in cart and the quantity is greater than 5, show error toast and return
          if (!this.quantityLessThenFive(res!)) {
            this._toast.showErrorToast(HELPERS.toast.message.MAX_PRODUCT_LIMIT);
            return;
          }

          // Update Item counter in user/{uid}/checkout/{productId} document.
          this.usersCollection
            .doc(user.uid)
            .collection(this.CHECKOUT_COLLECTION)
            .doc(id)
            .update({ count: increment(count) })
            .then(() => {
              this._toast.showInfoToast(HELPERS.toast.message.QTY_UPDATED);
              // Update user cart counter
              this.updateUserCartCount(count, user.uid);
            })
            .catch((e) => console.log(e));
        });
      }
    });
  }

  /**
   * Method ot remove a product from cart
   * @param {string} id Product id
   * @param {number} count Product quantity
   */
  removeProductFromCart(id: string, count: number = -1) {
    // Get the current user
    this._fireAuth.user.pipe(take(1)).subscribe((user) => {
      if (user) {
        // Delete users/{uid}/checkout/{productId} document
        this.usersCollection
          .doc(user.uid)
          .collection(this.CHECKOUT_COLLECTION)
          .doc(id)
          .delete()
          .then(() => {
            this._toast.showInfoToast(HELPERS.toast.message.REMOVED_FROM_CART);
            // Update the user cart counter
            this.updateUserCartCount(count, user.uid);
          })
          .catch((e) => console.log(e));
      }
    });
  }

  /**
   * Method to add a product to cart.
   * @param {Product} product
   */
  addProductToCart(product: Product) {
    // Default quantity
    const incrementBy = 1;
    // Get current user
    this._fireAuth.user.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.getProductQty(product.id, user.uid).subscribe((res) => {
          // If the product is already in cart and the quantity is greater than 5, show error toast and return
          if (res && !this.quantityLessThenFive(res)) {
            this._toast.showErrorToast(HELPERS.toast.message.MAX_PRODUCT_LIMIT);
            return;
          }

          // Add document with product data at user/{uid}/checkout/{productId}
          this.usersCollection
            .doc(user.uid)
            .collection(this.CHECKOUT_COLLECTION)
            .doc(product.id)
            // @ts-ignore
            .set({ ...product, count: increment(incrementBy) }, { merge: true })
            .then(() => {
              this._toast.showSuccessToast(HELPERS.toast.message.ADD_TO_CART);
              // Update user cart counter.
              this.updateUserCartCount(incrementBy, user.uid);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      }
    });
  }

  /**
   * Method to fetch user wishlist
   * @returns {Observable<Product[]>}
   */
  getWishlist() {
    // Get the current user.
    return this._fireAuth.user.pipe(
      take(1),
      switchMap((user) => {
        // Convert a promise to Observable
        return defer(() =>
          from(
            this.usersCollection
              .doc(user?.uid)
              .collection<Product>(this.WISHLIST_COLLECTION)
              .get()
          )
        ).pipe(
          map((qS) => {
            // If the collection is not empty. return an array of products, else return an empty array
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
   * Method to fetch user cart data.
   * @returns {Observable<Product[]>}
   */
  getCart() {
    // Get the current user
    return this._fireAuth.user.pipe(
      take(1),
      switchMap((user) => {
        // Convert a promise to Observable
        return defer(() =>
          from(
            this.usersCollection
              .doc(user?.uid)
              .collection<Product>(this.CHECKOUT_COLLECTION)
              .get()
          )
        ).pipe(
          map((qS) => {
            // If the collection is not empty. return an array of products, else return an empty array
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
    // Generate a unique id
    const docId = this._firestore.createId();
    // Create a new orders document
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

  /**
   * Method to fetch the array of orders with the given user id.
   * @param {string} uid
   * @returns {Observable<Order[]>}
   */
  getOrders(uid: string) {
    // Convert a promise to Observable
    return defer(() =>
      from(this.ordersCollection.ref.where('uid', '==', uid).get())
    ).pipe(
      map((qS) => {
        // If the collection is not empty. return an array of orders, else return an empty array
        const orders: Order[] = [];
        if (qS.docs) {
          qS.docs.forEach((doc) => orders.push(doc.data()));
        }
        return orders;
      })
    );
  }

  /**
   * Method to update a product data.
   * @param {Product} product
   * @returns {Observable<ObservedValueOf<Observable<ObservedValueOf<Promise<void>>>>>}
   */
  updateProduct(product: Product) {
    // Convert a promise to an Observable
    return defer(() =>
      from(
        this.productsCollection
          .doc(product.id)
          .set({ ...product }, { merge: true })
      )
    );
  }

  /**
   * Helper method to store all the local products to firestore
   * NOT TO BE USED IN PRODUCTION
   */
  // addProducts() {
  //   // Convert a promise to an Observable
  //   for (let product of PRODUCTS)
  //     this.productsCollection
  //       .doc(product.id)
  //       .set({ ...product }, { merge: true })
  //       .then(() => {
  //         console.log('Products Added');
  //       });
  // }

  /**
   * Method to delete a product with the given id from Products collection.
   * @param {string} id
   * @returns {Observable<ObservedValueOf<Observable<ObservedValueOf<Promise<void>>>>>}
   */
  deleteProduct(id: string) {
    // Convert a promise to an Observable
    return defer(() => from(this.productsCollection.doc(id).delete()));
  }

  /**
   * Method to update user data -> used while creating a new user.
   * @param {User} user
   */
  updateUser(user: User) {
    this.usersCollection
      .doc(user.uid)
      .set(user, { merge: true })
      .then()
      .catch((e) => console.log(e));
  }

  /**
   * Method to update a user's status -> disabled: true | false
   * @param {User} user
   */
  updateUserStatus(user: User) {
    this.usersCollection
      .doc(user.uid)
      .set(user, { merge: true })
      .then(() => this._toast.showSuccessToast('User updated!'))
      .catch((e) => console.log(e));
  }

  /**
   * Method to fetch the data of all the users from users collection
   * @returns {Observable<User[]>}
   */
  getUsers() {
    let users: User[] = [];
    return defer(() => from(this.usersCollection.get())).pipe(
      map((qS) => {
        // If the collection is not empty. return an array of users, else return an empty array
        if (qS.docs) {
          qS.docs.forEach((doc) => {
            users.push(doc.data());
          });
        }
        return users;
      })
    );
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

  /**
   * Helper method to check if quantity < 5
   * @param {number} qty
   * @returns {boolean}
   * @private
   */
  private quantityLessThenFive(qty: number) {
    if (qty) {
      return qty < 5;
    }
    return false;
  }

  /**
   * Helper method to get the quantity of a product in cart.
   * @param {string} pid
   * @param {string} uid
   * @returns {Observable<number | undefined>}
   * @private
   */
  private getProductQty(pid: string, uid: string) {
    return this.usersCollection
      .doc(uid)
      .collection<Product>(this.CHECKOUT_COLLECTION)
      .doc(pid)
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
