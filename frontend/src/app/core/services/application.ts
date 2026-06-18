import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../../models/application.model';
import { ApplyRequest } from '../../models/applyrequest.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApplicationService {

  private api = "http://localhost:8080/api/applications";

  constructor(private http: HttpClient) {}

  // ✅ Apply job (NO userId)
 applyJob(request: ApplyRequest): Observable<Application> {
  return this.http.post<Application>(
    this.api ,
    request
  );
}

  // ✅ Recruiter - view applicants
  getApplicantsByJob(jobId: number) {
    return this.http.get<Application[]>(this.api + "/job/" + jobId);
  }

  // ✅ Jobseeker - view own applications
  getMyApplications() {
    return this.http.get<Application[]>(this.api + "/my");
  }
//   // VIEW RESUME
// viewResume(applicationId: number): Observable<Blob> {
//   return this.http.get(
//     `http://localhost:8080/api/resume/recruiter/download/${applicationId}`,
//     {
//       responseType: 'blob'
//     }
//   );
// }

  // ✅ Download resume for recruiter
 downloadResume(applicationId: number): Observable<Blob> {
  return this.http.get(
    `http://localhost:8080/api/resume/recruiter/download/${applicationId}`,
    { responseType: 'blob' } // 🔥 important
  );
}
}