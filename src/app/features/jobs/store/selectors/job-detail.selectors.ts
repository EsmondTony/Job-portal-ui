import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JobDetailState } from '../job-detail.state';

export const selectJobDetailState = createFeatureSelector<JobDetailState>('jobDetail');

export const selectJob = createSelector(
  selectJobDetailState,
  (state) => state.job
);

export const selectLoading = createSelector(
  selectJobDetailState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectJobDetailState,
  (state) => state.error
);
