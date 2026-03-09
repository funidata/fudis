import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { GridComponent } from '../../../grid/grid/grid.component';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { DescriptionListComponent } from '../../description-list.component';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListItemTermComponent } from '../description-list-item-term/description-list-item-term.component';
import { DescriptionListItemDetailsComponent } from './description-list-item-details.component';
import { LanguageBadgeGroupComponent } from '../../../language-badge-group/language-badge-group.component';
import { LanguageBadgeComponent } from '../../../language-badge-group/language-badge/language-badge.component';
import { ButtonComponent } from '../../../button/button.component';
import { IconComponent } from '../../../icon/icon.component';
import { FudisBreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { getElement } from '../../../../utilities/tests/utilities';
import { FudisDescriptionListVariant } from '../../../../types/miscellaneous';

@Component({
  standalone: false,
  selector: 'fudis-mock-dl',
  template: `
    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [contentText]="'First DT'"></fudis-dt>
        <fudis-dd
          [contentText]="'This is my DD'"
          [ariaLabel]="'Additional information for screen readers'"
        ></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Second DT'"></fudis-dt>
        <fudis-dd [contentText]="'This is my DD'" [subHeading]="'Here is sub heading'">
          <fudis-button [label]="'Edit'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
        </fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid" [tag]="'p'">
      <fudis-dl-item>
        <fudis-dt [contentText]="'Single DT'"></fudis-dt>
        <fudis-dd [contentText]="'This is my DD'"></fudis-dd>
        <fudis-dd [contentText]="'This is other DD'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [contentText]="'DT With Languages 1'"></fudis-dt>
        <fudis-dd [contentText]="'This is in English'" [lang]="'en'"></fudis-dd>
        <fudis-dd [contentText]="'Tämä on suomeksi'" [lang]="'fi'"></fudis-dd>
        <fudis-dd [contentText]="''" [lang]="'sv'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [contentText]="'Empty state 1'"></fudis-dt>
        <fudis-dd [contentText]="'This should not be visible'" [emptyState]="true"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Empty state 2'"></fudis-dt>
        <fudis-dd
          [contentText]="'This should not be visible'"
          [emptyState]="true"
          [emptyStateContentText]="'This is custom text'"
        ></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
  `,
})
class MockDlComponent {
  variant: FudisDescriptionListVariant = 'regular';
  disableGrid: boolean = false;
}

describe('DescriptionListItemDetailsComponent', () => {
  let mockComponent: MockDlComponent;
  let mockFixture: ComponentFixture<MockDlComponent>;
  let service: FudisTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, IconComponent],
      declarations: [
        GridDirective,
        GridComponent,
        DescriptionListComponent,
        DescriptionListItemComponent,
        DescriptionListItemTermComponent,
        DescriptionListItemDetailsComponent,
        LanguageBadgeGroupComponent,
        LanguageBadgeComponent,
        MockDlComponent,
      ],
      providers: [FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(FudisTranslationService);
    service.setSelectableLanguages(['en', 'fi', 'sv']);
    service.setLanguage('en');

    mockFixture = TestBed.createComponent(MockDlComponent);
    mockComponent = mockFixture.componentInstance;
    mockFixture.detectChanges();
  });

  function getDlItemDetailsElement(
    type: string,
    variant: FudisDescriptionListVariant = 'regular',
  ): HTMLElement {
    mockFixture.detectChanges();

    const dlItemDetailsElement = getElement(
      mockFixture,
      `fudis-dd ${type}.fudis-dl-item-details__${variant}`,
    );
    return dlItemDetailsElement;
  }

  function getDlItemDetailsFromArrayIndex(index: number): DebugElement {
    const dlItemDetailsElements = mockFixture.debugElement.queryAll(By.css('fudis-dd'));
    const itemArray = [...dlItemDetailsElements];

    return itemArray[index];
  }

  function getDlWithLanguages(index: number): DebugElement {
    const dlWithLanguages = mockFixture.debugElement.queryAll(By.css('fudis-dl'))[index];
    mockFixture.detectChanges();

    return dlWithLanguages;
  }

  it('should create', () => {
    expect(mockComponent).toBeTruthy();
  });

  describe('Wrapper element', () => {
    it('should render respective wrapper element for multiple and single item templates', () => {
      expect(
        getDlItemDetailsFromArrayIndex(0).query(By.css('dd.fudis-dl-item-details__regular')),
      ).toBeTruthy();
      expect(
        getDlItemDetailsFromArrayIndex(2).query(By.css('dd.fudis-dl-item-details__regular')),
      ).toBeFalsy();

      expect(
        getDlItemDetailsFromArrayIndex(2).query(By.css('span.fudis-dl-item-details__regular')),
      ).toBeTruthy();
      expect(
        getDlItemDetailsFromArrayIndex(0).query(By.css('span.fudis-dl-item-details__regular')),
      ).toBeFalsy();
    });
  });

  describe('CSS classes', () => {
    it('should have main CSS class', () => {
      expect(getDlItemDetailsElement('dd').className).toEqual('fudis-dl-item-details__regular');
      expect(getDlItemDetailsElement('span').className).toEqual('fudis-dl-item-details__regular');

      mockComponent.variant = 'compact';
      mockFixture.detectChanges();

      expect(getDlItemDetailsElement('dd', 'compact').className).toEqual(
        'fudis-dl-item-details__compact',
      );
      expect(getDlItemDetailsElement('span', 'compact').className).toEqual(
        'fudis-dl-item-details__compact',
      );
    });
  });

  describe('HTML id', () => {
    it('should have generated id from Id Service', () => {
      expect(
        getDlItemDetailsFromArrayIndex(0)
          .query(By.css('dd.fudis-dl-item-details__regular'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-1-item-1-details-1');

      expect(
        getDlItemDetailsFromArrayIndex(1)
          .query(By.css('dd.fudis-dl-item-details__regular'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-1-item-2-details-1');

      expect(
        getDlItemDetailsFromArrayIndex(2)
          .query(By.css('span.fudis-dl-item-details__regular'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-2-item-1-details-1');

      expect(
        getDlItemDetailsFromArrayIndex(3)
          .query(By.css('span.fudis-dl-item-details__regular'))
          .nativeElement.getAttribute('id'),
      ).toEqual('fudis-description-list-2-item-1-details-2');
    });
  });

  describe('Sub heading', () => {
    it('should be visible if given', () => {
      const subHeadingElement = getElement(
        mockFixture,
        '.fudis-dl-item-details__regular__sub-heading',
      );
      const parenthesisClass = getElement(
        mockFixture,
        '.fudis-dl-item-details__regular__parenthesis',
      );

      expect(subHeadingElement.textContent).toEqual('Here is sub heading');
      expect(parenthesisClass).toBeTruthy();
    });
  });

  describe('Aria-label', () => {
    it('should be visible for screen readers if given', () => {
      expect(
        getDlItemDetailsFromArrayIndex(0)
          .query(By.css('.fudis-dl-item-details__regular__content'))
          .nativeElement.getAttribute('aria-label'),
      ).toEqual('Additional information for screen readers');

      expect(
        getDlItemDetailsFromArrayIndex(1)
          .query(By.css('.fudis-dl-item-details__regular__content'))
          .nativeElement.getAttribute('aria-label'),
      ).toBeNull();
    });
  });

  describe('Language content', () => {
    it('should have selected language visible', () => {
      const dlWithLanguages = getDlWithLanguages(2);
      mockFixture.detectChanges();

      const currentLanguage = dlWithLanguages.nativeElement.querySelector(
        '.fudis-dl-item-details__regular .fudis-dl-item-details__regular__content',
      );

      expect(currentLanguage.textContent).toEqual('This is in English');

      service.setLanguage('fi');
      mockFixture.detectChanges();

      const changedLanguage = dlWithLanguages.nativeElement.querySelector(
        '.fudis-dl-item-details__regular .fudis-dl-item-details__regular__content',
      );

      expect(changedLanguage.textContent).toEqual('Tämä on suomeksi');
    });

    it('should have correct language attribute', () => {
      const dlWithLanguages = getDlWithLanguages(2);
      mockFixture.detectChanges();

      const changedLanguage = dlWithLanguages.nativeElement.querySelector(
        '.fudis-dl-item-details__regular',
      );

      expect(changedLanguage.lang).toEqual('en');
    });
  });

  describe('Nested content', () => {
    it('should render button', () => {
      const buttonComponent = mockFixture.debugElement.query(
        By.css('.fudis-dl-item-details__regular__content fudis-button'),
      );

      expect(buttonComponent).toBeTruthy();
    });
  });

  describe('Empty state', () => {
    it('should show default empty state text', () => {
      const emptyState = mockFixture.debugElement.query(
        By.css('.fudis-dl-item-details__regular .fudis-text-emptystate'),
      );

      const text = emptyState.nativeElement.textContent.trim();

      expect(text).toEqual('Information is not available');
    });

    it('should show custom text', () => {
      const emptyStateElements = mockFixture.debugElement.queryAll(
        By.css('.fudis-dl-item-details__regular .fudis-text-emptystate'),
      );

      const text = emptyStateElements[1].nativeElement.textContent.trim();

      expect(text).toEqual('This is custom text');
    });
  });
});
