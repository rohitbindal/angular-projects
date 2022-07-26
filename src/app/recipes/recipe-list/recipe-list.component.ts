import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is a test recipe.',
      'https://source.unsplash.com/random/?food'
    ),
    new Recipe(
      'A test recipe',
      'This is a test recipe.',
      'https://source.unsplash.com/random/?food'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
