import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LabelComponent } from './label.component';
import { ButtonComponent } from '../../button/button.component';
import { IconComponent } from '../../icon/icon.component';
import { PopoverDirective } from '../../../directives/popover/popover.directive';
import { getElement } from '../../../utilities/tests/utilities';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelComponent, ButtonComponent, IconComponent],
      imports: [PopoverDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Contents', () => {
    it('should have text content according to the given text Input', () => {
      fixture.componentRef.setInput('text', 'This is test label');
      fixture.detectChanges();
      const elem = fixture.debugElement.query(By.css('.fudis-label__content__text'));

      expect(elem.nativeElement.innerHTML).toEqual(component.text);
    });

    it('should have required text visible if it is given', () => {
      fixture.componentRef.setInput('required', true);

      fixture.detectChanges();
      const elem = fixture.debugElement.query(By.css('.fudis-label__content__required'));

      expect(elem.nativeElement).toBeTruthy();
      expect(elem.nativeElement.innerHTML).toEqual('(Required)');
    });

    it('should have popover button visible if popover text and aria label is given', () => {
      fixture.componentRef.setInput('popoverText', 'I am the info');
      fixture.componentRef.setInput('popoverTriggerLabel', 'This gives more info');
      fixture.detectChanges();
      const tooltipTriggerElem = getElement(fixture, 'fudis-button');
      expect(tooltipTriggerElem).toBeTruthy();
      expect(tooltipTriggerElem.getAttribute('ng-reflect-aria-label')).toEqual(
        'This gives more info',
      );
      expect(tooltipTriggerElem.getAttribute('ng-reflect-popover-text')).toEqual('I am the info');
    });

    it('should have required attributes', () => {
      fixture.componentRef.setInput('id', 'cool-label-1');
      fixture.componentRef.setInput('for', 'cool-component-3');
      fixture.detectChanges();

      const elem = fixture.debugElement.query(By.css('label'));
      expect(elem.nativeElement.getAttribute('id')).toEqual('cool-label-1');
      expect(elem.nativeElement.getAttribute('for')).toEqual('cool-component-3');
    });
  });
});
