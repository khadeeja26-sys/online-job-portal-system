import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobSeekerDashboardComponent } from './jobseeker-dashboard';


describe('JobseekerDashboard', () => {
  let component: JobSeekerDashboardComponent;
  let fixture: ComponentFixture<JobSeekerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
