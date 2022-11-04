import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprofileDialogComponent } from './profile-edit.component';

describe('profileComponent', () => {
  let component: AddprofileDialogComponent;
  let fixture: ComponentFixture<AddprofileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprofileDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddprofileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
