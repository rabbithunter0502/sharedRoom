import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeAvatarComponent } from './admin-change-avatar.component';

describe('AdminChangeAvatarComponent', () => {
  let component: AdminChangeAvatarComponent;
  let fixture: ComponentFixture<AdminChangeAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChangeAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
