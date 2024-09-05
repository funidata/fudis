import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import { TooltipApiDirective } from '../../directives/tooltip/tooltip-api.directive';
import { LanguageBadgeGroupComponent } from './language-badge-group.component';
import { LanguageBadgeComponent } from './language-badge/language-badge.component';
import { getAllElements, getElement } from '../../utilities/tests/utilities';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';

const providedLanguages: FudisLanguageAbbr[] = ['en', 'fi'];

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

    it('should find 3 directives with correct tooltip text for each language badge', () => {
      const all = fixture.debugElement.queryAll(By.directive(TooltipDirective));

      expect(all.length).toEqual(3);

      const fi = all[0].injector.get<TooltipDirective>(TooltipDirective).tooltip;
      const sv = all[1].injector.get<TooltipDirective>(TooltipDirective).tooltip;
      const en = all[2].injector.get<TooltipDirective>(TooltipDirective).tooltip;

      expect(fi).toContain('Change translation to Finnish');
      expect(sv).toContain('Change translation to Swedish');
      expect(en).toContain('Change translation to English');

      expect(sv).toContain('(Missing translation)');
      expect(en).toContain('(Selected)');
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
