import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
@Injectable()
export class RecipeService {
  constructor(private slService: ShoppingService) { }
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is a test recipe.',
      'https://source.unsplash.com/random/?food',
      [
        new Ingredient('meat', 1),
        new Ingredient('french fries', 3)
      ]
    ),
    new Recipe(
      'Another test recipe',
      'This is another test recipe.',
      'https://source.unsplash.com/random/?food,chinese',
      [
        new Ingredient('eggs', 4),
        new Ingredient('salmon', 1)
      ]
    ),
  ];
  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
