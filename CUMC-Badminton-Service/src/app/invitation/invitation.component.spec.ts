import { ComponentFixture, TestBed } from '@angular/core/testing';

import { sendinviteDialogComponent } from './invitation.component';

describe('invitationComponent', () => {
  let component: sendinviteDialogComponent;
  let fixture: ComponentFixture<sendinviteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ sendinviteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(sendinviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
