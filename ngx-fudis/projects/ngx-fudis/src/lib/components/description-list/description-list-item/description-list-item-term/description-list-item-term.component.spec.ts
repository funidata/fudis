import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GridComponent } from '../../../grid/grid/grid.component';
import { GridDirective } from '../../../../directives/grid/grid/grid.directive';
import { DescriptionListComponent } from '../../description-list.component';
import { FudisGridService } from '../../../../services/grid/grid.service';
import { DescriptionListItemComponent } from '../description-list-item.component';
import { DescriptionListItemTermComponent } from './description-list-item-term.component';
import { DescriptionListItemDetailsComponent } from '../description-list-item-details/description-list-item-details.component';
import { LanguageBadgeGroupComponent } from '../../../language-badge-group/language-badge-group.component';
import { FudisBreakpointService } from '../../../../services/breakpoint/breakpoint.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { getElement } from '../../../../utilities/tests/utilities';
import { Component } from '@angular/core';
import { FudisDescriptionListVariant } from '../../../../types/miscellaneous';
import { FudisIdService } from '../../../../services/id/id.service';
import { TooltipApiDirective } from '../../../../directives/tooltip/tooltip-api.directive';

import { phl } from '@angular-extensions/pretty-html-log';
import { LanguageBadgeComponent } from '../../../language-badge-group/language-badge/language-badge.component';

@Component({
  selector: 'fudis-mock-dl',
  template: `
    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt>First DT</fudis-dt>
        <fudis-dd>This is my DD</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Second DT</fudis-dt>
        <fudis-dd>This is my DD</fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt>Single DT</fudis-dt>
        <fudis-dd>This is my DD</fudis-dd>
      </fudis-dl-item>
    </fudis-dl>

    <fudis-dl [variant]="variant" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [languages]="true">DT With Languages 1</fudis-dt>
        <fudis-dd [lang]="'en'">This is in English</fudis-dd>
        <fudis-dd [lang]="'fi'">Tämä on suomeksi</fudis-dd>
        <fudis-dd [lang]="'sv'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [languages]="true">DT With Languages 2</fudis-dt>
        <!-- <fudis-dd [lang]="'en'">This is in English</fudis-dd>
        <fudis-dd [lang]="'fi'">Tämä on suomeksi</fudis-dd>
        <fudis-dd [lang]="'sv'"></fudis-dd> -->
      </fudis-dl-item>
    </fudis-dl>
  `,
})
class MockDlComponent {
  variant: FudisDescriptionListVariant = 'regular';
  disableGrid: boolean = false;
}

describe('DescriptionListItemTermComponent', () => {
  let mockComponent: MockDlComponent;
  let mockFixture: ComponentFixture<MockDlComponent>;
  let service: FudisTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GridDirective,
        GridComponent,
        DescriptionListComponent,
        DescriptionListItemComponent,
        DescriptionListItemTermComponent,
        DescriptionListItemDetailsComponent,
        LanguageBadgeGroupComponent,
        LanguageBadgeComponent,
        TooltipApiDirective,
        MockDlComponent,
      ],
      providers: [
        FudisGridService,
        FudisIdService,
        FudisBreakpointService,
        FudisTranslationService,
      ],
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

  it('should create', () => {
    expect(mockComponent).toBeTruthy();
  });

  // describe('Wrapper element', () => {
  //   it('should render respective wrapper element for multiple and single item templates', () => {
  //     expect(
  //       getDlItemTermFromArrayIndex(0).query(By.css('dt.fudis-dl-item-term__regular')),
  //     ).toBeTruthy();
  //     expect(
  //       getDlItemTermFromArrayIndex(2).query(By.css('dt.fudis-dl-item-term__regular')),
  //     ).toBeFalsy();

  //     expect(
  //       getDlItemTermFromArrayIndex(2).query(By.css('span.fudis-dl-item-term__regular')),
  //     ).toBeTruthy();
  //     expect(
  //       getDlItemTermFromArrayIndex(0).query(By.css('span.fudis-dl-item-term__regular')),
  //     ).toBeFalsy();
  //   });
  // });

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

  // describe('HTML id', () => {
  //   it('should have generated id from Id Service', () => {
  //     expect(
  //       getDlItemTermFromArrayIndex(0)
  //         .query(By.css('dt.fudis-dl-item-term__regular'))
  //         .nativeElement.getAttribute('id'),
  //     ).toEqual('fudis-description-list-1-item-1-term-1');

  //     expect(
  //       getDlItemTermFromArrayIndex(1)
  //         .query(By.css('dt.fudis-dl-item-term__regular'))
  //         .nativeElement.getAttribute('id'),
  //     ).toEqual('fudis-description-list-1-item-2-term-1');

  //     expect(
  //       getDlItemTermFromArrayIndex(2)
  //         .query(By.css('span.fudis-dl-item-term__regular'))
  //         .nativeElement.getAttribute('id'),
  //     ).toEqual('fudis-description-list-2-item-1-term-1');
  //   });
  // });

  describe('With languages', () => {
    it('should have visible language badges', () => {
      phl(mockFixture);
    });
  });
});
