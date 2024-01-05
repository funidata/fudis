import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectOptionComponent } from './multiselect-option.component';
import { MultiselectComponent } from '../multiselect.component';

describe('MultiselectOptionComponent', () => {
  let component: MultiselectOptionComponent;
  let fixture: ComponentFixture<MultiselectOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectOptionComponent, MultiselectComponent],
    });
    fixture = TestBed.createComponent(MultiselectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.data = { value: 'test-value', label: 'Test label' };
  });

  // TODO: create tests
  it.skip('should create', () => {
    expect(component).toBeTruthy();
  });
});
