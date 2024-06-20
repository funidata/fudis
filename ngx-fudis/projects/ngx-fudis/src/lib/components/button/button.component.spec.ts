import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, IconComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  function getButton(): HTMLElement {
    return fixture.nativeElement.querySelector('button') as HTMLElement;
  }

  function assertButtonHasClasses(classes: string): void {
    const buttonClasses = getButton().className.split(' ').sort();

    expect(buttonClasses).toEqual(classes.split(' ').sort());
  }

  describe('CSS classes', () => {
    it('should contain classes for medium sized primary button by default', () => {
      assertButtonHasClasses('fudis-button fudis-button__primary fudis-button__size-medium');
    });

    it('should map the given inputs to the corresponding CSS classes', () => {
      fixture.componentRef.setInput('size', 'small');
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.componentRef.setInput('label', 'Testing css classes');

      fixture.detectChanges();
      assertButtonHasClasses('fudis-button fudis-button__size-small fudis-button__secondary');

      fixture.componentRef.setInput('size', 'medium');
      fixture.componentRef.setInput('variant', 'tertiary');
      fixture.detectChanges();
      assertButtonHasClasses('fudis-button fudis-button__size-medium fudis-button__tertiary');

      fixture.componentRef.setInput('size', 'icon-only');
      fixture.componentRef.setInput('variant', 'secondary');

      fixture.detectChanges();
      assertButtonHasClasses('fudis-button fudis-button__size-icon-only fudis-button__secondary');
    });
  });

  describe('button clicked', () => {
    it('should emit events when the button is enabled', () => {
      let clicked = false;
      component.label = 'Testing clicking';
      component.handleClick.subscribe(() => {
        clicked = true;
      });

      getButton()?.click();

      expect(clicked).toEqual(true);
    });

    it('should not emit events when the button is disabled', () => {
      let clicked = false;
      component.handleClick.subscribe(() => {
        clicked = true;
      });

      component.disabled = true;
      component.label = 'Testing disabled state';
      fixture.detectChanges();

      getButton()?.click();

      expect(clicked).toEqual(false);
    });
  });

  describe('button with icon, aria-label and label hidden', () => {
    it('should have icon component present if icon and label and aria-label has been given as an Input', () => {
      fixture.componentRef.setInput('icon', 'three-dots');
      fixture.componentRef.setInput('label', 'Open additional menu');
      fixture.componentRef.setInput('labelHidden', true);
      fixture.componentRef.setInput('ariaLabel', 'It has nice things to click');
      fixture.componentRef.setInput('type', 'button');

      fixture.detectChanges();

      expect(getButton().getAttribute('aria-label')).toBeTruthy();
      expect(getButton().getAttribute('aria-label')).toEqual(
        'Open additional menu It has nice things to click',
      );
      expect(getButton().getAttribute('type')).toEqual('button');
      expect(getButton().textContent).toEqual('');
    });
  });

  describe('button with label and type submit', () => {
    it('should show uppercase context', () => {
      component.label = 'Submit me!';
      fixture.componentRef.setInput('type', 'submit');

      fixture.detectChanges();

      expect(getButton().getAttribute('type')).toEqual('submit');
      expect(getButton().textContent).toContain('Submit me!');
    });
  });

  // TODO: tests for menu button and icon rotate
  // TODO: test for button host class
});
