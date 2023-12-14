import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectOptionComponent } from './multiselect-option.component';

describe('MultiselectOptionComponent', () => {
  let component: MultiselectOptionComponent;
  let fixture: ComponentFixture<MultiselectOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectOptionComponent]
    });
    fixture = TestBed.createComponent(MultiselectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
