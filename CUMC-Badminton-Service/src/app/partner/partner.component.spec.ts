import { ComponentFixture, TestBed } from '@angular/core/testing';

import { partnerComponent } from './partner.component';

describe('profileComponent', () => {
  let component: partnerComponent;
  let fixture: ComponentFixture<partnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ partnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(partnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
