import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(
    private _dataStorageService: DataStorageService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this._authService.user.subscribe((user) => {
      this.isAuthenticated = !!user; // --> If user exists, true else false.
    });
  }
  onSaveData() {
    this._dataStorageService.storeRecipes();
  }
  onFetchData() {
    this._dataStorageService.fetchRecipes().subscribe();
  }
  onLogoutClick() {
    this._authService.logout();
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
