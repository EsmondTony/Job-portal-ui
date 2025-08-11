import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Job } from '../../../../core/models/job/job.model';
import { selectJob, selectLoading, selectError } from '../../store/selectors/job-detail.selectors';
import * as JobDetailActions from '../../store/actions/job-detail.actions';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { SalaryFormatPipe } from '../../../../shared/pipes/salary-format/salary-format.pipe';
import { ShowElementDirective } from '../../../../shared/directives/show-element/show-element.directive';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule, LoaderComponent, SalaryFormatPipe, ShowElementDirective],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.scss'
})
export class JobDetailComponent {
  job$!: Observable<Job | null>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(JobDetailActions.loadJobDetail({ id: jobId }));
    this.job$ = this.store.select(selectJob);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }
}