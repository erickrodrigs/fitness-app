import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Store } from "store";
import "rxjs/add/operator/do";

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());

  schedule$: Observable<any> = this.date$
    .do((next) => this.store.set('date', next));

  constructor(
    private store: Store
  ) {}
}
