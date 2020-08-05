import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostExtendComponent } from './post-extend.component';

describe('PostExtendComponent', () => {
  let component: PostExtendComponent;
  let fixture: ComponentFixture<PostExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostExtendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
