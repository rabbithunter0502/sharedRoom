import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostDetailComponent } from './admin-post-detail.component';

describe('AdminPostDetailComponent', () => {
  let component: AdminPostDetailComponent;
  let fixture: ComponentFixture<AdminPostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
