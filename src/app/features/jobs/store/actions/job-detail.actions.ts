import { createAction, props } from '@ngrx/store';
import { Job } from '../../../../core/models/job/job.model';

export const loadJobDetail = createAction(
  '[Job Detail] Load Job Detail',
  props<{ id: string }>()
);

export const loadJobDetailSuccess = createAction(
  '[Job Detail] Load Job Detail Success',
  props<{ job: Job }>()
);

export const loadJobDetailFailure = createAction(
  '[Job Detail] Load Job Detail Failure',
  props<{ error: string }>()
);
