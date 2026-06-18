// src/app/app.routes.ts

import { Routes } from '@angular/router';

// =========================
// AUTH COMPONENTS
// =========================

// =========================
// ADMIN COMPONENTS
// =========================

// =========================
// JOBSEEKER COMPONENTS
// =========================


// =========================
// RECRUITER COMPONENTS
// =========================

// =========================
// GUARDS
// =========================
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { AdminDashboardComponent } from './admin/dashboard/dashboard';
import { AdminApproveRecruitersComponent } from './admin/approve-recruiters/approve-recruiters';
import { AdminManageJobsComponent } from './admin/manage-jobs/manage-jobs';
import { AdminManageUsersComponent } from './admin/manage-users/manage-users';
import { RecruiterDashboardComponent } from './recruiter/dashboard/recruiter-dashboard/recruiter-dashboard';
import { PostJobComponent } from './recruiter/post-job/post-job';
import { ManageJobsComponent } from './recruiter/manage-jobs/manage-jobs';
import { ViewApplicantsComponent } from './recruiter/view-applicants/view-applicants';
import { JobseekerDashboardComponent } from './jobseeker/jobseeker-dashboard/jobseeker-dashboard';
import { JobSearchComponent } from './jobseeker/job-search/job-search';
import { JobseekerAppliedJobsComponent } from './jobseeker/applied-jobs/applied-jobs';
import { SavedJobsComponent } from './jobseeker/saved-jobs/saved-jobs';
import { EditJobComponent } from './recruiter/edit-job/edit-job';
import { JobDetailsComponent } from './jobseeker/job-details/job-details';
import { ManageResumeComponent } from './jobseeker/manage-resume/manage-resume';
import { JobApplicationComponent } from './jobseeker/job-application/job-application';
import { HomeComponent } from './home/home';

export const routes: Routes = [

  // =========================
  // DEFAULT ROUTE
  // =========================
  {
    path: '',
    component: HomeComponent
  },

  // =========================
  // AUTH ROUTES
  // =========================
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  // =========================
  // ADMIN ROUTES
 {
  path: 'admin-dashboard',
  component: AdminDashboardComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'ADMIN' }
},

{
  path: 'admin-approve-recruiters',
  component: AdminApproveRecruitersComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'ADMIN' }
},

{
  path: 'admin-manage-jobs',
  component: AdminManageJobsComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'ADMIN' }
},

{
  path: 'admin-manage-users',
  component: AdminManageUsersComponent,
  canActivate: [authGuard, roleGuard],
  data: { role: 'ADMIN' }
},
  // =========================
  // RECRUITER ROUTES
  // =========================
  {
    path: 'recruiter-dashboard',
    component: RecruiterDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'RECRUITER'
    }
  },
  {
    path: 'post-job',
    component: PostJobComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'RECRUITER'
    }
  },
  {
    path: 'recruiter-jobs',
    component: ManageJobsComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'RECRUITER'
    }
  },
  {
  path: 'edit-job/:id',
  component: EditJobComponent,
  canActivate: [authGuard, roleGuard],
  data: {
    role: 'RECRUITER'
  }
},
  {
    path: 'recruiter-applications/:id',
    component: ViewApplicantsComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'RECRUITER'
    }
  },

  // =========================
  // JOBSEEKER ROUTES
  // =========================
  {
    path: 'jobseeker-dashboard',
    component: JobseekerDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'JOBSEEKER'
    }
  },
  {
    path: 'job-search',
    component: JobSearchComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'JOBSEEKER'
    }
  },
  
  {
    path: 'jobseeker-applied-jobs',
    component: JobseekerAppliedJobsComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'JOBSEEKER'
    }
  },
   {
    path: 'job-details/:id',
    component: JobDetailsComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'JOBSEEKER' }
  },
  {
    path: 'saved-jobs',
    component: SavedJobsComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'JOBSEEKER'
    }
  },
   {
    path: 'manage-resume',
    component: ManageResumeComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'JOBSEEKER' }
  },
  {
    path: 'apply/:id',
    component: JobApplicationComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'JOBSEEKER'
    }
  },

 

  // =========================
  // FALLBACK
  // =========================
  {
    path: '**',
    redirectTo: 'login'
  }
];