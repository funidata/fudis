import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IconComponent } from './icon.component';
import {
  FudisIconColor,
  FudisIconRotate,
  fudisIconColorArray,
  fudisIconArray,
} from '../../types/icons';
import { getElement } from '../../utilities/tests/utilities';

/**
 * To be used as benchmark so that the list in types folder keeps in sync with ones in the tests
 */
const arrayForComparing: string[] = [
  'achievement',
  'achievement-small',
  'alert',
  'alert-fill',
  'alert-small',
  'archive',
  'arrow-big',
  'arrow-dashed',
  'arrow-solid',
  'back',
  'brochure',
  'bullets',
  'calendar',
  'change-log',
  'check',
  'check-indeterminate-small',
  'check-small',
  'checkmark-circle',
  'chevron',
  'chevron-ring',
  'chevron-ring-fill',
  'clock',
  'close',
  'close-big',
  'code',
  'decrease-indent',
  'delete',
  'dot',
  'edit',
  'editor',
  'exclamation-mark-circle',
  'exclamation-mark-circle-fill',
  'exclamation-mark-small',
  'eye',
  'eye-blind',
  'fail',
  'hourglass',
  'increase-indent',
  'info',
  'info-circle',
  'info-circle-fill',
  'info-small',
  'junction',
  'link',
  'list-add',
  'list-minus',
  'lock',
  'lock-open',
  'magic-wand',
  'mail',
  'menu',
  'message',
  'minus',
  'minus-ring-fill',
  'new-tab',
  'notebook',
  'notification',
  'numbering',
  'pdf',
  'people',
  'person',
  'person-small',
  'picker',
  'pin-small',
  'place',
  'place-ring-fill',
  'plus',
  'print',
  'question-mark',
  'question-mark-small',
  'required',
  'ring-close',
  'ring-close-fill',
  'ring-plus',
  'ring-plus-fill',
  'rosette',
  'rule',
  'search',
  'seats',
  'settings',
  'shopping-cart',
  'sorter',
  'star',
  'switch',
  'three-dots',
  'three-dots-small',
  'waiting-approval',
  'waiting-decline',
  'zoom-in',
  'zoom-out',
];

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconComponent],
    })
      .overrideComponent(IconComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    component.icon = 'clock';

    component.ngOnChanges({
      icon: new SimpleChange(null, component.icon, true),
    });

    fixture.detectChanges();
  });

  function assertIconHasClasses(classes: string[]): void {
    const svgElem = fixture.debugElement.query(By.css('svg'));
    const elem = svgElem.nativeElement as HTMLElement;
    const componentClasses = elem.getAttribute('class');

    expect(componentClasses?.split(' ').sort()).toEqual(classes.sort());
  }

  function iconColorCheck(color: FudisIconColor): void {
    component.color = color;
    component.ngOnChanges({
      color: new SimpleChange(null, color, false),
    });

    fixture.detectChanges();
    assertIconHasClasses([
      'fudis-icon',
      'fudis-icon__clock',
      `fudis-icon__color__${color}`,
      'fudis-icon__rotate__none',
      'fudis-icon__lg',
    ]);
  }

  function iconRotateCheck(rotate: FudisIconRotate): void {
    component.rotate = rotate;
    component.ngOnChanges({
      rotate: new SimpleChange(null, rotate, false),
    });
    fixture.detectChanges();
    assertIconHasClasses([
      'fudis-icon',
      'fudis-icon__clock',
      'fudis-icon__color__gray-dark',
      `fudis-icon__rotate__${rotate}`,
      'fudis-icon__lg',
    ]);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('type name array should match with test array', () => {
    expect(fudisIconArray).toEqual(arrayForComparing);
  });

  describe('CSS classes', () => {
    it('should have default classes when icon is set', () => {
      assertIconHasClasses([
        'fudis-icon',
        'fudis-icon__clock',
        'fudis-icon__color__gray-dark',
        'fudis-icon__rotate__none',
        'fudis-icon__lg',
      ]);
    });

    it('should change color class according to given color Input value', () => {
      fudisIconColorArray.forEach((color) => {
        iconColorCheck(color);
      });
    });

    it('should change rotate class according to given rotate Input value', () => {
      iconRotateCheck('flip-180');
      iconRotateCheck('cw-90');
      iconRotateCheck('ccw-90');
      iconRotateCheck('none');
    });
  });

  describe('Icon', () => {
    it('should be displayed according to given icon Input value', () => {
      fudisIconArray.forEach((iconName) => {
        component.icon = iconName;
        fixture.detectChanges();

        const svgElement = getElement(fixture, '.fudis-icon');

        expect(svgElement.getAttribute('id')).toEqual(iconName);
      });
    });
  });
});
