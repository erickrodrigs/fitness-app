import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { MealsService } from "./services/meals/meals.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireDatabaseModule
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService
      ]
    }
  }
}