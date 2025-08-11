export interface Job {
  _id: string;
  title: string;
  description: string;
  salary: number;
  type: 'Full-time' | 'Part-time';
  postedDate: string;
  __v: number;
}

export interface JobsResponse {
  success: boolean;
  message: string;
  data?: {
    jobs: Job[];
  };
}

export interface JobResponse {
  success: boolean;
  message: string;
  data?: {
    job: Job;
  };
}

export interface CreateJobResponse {
  success: boolean;
  message: string;
  data: {
    job: Job;
  };
}