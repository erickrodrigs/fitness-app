import { Component } from "@angular/core";
import { Meal, MealsService } from "../../../../health/shared/services/meals/meals.service";
import { Router } from "@angular/router";

@Component({
  selector: 'meal',
  styleUrls: ['meal.component.scss'],
  template: `
    <div class="meal">
      <div class="meal__title">
        <h1>
          <img src="/img/food.svg">
          <span>Create meal</span>
        </h1>
      </div>
      <div>
        <meal-form (create)="addMeal($event)"></meal-form>
      </div>
    </div>
  `
})
export class MealComponent {
  constructor(
    private mealService: MealsService,
    private router: Router
  ) {}

  async addMeal(meal: Meal) {
    await this.mealService.addMeal(meal);
    this.backToMeals();
  }

  backToMeals() {
    this.router.navigate(['meals']);
  }
}
