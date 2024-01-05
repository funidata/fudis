import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectComponent } from './multiselect.component';
import { FormControl } from '@angular/forms';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { IconComponent } from '../../../icon/icon.component';
import { LabelComponent } from '../../label/label.component';

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiselectComponent, GuidanceComponent, IconComponent, LabelComponent],
    });
    fixture = TestBed.createComponent(MultiselectComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(null);
    component.label = 'Multiselect test label';
    fixture.detectChanges();
  });

  // TODO: create tests
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
