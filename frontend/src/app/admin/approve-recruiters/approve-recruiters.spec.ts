import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRecruitersComponent } from './approve-recruiters';

describe('ApproveRecruiters', () => {
  let component: ApproveRecruitersComponent;
  let fixture: ComponentFixture<ApproveRecruitersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveRecruitersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRecruitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
