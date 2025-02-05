import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyTextComponent } from './body-text.component';
import { getElement, sortClasses } from '../../../utilities/tests/utilities';
import { fudisBodyTextArray, fudisTextAlignArray } from '../../../types/typography';
import { FudisLanguageAbbr } from '../../../types/miscellaneous';

describe('BodyTextComponent', () => {
  let fixture: ComponentFixture<BodyTextComponent>;
  let component: BodyTextComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyTextComponent);
    component = fixture.componentInstance;
    component.lang = 'en';
    fixture.detectChanges();
  });

  function getBodyText() {
    fixture.detectChanges();

    const paragraph = getElement(fixture, '.fudis-body-text');
    return paragraph;
  }

  //TODO: Write test for host class
  describe('CSS classes', () => {
    it('should change CSS classes according to the given body-text variant input', () => {
      fudisBodyTextArray.forEach((variant) => {
        fixture.componentRef.setInput('variant', variant);

        fixture.detectChanges();

        const element = getBodyText();

        expect(sortClasses(element.className)).toEqual(
          sortClasses(`fudis-body-text fudis-body-text__left fudis-body-text__${variant}`),
        );
      });
    });

    it('should change CSS classes according to the given body-text align input', () => {
      fudisTextAlignArray.forEach((align) => {
        fixture.componentRef.setInput('align', align);
        fixture.detectChanges();

        const element = getBodyText();

        expect(sortClasses(element.className)).toEqual(
          sortClasses(
            `fudis-body-text fudis-body-text__default fudis-body-text__${align} fudis-body-text__md-regular`,
          ),
        );
      });
    });
  });

  describe('Language input', () => {
    it('should have correct lang attributes', () => {
      const languageOptions: FudisLanguageAbbr[] = ['fi', 'sv', 'en'];

      languageOptions.forEach((lang) => {
        fixture.componentRef.setInput('lang', `${lang}`);

        const element = getBodyText();

        expect(element.lang).toEqual(lang);
      });
    });
  });
});
