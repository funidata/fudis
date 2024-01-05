import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAutocompleteComponent } from './autocomplete.component';
import { FormControl } from '@angular/forms';
import { ButtonComponent } from '../../../../button/button.component';
import { IconComponent } from '../../../../icon/icon.component';

describe('AutocompleteComponent', () => {
  let component: SelectAutocompleteComponent;
  let fixture: ComponentFixture<SelectAutocompleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAutocompleteComponent, ButtonComponent, IconComponent],
    });
    fixture = TestBed.createComponent(SelectAutocompleteComponent);
    component = fixture.componentInstance;

    component.control = new FormControl(null);
    component.required = true;
    component.dropdownOpen = false;

    fixture.detectChanges();
  });

  // TODO: create tests
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
