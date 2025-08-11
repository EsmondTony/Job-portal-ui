import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { jobDetailReducer } from './features/jobs/store/reducers/job-detail.reducer';
import { JobDetailEffects } from './features/jobs/store/effects/job-detail.effects';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideStore({
      jobDetail: jobDetailReducer,
    }),
    provideEffects([JobDetailEffects]),]
};
