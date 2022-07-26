import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() recipeSelectedFromList = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
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
  constructor() { }

  ngOnInit(): void { }

  onRecipeSelected(recipe: Recipe) {
    this.recipeSelectedFromList.emit(recipe);
  }
}
