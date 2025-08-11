import { Routes } from '@angular/router';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

export const JOBS_ROUTES: Routes = [
  { path: '', component: JobsListComponent },
  { path: ':id', component: JobDetailComponent}
];