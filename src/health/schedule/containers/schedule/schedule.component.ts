import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ScheduleItem, ScheduleService } from "../../../../health/shared/services/schedule/schedule.service";
import { Store } from "store";
import { Meal, MealsService } from "../../../shared/services/meals/meals.service";
import { Workout, WorkoutsService } from "../../../shared/services/workouts/workouts.service";

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar
        [date]="date$ | async"
        [items]="schedule$ | async"
        (change)="changeDate($event)"
        (select)="changeSection($event)">
      </schedule-calendar>

      <schedule-assign
        *ngIf="open"
        [section]="selected$ | async"
        [list]="list$ | async"
        (update)="assignItem($event)"
        (cancel)="closeAssign()">
      </schedule-assign>
    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  list$: Observable<Meal[] | Workout[]>;
  selected$: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private scheduleService: ScheduleService,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.date$ = this.store.select<Date>('date');
    this.schedule$ = this.store.select<ScheduleItem[]>('schedule');
    this.selected$ = this.store.select<any>('selected');
    this.list$ = this.store.select<any>('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }
}
