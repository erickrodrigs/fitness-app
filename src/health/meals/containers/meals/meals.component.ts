import { Component, OnDestroy, OnInit } from "@angular/core";
import { Meal, MealsService } from "../../../../health/shared/services/meals/meals.service";
import { Observable, Subscription } from "rxjs";
import { Store } from "store";

@Component({
  selector: 'meals',
  styleUrls: ['meals.component.scss'],
  template: `
    <div class="meals">
      <div class="meals__title">
        <h1>
          <img src="/img/food.svg">
          Your meals
        </h1>
        <a class="btn__add" [routerLink]="['../meals/new']">
          <img src="/img/add-white.svg">
          New meal
        </a>
      </div>
      <div *ngIf="meals$ | async as meals; else loading">
        <div class="message" *ngIf="!meals.length">
          <img src="/img/face.svg">
          No meals, add a new meal to start
        </div>
        <list-item
          *ngFor="let meal of meals"
          [item]="meal"
          (remove)="removeMeal($event)">
        </list-item>
      </div>

      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg">
          Fetching meals...
        </div>
      </ng-template>
    </div>
  `
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private mealsService: MealsService
  ) {}

  ngOnInit() {
    this.meals$ = this.store.select<Meal[]>('meals');
    this.subscription = this.mealsService.meals$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeMeal(meal: Meal) {
    this.mealsService.removeMeal(meal.$key);
  }
}
