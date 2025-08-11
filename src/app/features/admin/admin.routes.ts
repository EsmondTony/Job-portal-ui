import { Routes } from '@angular/router';
import { AddJobComponent } from './components/add-job/add-job.component';
import { authGuard } from '../../core/guards/auth/auth.guard';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AddJobComponent, canActivate: [authGuard]  }
];
