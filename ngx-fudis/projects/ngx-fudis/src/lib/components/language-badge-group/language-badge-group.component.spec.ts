import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FudisLanguageBadgeContent } from '../../types/miscellaneous';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { LanguageBadgeGroupComponent } from './language-badge-group.component';
import { LanguageBadgeComponent } from './language-badge/language-badge.component';
import { getAllElements, getElement } from '../../utilities/tests/utilities';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';

const providedLanguages: FudisLanguageBadgeContent = {
  en: { 'test-en-id': 'English' },
  fi: { 'test-fi-id': 'Finnish' },
};

describe('LanguageBadgeGroupComponent', () => {
  let component: LanguageBadgeGroupComponent;
  let fixture: ComponentFixture<LanguageBadgeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LanguageBadgeGroupComponent,
        LanguageBadgeComponent,
        TooltipApiDirective,
        TooltipDirective,
      ],
      imports: [MatTooltipModule],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageBadgeGroupComponent],
    });
    fixture = TestBed.createComponent(LanguageBadgeGroupComponent);
    component = fixture.componentInstance;
    component.options = providedLanguages;

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
  });

  describe('Interaction', () => {
    it('should update language and emit output when clicked', () => {
      jest.spyOn(component.handleBadgeClick, 'emit');

      const fiButton = getElement(fixture, '.fudis-language-badge') as HTMLButtonElement;

      fiButton.click();

      expect(component.handleBadgeClick.emit).toHaveBeenCalledWith('fi');
    });
  });
});
