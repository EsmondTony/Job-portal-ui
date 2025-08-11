import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CreateJobResponse, Job, JobResponse, JobsResponse } from '../../models/job/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private readonly baseUrl = 'http://localhost:5000/api/jobs';

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<JobsResponse> {
    return this.http.get<JobsResponse>(this.baseUrl);
  }

  getJobById(id: string): Observable<JobResponse> {
    return this.http.get<JobResponse>(`${this.baseUrl}/${id}`);
  }

  createJob(jobData: Omit<Job, '_id' | 'postedDate' | '__v'>): Observable<CreateJobResponse> {
    return this.http.post<CreateJobResponse>(this.baseUrl, jobData);
  }

  deleteJob(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.baseUrl}/${id}`);
  }

}