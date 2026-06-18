import { Job } from './job.model';

export interface SavedJob {
  savedJobId: number;
  jobId: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: number;

  active: boolean;   // Job open/closed
  applied: boolean; 
}