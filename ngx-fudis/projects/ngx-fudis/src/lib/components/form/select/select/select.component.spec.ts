import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { FormControl } from '@angular/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { GuidanceComponent } from '../../guidance/guidance.component';
import { IconComponent } from '../../../icon/icon.component';
import { TooltipDirective } from '../../../../directives/tooltip/tooltip.directive';
import { LabelComponent } from '../../label/label.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectComponent, GuidanceComponent, IconComponent, LabelComponent],
      providers: [FudisIdService, TooltipDirective],
    });
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(null);
    component.label = 'Test Select Label';
    fixture.detectChanges();
  });

  // TODO: create tests
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
