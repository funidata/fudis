import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FudisDialogComponent } from './fudis-dialog.component';

describe('FudisDialogComponent', () => {
  let component: FudisDialogComponent;
  let fixture: ComponentFixture<FudisDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FudisDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FudisDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
