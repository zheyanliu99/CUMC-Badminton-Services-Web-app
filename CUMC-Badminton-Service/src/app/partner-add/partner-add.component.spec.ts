import { ComponentFixture, TestBed } from '@angular/core/testing';

import { profileEditComponent } from './profile.component';

describe('profileComponent', () => {
  let component: profileEditComponent;
  let fixture: ComponentFixture<profileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ profileEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(profileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
