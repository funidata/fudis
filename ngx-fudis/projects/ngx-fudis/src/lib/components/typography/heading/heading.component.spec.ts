import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { HeadingComponent } from './heading.component';
import {
  FudisHeadingVariant,
  FudisHeadingLevel,
  fudisHeadingLevelArray,
  fudisHeadingVariantArray,
} from '../../../types/typography';
import { FudisSpacing, fudisSpacingArray } from '../../../types/spacing';
import { FudisTextAlign, fudisTextAlignArray } from '../../../types/typography';

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
    variant: FudisHeadingVariant,
    align: FudisTextAlign,
    marginBottom: FudisSpacing,
    level: FudisHeadingLevel,
  ): void {
    const variantBefore = component.variant;
    const marginBefore = component.marginBottom;
    const levelBefore = component.level;
    const alignBefore = component.align;

    component.variant = variant;
    component.marginBottom = marginBottom;
    component.level = level;
    component.align = align;

    component.ngOnChanges({
      variant: {
        previousValue: variantBefore,
        currentValue: variant,
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
      `fudis-heading fudis-heading__align__${align} fudis-heading__variant__${variant} fudis-mb-${marginBottom}`,
      level,
    );
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('CSS classes', () => {
    it('should have respective variant, margin bottom and level values according to given Inputs', () => {
      fudisHeadingLevelArray.forEach((level) => {
        fudisHeadingVariantArray.forEach((variant) => {
          fudisTextAlignArray.forEach((alignment) => {
            fudisSpacingArray.forEach((spacing) => {
              headingCheck(variant, alignment, spacing, level);
            });
          });
        });
      });
    });

    it('should have respective default variant and margin bottom defined by the level', () => {
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

        let variantClass = '';

        let marginBottom = '';

        if (level == 1) {
          variantClass = 'xxl';
        } else if (level == 2) {
          variantClass = 'xl';
        } else if (level == 3) {
          variantClass = 'lg';
        } else if (level == 4) {
          variantClass = 'md';
        } else if (level == 5) {
          variantClass = 'sm';
        } else if (level == 6) {
          variantClass = 'xs';
        }

        if (variantClass === 'xxl' || variantClass === 'xl') {
          marginBottom = 'sm';
        } else {
          marginBottom = 'xs';
        }

        assertHeadingHasClasses(
          `fudis-heading fudis-heading__align__left fudis-heading__variant__${variantClass} fudis-mb-${marginBottom}`,
          level,
        );
      });
    });
  });
});
