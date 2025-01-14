import { Component, OnDestroy, OnInit } from "@angular/core";
import { Meal, MealsService } from "../../../../health/shared/services/meals/meals.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg">
          <span *ngIf="(meal$ | async) as meal; else title">
            {{ meal.name ? 'Edit' : 'Create' }} meal
          </span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>
      <div *ngIf="(meal$ | async) as meal; else loading">
        <meal-form
          [meal]="meal"
          (create)="addMeal($event)"
          (update)="updateMeal($event)"
          (remove)="removeMeal($event)">
        </meal-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg">
          Fetching meal...
        </div>
      </ng-template>
    </div>
  `
})
export class MealComponent implements OnInit, OnDestroy {
  
  meal$: Observable<Meal>;
  subscription: Subscription;

  constructor(
    private mealService: MealsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.mealService.meals$.subscribe();
    this.meal$ = this.route.params
      .switchMap((param) => this.mealService.getMeal(param.id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addMeal(meal: Meal) {
    await this.mealService.addMeal(meal);
    this.backToMeals();
  }

  async updateMeal(meal: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealService.updateMeal(key, meal);
    this.backToMeals();
  }

  async removeMeal(_: Meal) {
    const key = this.route.snapshot.params.id;
    await this.mealService.removeMeal(key);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
