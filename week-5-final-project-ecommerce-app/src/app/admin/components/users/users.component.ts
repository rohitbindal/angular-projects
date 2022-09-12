import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/constants/models/authorization.model';
import { HELPERS } from '../../../shared/constants/helpers';
import { FirebaseAuthService } from '../../../shared/services/firebase/auth.firebase.service';
import { FirebaseDataService } from '../../../shared/services/firebase/data.firebase.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] | null;
  users$: Subscription | null;
  currentUser!: User;

  pageProps = {
    loading: false,
    helpers: HELPERS,
  };

  filtersForm: FormGroup;
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
  }

  get name() {
    return this.filtersForm.get('name')?.value;
  }

  get status() {
    return this.filtersForm.get('status')?.value;
  }

  ngOnInit(): void {
    this._auth.user.subscribe((user) => {
      this.currentUser = user!;
    });
    this.updateUI();
  }

  onFilterSubmit() {
    this.filtersActive = true;
    this.updateUI();
  }

  clearFilters() {
    this.filtersActive = false;
    this.filtersForm.reset();
    this.updateUI();
  }

  onDisableClicked(user: User, index: number) {
    if (this.users) {
      this.users[index].disabled = true;
      this._data.updateUserStatus(this.users[index]);
    }
  }

  onEnableClicked(user: User, index: number) {
    if (this.users) {
      this.users[index].disabled = false;
      this._data.updateUserStatus(this.users[index]);
    }
  }

  ngOnDestroy() {
    this.users$?.unsubscribe();
  }

  private updateUI() {
    this.pageProps.loading = true;
    this.users = null;

    this.users$ = this._data.getUsers().subscribe((users) => {
      if (users) {
        this.users = users;
        if (this.name !== null)
          this.users = this.sortUsers(this.users, +this.name);
        if (this.status !== null)
          this.users = this.filterByStatus(this.users, this.status);
        this._toast.showSuccessToast(`Found ${this.users.length} users.`);
      } else {
        this._toast.showErrorToast(
          this.pageProps.helpers.toast.message.NO_USER_FOUND
        );
      }
    });
  }

  private sortUsers(users: User[], dir: number) {
    // Descending
    if (dir)
      return users.sort((a, b) => b.username!.localeCompare(a.username!));
    // Ascending
    return users.sort((a, b) => a.username!.localeCompare(b.username!));
  }

  private filterByStatus(users: User[], status: boolean) {
    if (!status) return users.sort((x, y) => +y.disabled! - +x.disabled!);
    return users.filter((users) => users.disabled);
  }
}
