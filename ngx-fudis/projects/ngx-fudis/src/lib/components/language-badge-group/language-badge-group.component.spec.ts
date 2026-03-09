import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import { LanguageBadgeGroupComponent } from './language-badge-group.component';
import { LanguageBadgeComponent } from './language-badge/language-badge.component';
import { getAllElements, getElement } from '../../utilities/tests/utilities';

const providedLanguages: FudisLanguageAbbr[] = ['en', 'fi'];

describe('LanguageBadgeGroupComponent', () => {
  let component: LanguageBadgeGroupComponent;
  let fixture: ComponentFixture<LanguageBadgeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageBadgeGroupComponent, LanguageBadgeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageBadgeGroupComponent],
    });
    fixture = TestBed.createComponent(LanguageBadgeGroupComponent);
    component = fixture.componentInstance;
    component.translatedLanguages = providedLanguages;

    fixture.autoDetectChanges();
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
      const missingLanguages = getAllElements(fixture, '.fudis-language-badge__missing');

      expect(missingLanguages.length).toEqual(1);

      expect(missingLanguages[0].textContent).toEqual('sv');
    });

    it('should have english selected as a default', () => {
      const selected = getElement(fixture, '.fudis-language-badge--selected');

      expect(selected.textContent).toEqual('en');
    });
  });

  describe('Interaction', () => {
    it('should update language and emit output when clicked', () => {
      jest.spyOn(component.handleClick, 'emit');

      const fiButton = getElement(fixture, '.fudis-language-badge') as HTMLButtonElement;

      fiButton.click();

      expect(component.handleClick.emit).toHaveBeenCalledWith('fi');
    });
  });
});
