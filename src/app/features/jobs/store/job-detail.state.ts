import { Job } from "../../../core/models/job/job.model";

export interface JobDetailState {
  job: Job | null;
  loading: boolean;
  error: string | null;
}

export const initialJobDetailState: JobDetailState = {
  job: null,
  loading: false,
  error: null
};
