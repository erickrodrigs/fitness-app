import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./containers/register/register.component";
import { SharedModule } from "../shared/shared.module";

export const ROUTES: Routes = [
  { path: '', component: RegisterComponent }
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
})
export class RegisterModule {}
