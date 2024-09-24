import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { BodyTextComponent } from './body-text.component';
import { getElement, sortClasses } from '../../../utilities/tests/utilities';
import { fudisBodyTextArray, fudisTextAlignArray } from '../../../types/typography';

describe('BodyTextComponent', () => {
  let component: BodyTextComponent;
  let fixture: ComponentFixture<BodyTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyTextComponent],
    })
      .overrideComponent(BodyTextComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TODO: Write test for host class
  describe('CSS classes', () => {
    it('should change CSS classes according to the given body-text variant input', () => {
      fudisBodyTextArray.forEach((variant) => {
        component.variant = variant;
        fixture.detectChanges();

        const element = getElement(fixture, '.fudis-body-text');

        expect(sortClasses(element.className)).toEqual(
          sortClasses(
            `fudis-body-text fudis-body-text__default fudis-body-text__left fudis-body-text__${variant}`,
          ),
        );
      });
    });

    it('should change CSS classes according to the given body-text align input', () => {
      fudisTextAlignArray.forEach((align) => {
        component.align = align;
        fixture.detectChanges();

        const element = getElement(fixture, '.fudis-body-text');

        expect(sortClasses(element.className)).toEqual(
          sortClasses(
            `fudis-body-text fudis-body-text__default fudis-body-text__${align} fudis-body-text__md-regular`,
          ),
        );
      });
    });
  });
});
