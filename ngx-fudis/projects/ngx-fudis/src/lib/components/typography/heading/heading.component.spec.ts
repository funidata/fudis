import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { HeadingComponent } from './heading.component';
import {
  FudisHeadingSize,
  FudisHeadingLevel,
  fudisHeadingLevelArray,
  fudisHeadingSizeArray,
} from '../../../types/typography';
import {
  FudisTextAlign,
  FudisSpacing,
  fudisSpacingArray,
  fudisTextAlignArray,
} from '../../../types/miscellaneous';

describe('HeadingComponent', () => {
  let component: HeadingComponent;
  let fixture: ComponentFixture<HeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadingComponent],
    })
      .overrideComponent(HeadingComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingComponent);
    component = fixture.componentInstance;
    component.level = 1;
    fixture.detectChanges();
  });

  function getHeading(level: FudisHeadingLevel): HTMLElement {
    return fixture.debugElement.nativeElement.querySelector(`h${level}`) as HTMLElement;
  }

  function assertHeadingHasClasses(classes: string, level: FudisHeadingLevel): void {
    const headingClasses = getHeading(level)?.className.split(' ').sort();

    expect(headingClasses).toEqual(classes.split(' ').sort());
  }

  function headingCheck(
    size: FudisHeadingSize,
    align: FudisTextAlign,
    marginBottom: FudisSpacing,
    level: FudisHeadingLevel,
  ): void {
    const sizeBefore = component.size;
    const marginBefore = component.marginBottom;
    const levelBefore = component.level;
    const alignBefore = component.align;

    component.size = size;
    component.marginBottom = marginBottom;
    component.level = level;
    component.align = align;

    component.ngOnChanges({
      size: {
        previousValue: sizeBefore,
        currentValue: size,
        firstChange: false,
      },
      marginBottom: {
        previousValue: marginBefore,
        currentValue: marginBottom,
        firstChange: false,
      },
      level: {
        previousValue: levelBefore,
        currentValue: level,
        firstChange: false,
      },
      align: {
        previousValue: alignBefore,
        currentValue: align,
        firstChange: false,
      },
    });

    fixture.detectChanges();

    assertHeadingHasClasses(
      `fudis-heading fudis-heading__align__${align} fudis-heading__size__${size} fudis-mb-${marginBottom}`,
      level,
    );
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('CSS classes', () => {
    it('should have respective size, margin bottom and level values according to given Inputs', () => {
      fudisHeadingLevelArray.forEach((level) => {
        fudisHeadingSizeArray.forEach((size) => {
          fudisTextAlignArray.forEach((alignment) => {
            fudisSpacingArray.forEach((spacing) => {
              headingCheck(size, alignment, spacing, level);
            });
          });
        });
      });
    });

    it('should have respective default size and margin bottom defined by the level', () => {
      fudisHeadingLevelArray.forEach((level) => {
        const levelBefore = component.level;

        component.level = level;

        component.ngOnChanges({
          level: {
            currentValue: level,
            previousValue: levelBefore,
            firstChange: false,
          },
        });

        fixture.detectChanges();

        let sizeClass = '';

        let marginBottom = '';

        if (level == 1) {
          sizeClass = 'xxl';
        } else if (level == 2) {
          sizeClass = 'xl';
        } else if (level == 3) {
          sizeClass = 'lg';
        } else if (level == 4) {
          sizeClass = 'md';
        } else if (level == 5) {
          sizeClass = 'sm';
        } else if (level == 6) {
          sizeClass = 'xs';
        }

        if (sizeClass === 'xxl' || sizeClass === 'xl') {
          marginBottom = 'sm';
        } else {
          marginBottom = 'xs';
        }

        assertHeadingHasClasses(
          `fudis-heading fudis-heading__align__left fudis-heading__size__${sizeClass} fudis-mb-${marginBottom}`,
          level,
        );
      });
    });
  });
});
