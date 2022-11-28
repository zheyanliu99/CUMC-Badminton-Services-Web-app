import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpartnerDialogComponent } from './partner-add.component';

describe('profileComponent', () => {
  let component: AddpartnerDialogComponent;
  let fixture: ComponentFixture<AddpartnerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpartnerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpartnerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
