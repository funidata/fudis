import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { IconComponent } from '../icon/icon.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { FudisIdService } from '../../services/id/id.service';
import { BreadcrumbsItemComponent } from './breadcrumbs-item/breadcrumbs-item.component';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { RouterModule } from '@angular/router';
import { LinkDirective } from '../../directives/link/link.directive';
import { getElement } from '../../utilities/tests/utilities';

@Component({
  selector: 'fudis-mock-component',
  template: `<fudis-breadcrumbs [label]="'Test breadcrumbs navigation'">
    <p class="do-not-find-me">This should not be shown</p>
    <fudis-breadcrumbs-item *ngFor="let link of links; let index = index">
      <a *ngIf="index + 1 !== links.length" [href]="link.url">{{ link.label }}</a>
      <fudis-body-text *ngIf="index + 1 === links.length">{{ link.label }}</fudis-body-text>
    </fudis-breadcrumbs-item>
  </fudis-breadcrumbs>`,
})
class MockComponent {
  public links = [
    { label: 'Components', url: '/components' },
    { label: 'Breadcrumbs', url: '/components/breadcrumbs' },
    { label: 'Documentation', url: '/components/breadcrumbs/documentation' },
  ];
}

describe('BreadcrumbsComponent', () => {
  let fixture: ComponentFixture<BreadcrumbsComponent> | ComponentFixture<MockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BreadcrumbsComponent,
        BreadcrumbsItemComponent,
        LinkDirective,
        IconComponent,
        BodyTextComponent,
        MockComponent,
      ],
      imports: [RouterModule.forRoot([])],
      providers: [FudisIdService, FudisTranslationService],
    });

    fixture = TestBed.createComponent(MockComponent);

    fixture.autoDetectChanges();
  });

  it('should render the correct number of breadcrumb items', () => {
    const breadcrumbItems = fixture.debugElement.queryAll(By.css('fudis-breadcrumbs-item'));

    const nonWantedItem = fixture.debugElement.queryAll(By.css('.do-not-find-me'));

    expect(breadcrumbItems.length).toBe(3);
    expect(nonWantedItem.length).toBe(0);
  });

  it('should have the correct labels and attributes', () => {
    const breadcrumb: HTMLElement = fixture.nativeElement.querySelector('nav');

    const ariaLabel = breadcrumb.getAttribute('aria-label');

    const id = breadcrumb.getAttribute('id');

    expect(ariaLabel).toEqual('Breadcrumbs: Test breadcrumbs navigation');
    expect(id).toEqual('fudis-breadcrumbs-1');
  });

  describe('child item components', () => {
    it('should have correct link hrefs', () => {
      const items: NodeList = fixture.nativeElement.querySelectorAll('fudis-breadcrumbs-item');

      const linkHrefs: (string | null | undefined)[] = [];

      items.forEach((item) => {
        const linkElement: Element | null = (item as Element)!.querySelector(
          '.fudis-breadcrumbs-item a',
        );

        if (linkElement) {
          linkHrefs.push(linkElement.getAttribute('href'));
        }
      });

      expect(linkHrefs.join(' ')).toEqual('/components /components/breadcrumbs');
    });

    it('should have correct id attributes', () => {
      const items: NodeList = fixture.nativeElement.querySelectorAll(
        'fudis-breadcrumbs-item .fudis-breadcrumbs-item',
      );

      const idList: (string | null | undefined)[] = [];

      items.forEach((item) => {
        const itemId = (item as HTMLElement).getAttribute('id');
        idList.push(itemId);
      });

      expect(idList.join(' ')).toEqual(
        'fudis-breadcrumbs-1-item-1 fudis-breadcrumbs-1-item-2 fudis-breadcrumbs-1-item-3',
      );
    });

    it('should have correct aria-current attribute on last item', () => {
      const bodyText = getElement(fixture, 'fudis-body-text p');

      expect(bodyText.getAttribute('aria-current')).toEqual('page');
    });
  });
});
