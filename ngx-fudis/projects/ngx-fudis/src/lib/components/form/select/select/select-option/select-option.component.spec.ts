import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionComponent } from './select-option.component';
import { SelectComponent } from '../select.component';

describe('SelectOptionComponent', () => {
  let component: SelectOptionComponent;
  let fixture: ComponentFixture<SelectOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, SelectOptionComponent],
    });
    fixture = TestBed.createComponent(SelectOptionComponent);
    component = fixture.componentInstance;
    component.data = { value: 'test-value', label: 'Test label' };
    fixture.detectChanges();
  });

  // TODO: create tests
  it.skip('should create', () => {
    expect(component).toBeTruthy();
  });
});
