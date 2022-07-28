import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is a test recipe.',
      'https://source.unsplash.com/random/?food'
    ),
    new Recipe(
      'Another test recipe',
      'This is another test recipe.',
      'https://source.unsplash.com/random/?food,chinese'
    ),
  ];
  getRecipes() {
    return this.recipes.slice();
  }
}
