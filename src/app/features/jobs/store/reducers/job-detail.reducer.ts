import { createReducer, on } from '@ngrx/store';
import * as JobDetailActions from '../actions/job-detail.actions';
import { initialJobDetailState } from '../job-detail.state';

export const jobDetailReducer = createReducer(
  initialJobDetailState,

  on(JobDetailActions.loadJobDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(JobDetailActions.loadJobDetailSuccess, (state, { job }) => ({
    ...state,
    job,
    loading: false,
    error: null,
  })),

  on(JobDetailActions.loadJobDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
