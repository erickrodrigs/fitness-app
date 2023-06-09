import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// modules
import { SharedModule } from "../shared/shared.module";

// containers
import { ScheduleComponent } from "./containers/schedule/schedule.component";

// components
import { ScheduleCalendarComponent } from "./components/schedule-calendar/schedule-calendar.component";
import { ScheduleDaysComponent } from "./components/schedule-days/schedule-days.component";
import { ScheduleControlsComponent } from "./components/schedule-controls/schedule-controls.component";
import { ScheduleSection } from "./components/schedule-section/schedule-section.component";

export const ROUTES: Routes = [
  { path: '', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleDaysComponent,
    ScheduleControlsComponent,
    ScheduleSection
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
})
export class ScheduleModule {}
