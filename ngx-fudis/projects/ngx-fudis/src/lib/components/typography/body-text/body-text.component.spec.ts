import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyTextComponent } from './body-text.component';
import { getElement, sortClasses } from '../../../utilities/tests/utilities';
import { fudisBodyTextArray, fudisTextAlignArray } from '../../../types/typography';

describe('BodyTextComponent', () => {
  let fixture: ComponentFixture<BodyTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyTextComponent);
    fixture.detectChanges();
  });

  //TODO: Write test for host class
  describe('CSS classes', () => {
    it('should change CSS classes according to the given body-text variant input', () => {
      fudisBodyTextArray.forEach((variant) => {
        fixture.componentRef.setInput('variant', variant);

        fixture.detectChanges();

        const element = getElement(fixture, '.fudis-body-text');

        expect(sortClasses(element.className)).toEqual(
          sortClasses(`fudis-body-text fudis-body-text__left fudis-body-text__${variant}`),
        );
      });
    });

    it('should change CSS classes according to the given body-text align input', () => {
      fudisTextAlignArray.forEach((align) => {
        fixture.componentRef.setInput('align', align);
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
