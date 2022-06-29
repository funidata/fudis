import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFudisComponent } from './ngx-fudis.component';

describe('NgxFudisComponent', () => {
  let component: NgxFudisComponent;
  let fixture: ComponentFixture<NgxFudisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFudisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFudisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
