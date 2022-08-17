import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private DB_URL =
    'https://ng-course-recipe-book-4f738-default-rtdb.asia-southeast1.firebasedatabase.app';
  constructor(
    private _httpClient: HttpClient,
    private _recipeService: RecipeService,
    private _authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this._recipeService.getRecipes();
    this._httpClient
      .put(this.DB_URL + '/recipes.json', recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this._httpClient.get<Recipe[]>(this.DB_URL + '/recipes.json').pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this._recipeService.setRecipes(recipes);
      })
    );
  }
}
