import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFilterMapComponent } from './post-filter-map.component';

describe('PostFilterMapComponent', () => {
  let component: PostFilterMapComponent;
  let fixture: ComponentFixture<PostFilterMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFilterMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFilterMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
