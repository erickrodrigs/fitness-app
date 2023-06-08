import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Store } from "store";
import { Observable } from "rxjs";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { AuthService } from "../../../../auth/shared/services/auth/auth.service";

export interface Workout {
  name: string;
  type: string;
  strengh: any;
  endurance: any;
  timestamp: number;
  $key: string;
  $exists: () => boolean;
}

@Injectable()
export class WorkoutsService {
  workouts$: Observable<Workout[]> = (this.db.list(`workouts/${this.uid}`) as Observable<Workout[]>)
    .do((next) => this.store.set('workouts', next));

  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if (!key) return Observable.of({} as Workout);

    return this.store.select<Workout[]>('workouts')
      .filter(Boolean)
      .map((workouts: Workout[]) => workouts.find((workout) => workout.$key === key));
  }

  addWorkout(workout: Workout) {
    return this.db.list(`workouts/${this.uid}`).push(workout);
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
  }

  removeWorkout(key: string) {
    return this.db.list(`workouts/${this.uid}`).remove(key);
  }
}
