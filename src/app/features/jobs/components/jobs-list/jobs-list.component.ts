import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { JobService } from '../../../../core/services/job/job.service';
import { Job, JobsResponse } from '../../../../core/models/job/job.model';
import { JobTypeFilterPipe } from '../../../../shared/pipes/job-type-filter/job-type-filter.pipe';
import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-jobs-list',
  standalone: true,
  imports: [CommonModule, FormsModule, JobTypeFilterPipe, AsyncPipe, CurrencyPipe, DatePipe, LoaderComponent],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss'
})
export class JobsListComponent {
  @Input() isAdmin = false;
  @Output() deleteJob = new EventEmitter<string>();

  refresh$ = new BehaviorSubject<void>(undefined);
  jobs$!: Observable<Job[]>;
  errorMessage: string | null = null;
  deleteError: string | null = null;
  loading = true;
  noJobsFound = false;
  selectedType = 'All';

  constructor(private router: Router, private jobService: JobService) { }

  ngOnInit(): void {
    this.jobs$ = this.refresh$.pipe(
      switchMap(() => {
        return this.jobService.getAllJobs().pipe(
          map((res: JobsResponse) => {
            this.errorMessage = null;
            const jobs = res.data?.jobs ?? [];
            this.noJobsFound = jobs.length === 0;
            this.loading = false;
            return jobs;
          }),
          catchError(err => {
            this.errorMessage = err.message || 'Failed to load jobs.';
            this.noJobsFound = false;
            this.loading = false;
            return of([]);
          })
        )
      }
      )
    );
  }

  onTypeChange(selectedValue: string) {
    this.selectedType = selectedValue;
  }

  goToJobDetail(id: string) {
    this.router.navigate(['/job', id]);
  }

  onDelete(event: Event, jobId: string, jobTitle: string) {
    event.stopPropagation();

    if (!confirm('Are you sure you want to delete this job?')) {
      return;
    }

    this.loading = true;
    this.deleteError = null;

    this.jobService.deleteJob(jobId).subscribe({
      next: (res) => {
        if (res && res.success) {
          this.refresh$.next();
          this.deleteJob.emit(jobTitle);
        }
      },
      error: (err) => {
        this.loading = false;
        this.deleteError = err.message || 'Failed to delete job.';
      }
    });
  }
}