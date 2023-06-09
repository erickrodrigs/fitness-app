import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Store } from "store";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";

import { Meal } from "../meals/meals.service";
import { Workout } from "../workouts/workouts.service";
import { AuthService } from "../../../../auth/shared/services/auth/auth.service";

export interface ScheduleItem {
  meals: Meal[];
  workouts: Workout[];
  section: string;
  timestamp: number;
  $key?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$
    .withLatestFrom(this.section$)
    .map(([items, section]: any[]) => {
      const id = section.data.$key;
      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };
      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    });

  selected$ = this.section$
    .do((next) => this.store.set('selected', next));

  list$ = this.section$
    .map((value: any) => this.store.value[value.type])
    .do((next) => this.store.set('list', next));

  schedule$: Observable<ScheduleList> = this.date$
    .do((next) => this.store.set('date', next))
    .map((day: any) => {
      const startAt = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
      const endAt = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime() - 1;

      return { startAt, endAt };
    })
    .switchMap(({ startAt, endAt }) => this.getSchedule(startAt, endAt))
    .map((data) => {
      const mapped: ScheduleList = {};

      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }

      return mapped;
    })
    .do((next) => this.store.set('schedule', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private createSection(payload: ScheduleItem) {
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.uid}`, {
      query: {
        orderByChild: 'timestamp',
        startAt,
        endAt
      }
    });
  }
}
