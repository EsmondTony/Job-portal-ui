import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as JobDetailActions from '../actions/job-detail.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { JobService } from '../../../../core/services/job/job.service';
import { JobResponse } from '../../../../core/models/job/job.model';

@Injectable()
export class JobDetailEffects {
  constructor(private actions$: Actions, private jobService: JobService) { }

  loadJobDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobDetailActions.loadJobDetail),
      mergeMap(({ id }) =>
        this.jobService.getJobById(id).pipe(
          map((jobResponse: JobResponse) => {
            if (jobResponse.data && jobResponse.data.job) {
              return JobDetailActions.loadJobDetailSuccess({ job: jobResponse.data.job });
            } else {
              return JobDetailActions.loadJobDetailFailure({ error: 'Job not found' });
            }
          }), catchError(error => of(JobDetailActions.loadJobDetailFailure({ error: 'Failed to load job detail' })))
        )
      )
    )
  );
}
