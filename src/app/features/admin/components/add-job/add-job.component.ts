import { Component, ViewChild } from '@angular/core';
import { JobsListComponent } from '../../../jobs/components/jobs-list/jobs-list.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobService } from '../../../../core/services/job/job.service';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, JobsListComponent, ReactiveFormsModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.scss'
})
export class AddJobComponent {
  @ViewChild(JobsListComponent) jobsListComponent!: JobsListComponent;
  deletedJobTitle: string | null = null;
  jobForm: FormGroup;

  constructor(private fb: FormBuilder, private jobService: JobService) {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      salary: ['', [Validators.required, Validators.min(1)]],
      type: ['Full-time', Validators.required],
    });
  }

  submit() {
    if (this.jobForm.invalid) return;

    this.jobService.createJob(this.jobForm.value).subscribe({
      next: (res) => {
        alert(res.message);
        this.jobForm.reset({ type: 'Full-time' });
        this.jobsListComponent.loading = true;
        this.jobsListComponent.refresh$.next();
      },
      error: (err) => {
        alert('Failed to add job: ' + (err.error?.message || err.message));
      }
    });
  }

  handleDeleteJob(jobTitle: string) {
    alert(`${jobTitle} job post has been deleted`);
    this.deletedJobTitle = jobTitle;
  }
}
