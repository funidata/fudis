import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GridComponent } from '../../../grid/grid/grid.component';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { DescriptionListComponent } from '../../description-list.component';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListItemTermComponent } from './description-list-item-term.component';
import { DescriptionListItemDetailsComponent } from '../description-list-item-details/description-list-item-details.component';
import { LanguageBadgeGroupComponent } from '../../../language-badge-group/language-badge-group.component';
import { LanguageBadgeComponent } from '../../../language-badge-group/language-badge/language-badge.component';
import { FudisBreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { getElement } from '../../../../utilities/tests/utilities';
import { FudisDescriptionListVariant } from '../../../../types/miscellaneous';
import { TooltipApiDirective } from '../../../../directives/tooltip/tooltip-api.directive';
import { TooltipDirective } from '../../../../directives/tooltip/tooltip.directive';
import { ButtonComponent } from '../../../button/button.component';
import { IconComponent } from '../../../icon/icon.component';

@Component({
  standalone: false,
  selector: 'fudis-mock-dl',
  template: `
    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [contentText]="'First DT'" [tooltip]="'Tooltip text'" />
        <fudis-dd [contentText]="'This is my DD'" />
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Second DT'" />
        <fudis-dd [contentText]="'This is my DD'" />
        <fudis-dd *ngIf="langVisible" [contentText]="'Language content'" [lang]="'en'" />
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid" [tag]="'p'">
      <fudis-dl-item>
        <fudis-dt [contentText]="'Single DT'" />
        <fudis-dd [contentText]="'This is my DD'" />
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [contentText]="'DT With Languages 1'" />
        <fudis-dd [contentText]="'This is in English'" [lang]="'en'" />
        <fudis-dd [contentText]="'Tämä on suomeksi'" [lang]="'fi'" />
        <fudis-dd [contentText]="''" [lang]="'sv'" />
      </fudis-dl-item>
    </fudis-dl>
  `,
})
class MockDlComponent {
  variant: FudisDescriptionListVariant = 'regular';
  disableGrid: boolean = false;

  langVisible: boolean = false;
}

describe('DescriptionListItemTermComponent', () => {
  let mockComponent: MockDlComponent;
  let mockFixture: ComponentFixture<MockDlComponent>;
  let service: FudisTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ButtonComponent,
        GridDirective,
        GridComponent,
        DescriptionListComponent,
        DescriptionListItemComponent,
        DescriptionListItemTermComponent,
        DescriptionListItemDetailsComponent,
        IconComponent,
        LanguageBadgeGroupComponent,
        LanguageBadgeComponent,
        TooltipDirective,
        TooltipApiDirective,
        MockDlComponent,
      ],
      providers: [FudisBreakpointService],
      imports: [MatTooltipModule],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(FudisTranslationService);
    service.setLanguage('en');
    service.setSelectableLanguages(['en', 'fi', 'sv']);

    mockFixture = TestBed.createComponent(MockDlComponent);
    mockComponent = mockFixture.componentInstance;
    mockFixture.detectChanges();
  });

  function getDlItemTermElement(
    type: string,
    variant: FudisDescriptionListVariant = 'regular',
  ): HTMLElement {
    mockFixture.detectChanges();

    const dlItemElement = getElement(
      mockFixture,
      `fudis-dt ${type}.fudis-dl-item-term__${variant}`,
    );
    return dlItemElement;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getDlItemTermFromArrayIndex(index: number): any {
    const dlItemTermElements = mockFixture.debugElement.queryAll(By.css('fudis-dt'));
    const itemArray = [...dlItemTermElements];

    return itemArray[index];
  }

  function getAllLanguageBadgeGroups() {
    const allLanguageBadgeGroups = mockFixture.debugElement.queryAll(
      By.directive(LanguageBadgeGroupComponent),
    );
    mockFixture.detectChanges();

    return allLanguageBadgeGroups;
  }

  function getAllLanguageBadges() {
    const allLanguageBadges = mockFixture.debugElement.queryAll(
      By.directive(LanguageBadgeComponent),
    );
    mockFixture.detectChanges();

    return allLanguageBadges;
  }

  it('should create', () => {
    expect(mockComponent).toBeTruthy();
  });

  describe('Wrapper element', () => {
    it('should render respective wrapper element for multiple and single item templates', () => {
      expect(
        getDlItemTermFromArrayIndex(0).query(By.css('dt.fudis-dl-item-term__regular')),
      ).toBeTruthy();
      expect(
        getDlItemTermFromArrayIndex(2).query(By.css('dt.fudis-dl-item-term__regular')),
      ).toBeFalsy();

      expect(
        getDlItemTermFromArrayIndex(2).query(By.css('span.fudis-dl-item-term__regular')),
      ).toBeTruthy();
      expect(
        getDlItemTermFromArrayIndex(0).query(By.css('span.fudis-dl-item-term__regular')),
      ).toBeFalsy();
    });
  });

  describe('CSS classes', () => {
    it('should have main CSS class', () => {
      expect(getDlItemTermElement('dt').className).toEqual('fudis-dl-item-term__regular');
      expect(getDlItemTermElement('span').className).toEqual('fudis-dl-item-term__regular');

      mockComponent.variant = 'compact';
      mockFixture.detectChanges();

      expect(getDlItemTermElement('dt', 'compact').className).toEqual(
        'fudis-dl-item-term__compact',
      );

      expect(getDlItemTermElement('span', 'compact').className).toEqual(
        'fudis-dl-item-term__compact',
      );
    });
  });

  describe('HTML id', () => {
    it('should have generated id from Id Service', () => {
      expect(
        getDlItemTermFromArrayIndex(0)
          .query(By.css('dt.fudis-dl-item-term__regular'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-1-item-1-term-1');

      expect(
        getDlItemTermFromArrayIndex(1)
          .query(By.css('dt.fudis-dl-item-term__regular'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-1-item-2-term-1');

      expect(
        getDlItemTermFromArrayIndex(2)
          .query(By.css('span.fudis-dl-item-term__regular'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-2-item-1-term-1');
    });
  });

  describe('Tooltip', () => {
    it('should be visible if tooltip properties are given', () => {
      expect(
        getDlItemTermFromArrayIndex(0).query(By.css('.fudis-dl-item-term__regular__tooltip')),
      ).toBeTruthy();
      expect(
        getDlItemTermFromArrayIndex(0)
          .query(By.css('.fudis-dl-item-term__regular__tooltip button'))
          .nativeElement.getAttribute('aria-label'),
      ).toEqual('Tooltip text');
    });
  });

  describe('Language options hidden', () => {
    it('should have only one visible Language Badge Group', () => {
      mockFixture.detectChanges();

      const allLanguageBadgeGroups = getAllLanguageBadgeGroups();
      const allLanguageBadges = getAllLanguageBadges();

      mockFixture.detectChanges();

      expect(allLanguageBadgeGroups.length).toEqual(1);
      expect(allLanguageBadgeGroups).toBeTruthy();
      expect(allLanguageBadges.length).toEqual(3);
    });
  });

  describe('All language options visible', () => {
    beforeEach(() => {
      mockFixture = TestBed.createComponent(MockDlComponent);
      mockComponent = mockFixture.componentInstance;
      mockComponent.langVisible = true;
      mockFixture.detectChanges();
    });

    it('should have all Language Badge Groups visible if one details has lang property', () => {
      mockFixture.detectChanges();

      const allLanguageBadgeGroups = getAllLanguageBadgeGroups();
      const allLanguageBadges = getAllLanguageBadges();

      expect(allLanguageBadgeGroups.length).toEqual(2);
      expect(allLanguageBadgeGroups).toBeTruthy();
      expect(allLanguageBadges.length).toEqual(6);
    });
  });
});
