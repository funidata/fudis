import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { FudisLanguageBadgeContent } from '../../types/miscellaneous';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { LanguageBadgeGroupComponent } from './language-badge-group.component';
import { LanguageBadgeComponent } from './language-badge/language-badge.component';

const providedLanguages: FudisLanguageBadgeContent = { en: 'en', fi: 'fi' };

const internalLanguageOptions: FudisLanguageBadgeContent = { en: 'en', fi: 'fi', sv: 'sv' };

describe('LanguageBadgeGroupComponent', () => {
  let component: LanguageBadgeGroupComponent;
  let fixture: ComponentFixture<LanguageBadgeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LanguageBadgeGroupComponent,
        MockComponent(LanguageBadgeComponent),
        TooltipApiDirective,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageBadgeGroupComponent],
    });
    fixture = TestBed.createComponent(LanguageBadgeGroupComponent);
    component = fixture.componentInstance;
    component.languages = providedLanguages;
    component.selectedLanguage = 'en';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Contents', () => {
    it('should contain all three language badges', () => {
      const parentComponent = fixture.debugElement.query(By.css('.fudis-language-badge-group'));

      expect(parentComponent.nativeElement.children.length).toEqual(3);
    });

    it('should have missing translation for Swedish', () => {
      const existingTranslation = component.languages;
      const missingLanguage = Object.keys(internalLanguageOptions).filter(
        (missing) => !Object.keys(existingTranslation).includes(missing),
      );

      expect(missingLanguage).toContain('sv');
    });

    // TODO: add test for output emit
  });
});
