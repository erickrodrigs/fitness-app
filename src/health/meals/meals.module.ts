import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// modules
import { SharedModule } from "../shared/shared.module";

// containers
import { MealsComponent } from "./containers/meals/meals.component";
import { MealComponent } from "./containers/meal/meal.component";

export const ROUTES: Routes = [
  { path: '', component: MealsComponent },
  { path: 'new', component: MealComponent },
];

@NgModule({
  declarations: [
    MealsComponent,
    MealComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
})
export class MealsModule {}
