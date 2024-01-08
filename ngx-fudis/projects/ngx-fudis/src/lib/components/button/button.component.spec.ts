import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { ChangeDetectionStrategy } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, MockComponent(IconComponent)],
      providers: [],
    })
      .overrideComponent(ButtonComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    component.ngOnChanges();
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
      component.size = 'small';
      component.variant = 'secondary';
      component.label = 'Testing css classes';
      component.ngOnChanges();
      fixture.detectChanges();
      assertButtonHasClasses('fudis-button fudis-button__size-small fudis-button__secondary');

      component.size = 'medium';
      component.variant = 'tertiary';
      component.label = 'Testing css classes';
      component.ngOnChanges();
      fixture.detectChanges();
      assertButtonHasClasses('fudis-button fudis-button__size-medium fudis-button__tertiary');

      component.size = 'icon-only';
      component.variant = 'secondary';
      component.label = 'Testing css classes';
      component.ngOnChanges();
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
      component.icon = 'three-dots';
      component.label = 'Open additional menu';
      component.labelHidden = true;
      component.ariaLabel = 'It has nice things to click';
      component.type = 'button';
      component.ngOnChanges();
      fixture.detectChanges();

      expect(IconComponent).toBeTruthy();
      expect(getButton().getAttribute('aria-label')).toBeTruthy();
      expect(getButton().getAttribute('aria-label')).toEqual(
        'Open additional menu It has nice things to click',
      );
      expect(getButton().getAttribute('type')).toEqual('button');
      expect(getButton().textContent).toEqual('  ');
    });
  });

  describe('button with label and type submit', () => {
    it('should show uppercase context', () => {
      component.label = 'Submit me!';
      component.type = 'submit';
      component.ngOnChanges();
      fixture.detectChanges();

      expect(getButton().getAttribute('type')).toEqual('submit');
      expect(getButton().textContent).toContain('Submit me!');
    });
  });
});
