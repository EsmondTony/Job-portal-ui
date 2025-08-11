import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../../../core/models/job/job.model';

@Pipe({
  name: 'jobTypeFilter',
  standalone: true
})  
export class JobTypeFilterPipe implements PipeTransform {
  transform(jobs: Job[] | null | undefined, selectedType: string): Job[] {
    try {
      if (!jobs || jobs.length === 0) {
        return [];
      }

      if (selectedType === 'All') {
        return jobs;
      }

      return jobs.filter(job => job.type === selectedType);
    } catch (error) {
      return [];
    }
  }

}