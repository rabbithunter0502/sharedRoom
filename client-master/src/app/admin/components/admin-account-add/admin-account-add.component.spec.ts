import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountAddComponent } from './admin-account-add.component';

describe('AdminAccountAddComponent', () => {
  let component: AdminAccountAddComponent;
  let fixture: ComponentFixture<AdminAccountAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccountAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
