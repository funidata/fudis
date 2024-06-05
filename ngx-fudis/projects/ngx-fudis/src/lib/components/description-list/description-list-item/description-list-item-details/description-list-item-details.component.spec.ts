import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GridComponent } from '../../../grid/grid/grid.component';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { DescriptionListComponent } from '../../description-list.component';
import { FudisGridService } from '../../../../services/grid/grid.service';
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
import { FudisIdService } from '../../../../services/id/id.service';
import { TooltipApiDirective } from '../../../../directives/tooltip/tooltip-api.directive';
import { TooltipDirective } from '../../../../directives/tooltip/tooltip.directive';
import { ActionsDirective } from '../../../../directives/content-projection/actions/actions.directive';

@Component({
  selector: 'fudis-mock-dl',
  template: `
    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [textContent]="'First DT'"></fudis-dt>
        <fudis-dd [textContent]="'This is my DD'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'Second DT'"></fudis-dt>
        <fudis-dd [textContent]="'This is my DD'" [subHeading]="'Here is sub heading'">
          <fudis-button [label]="'Edit'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
        </fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid" [tag]="'p'">
      <fudis-dl-item>
        <fudis-dt [textContent]="'Single DT'"></fudis-dt>
        <fudis-dd [textContent]="'This is my DD'"></fudis-dd>
        <fudis-dd [textContent]="'This is other DD'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [textContent]="'DT With Languages 1'"></fudis-dt>
        <fudis-dd [textContent]="'This is in English'" [lang]="'en'"></fudis-dd>
        <fudis-dd [textContent]="'Tämä on suomeksi'" [lang]="'fi'"></fudis-dd>
        <fudis-dd [textContent]="''" [lang]="'sv'"></fudis-dd>
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
      declarations: [
        ActionsDirective,
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
      providers: [
        FudisGridService,
        FudisIdService,
        FudisBreakpointService,
        FudisTranslationService,
      ],
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

  function getDlItemDetailsElement(
    type: string,
    variant: FudisDescriptionListVariant = 'regular',
  ): HTMLElement {
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

      mockFixture.whenRenderingDone().then(() => {
        expect(getDlItemDetailsElement('dd', 'compact').className).toEqual(
          'fudis-dl-item-details__compact',
        );
        expect(getDlItemDetailsElement('span', 'compact').className).toEqual(
          'fudis-dl-item-details__compact',
        );
      });
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

  describe('Language content', () => {
    it('should have selected language visible', () => {
      let dlWithLanguages: DebugElement;

      mockFixture.whenRenderingDone().then(() => {
        dlWithLanguages = mockFixture.debugElement.queryAll(By.css('fudis-dl'))[2];
        const currentLanguage = dlWithLanguages.nativeElement.querySelector(
          '.fudis-dl-item-details__regular .fudis-dl-item-details__regular__content',
        );

        expect(currentLanguage.textContent).toEqual('This is in English');
      });

      service.setLanguage('fi');
      mockFixture.detectChanges();

      mockFixture.whenRenderingDone().then(() => {
        const changedLanguage = dlWithLanguages.nativeElement.querySelector(
          '.fudis-dl-item-details__regular .fudis-dl-item-details__regular__content',
        );

        expect(changedLanguage.textContent).toEqual('Tämä on suomeksi');
      });
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
});
