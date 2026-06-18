import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageResume } from './manage-resume';

describe('ManageResume', () => {
  let component: ManageResume;
  let fixture: ComponentFixture<ManageResume>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageResume]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageResume);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
