import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs';
import { HELPERS } from '../../../shared/constants/helpers';
import { User } from '../../../shared/constants/models/authorization.model';
import { Order } from '../../../shared/constants/models/product.model';
import { FirebaseAuthService } from '../../../shared/services/firebase/auth.firebase.service';
import { FirebaseDataService } from '../../../shared/services/firebase/data.firebase.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  /* Element Ref for Orders Modal */
  @ViewChild('ordersModal', { static: true })
  ordersModalRef!: ElementRef;
  /* Property to store the Modal */
  ordersModal!: Modal;

  /* Property to store list of users */
  users: User[] | null;
  /* Property to store the users subscription */
  users$: Subscription | null;
  /* Property to store the signed-in user */
  currentUser!: User;

  /* Property to store list of orders */
  orders: Order[] | null;
  /* Property to store the orders subscription */
  orders$: Subscription | null;

  /* Object to hold the loading states and helpers object */
  pageProps = {
    loading: false,
    helpers: HELPERS,
    ordersLoading: false,
  };

  filtersForm: FormGroup;
  /* Property used to show the clear filters button */
  filtersActive = false;

  constructor(
    private _data: FirebaseDataService,
    private _toast: ToastService,
    private _auth: FirebaseAuthService
  ) {
    this.users = null;
    this.users$ = null;
    this.filtersForm = new FormGroup({
      name: new FormControl(0),
      status: new FormControl(null),
    });
    this.orders = [];
    this.orders$ = null;
  }

  /* Getter to return user name */
  get name() {
    return this.filtersForm.get('name')?.value;
  }

  /* Getter to return user status -> disabled or not */
  get status() {
    return this.filtersForm.get('status')?.value;
  }

  ngOnInit(): void {
    // Get the current user
    this._auth.user.subscribe((user) => {
      this.currentUser = user!;
    });
    this.updateUI();
  }

  /* Method to activate filters and update UI */
  onFilterSubmit() {
    this.filtersActive = true;
    this.updateUI();
  }

  /* Method to clear filters and update UI */
  clearFilters() {
    this.filtersActive = false;
    this.filtersForm.reset();
    this.updateUI();
  }

  /**
   * Method to disable a user
   * @param {User} user User that needs to be disabled
   * @param {number} index Index of user in the users array
   */
  onDisableClicked(user: User, index: number) {
    if (this.users) {
      this.users[index].disabled = true;
      this._data.updateUserStatus(this.users[index]);
    }
  }

  /**
   * Method to enable a user
   * @param {User} user User that needs to be enabled
   * @param {number} index Index of user in the users array
   */
  onEnableClicked(user: User, index: number) {
    if (this.users) {
      this.users[index].disabled = false;
      this._data.updateUserStatus(this.users[index]);
    }
  }

  ngOnDestroy() {
    this.users$?.unsubscribe();
  }

  /**
   * Method to fetch orders for a given user id.
   * @param {string} uid User id
   */
  getUserOrders(uid: string) {
    // Enable orders loading
    this.pageProps.ordersLoading = true;
    // Subscription to get orders
    this.orders$ = this._data.getOrders(uid).subscribe((orders: Order[]) => {
      // Disable loading
      this.pageProps.ordersLoading = false;
      // Set orders -> Orders[] or []
      this.orders = orders;

      // If there are no orders, show an error toast and return
      if (!this.orders.length) {
        this._toast.showErrorToast(HELPERS.errors.NO_ORDERS_FOUND);
        return;
      }

      this.ordersModal = new Modal(this.ordersModalRef.nativeElement);
      this.ordersModal.show();
    });
  }

  /**
   * Method to update UI -> Fetch users, update loading state and show toasts.
   * @private
   */
  private updateUI() {
    // Enable page loading
    this.pageProps.loading = true;
    // Set users array to null
    this.users = null;

    // Subscription to get users list
    this.users$ = this._data.getUsers().subscribe((users) => {
      if (users) {
        this.users = users;

        // Filters
        if (this.name !== null)
          this.users = this.sortUsers(this.users, +this.name);
        if (this.status !== null)
          this.users = this.filterByStatus(this.users, this.status);

        // Success Toast
        this._toast.showSuccessToast(`Found ${this.users.length} users.`);
      } else {
        this._toast.showErrorToast(
          this.pageProps.helpers.toast.message.NO_USER_FOUND
        );
      }
    });
  }

  /**
   * Method to sort users based on username
   * @param {User[]} users Array of users
   * @param {number} dir Direction to sort -> 0: Ascending, 1: Descending
   * @returns {User[]} Sorted users array
   * @private
   */
  private sortUsers(users: User[], dir: number) {
    // Descending
    if (dir)
      return users.sort((a, b) => b.username!.localeCompare(a.username!));
    // Ascending
    return users.sort((a, b) => a.username!.localeCompare(b.username!));
  }

  /**
   * Method to filter users based on status
   * @param {User[]} users Array of users
   * @param {boolean} status
   * @returns {User[]} Filtered array of users based in status
   * @private
   */
  private filterByStatus(users: User[], status: boolean) {
    if (!status) return users.sort((x, y) => +y.disabled! - +x.disabled!);
    return users.filter((users) => users.disabled);
  }
}
