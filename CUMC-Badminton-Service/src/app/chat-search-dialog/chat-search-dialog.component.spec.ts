import { ComponentFixture, TestBed } from '@angular/core/testing';

import { searchchatDialogComponent } from './chat-search-dialog.component';

describe('searchchatDialogComponent', () => {
  let component: searchchatDialogComponent;
  let fixture: ComponentFixture<searchchatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ searchchatDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(searchchatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
