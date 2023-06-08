import { Component, OnDestroy, OnInit } from "@angular/core";
import { Workout, WorkoutsService } from "../../../../health/shared/services/workouts/workouts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'workout',
  styleUrls: ['workout.component.scss'],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="/img/workout.svg">
          <span *ngIf="(workout$ | async) as workout; else title">
            {{ workout.name ? 'Edit' : 'Create' }} workout
          </span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>
      <div *ngIf="(workout$ | async) as workout; else loading">
        <workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout($event)">
        </workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg">
          Fetching workout...
        </div>
      </ng-template>
    </div>
  `
})
export class WorkoutComponent implements OnInit, OnDestroy {
  
  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params
      .switchMap((param) => this.workoutsService.getWorkout(param.id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async addWorkout(workout: Workout) {
    await this.workoutsService.addWorkout(workout);
    this.backToWorkouts();
  }

  async updateWorkout(workout: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, workout);
    this.backToWorkouts();
  }

  async removeWorkout(_: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}
