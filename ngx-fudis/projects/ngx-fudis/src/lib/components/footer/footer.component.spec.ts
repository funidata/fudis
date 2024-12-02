import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';
import { GridComponent } from '../grid/grid/grid.component';
import {
  FooterContentLeftDirective,
  FooterContentRightDirective,
} from '../../directives/content-projection/content/content.directive';
import { GridItemComponent } from '../grid/grid-item/grid-item.component';
import { IconComponent } from '../icon/icon.component';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { LinkDirective } from '../../directives/link/link.directive';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'fudis-mock-footer',
  template: `<fudis-footer>
    <ng-template fudisFooterContentRight>
      <a fudisLink href="example.com" [external]="true" [title]="'Privacy notice'"></a>
      <a fudisLink href="example.com" [external]="true" [title]="'Accessibility statement'"></a>
      <a fudisLink href="example.com" [external]="true" [title]="'System information'"></a>
    </ng-template>
    <ng-template fudisFooterContentLeft>
      <a fudisLink href="example.com" [external]="true" [title]="'Promo link'"></a>
    </ng-template>
  </fudis-footer>`,
})
class MockFooterComponent {
  constructor(public translationService: FudisTranslationService) {}
}

describe('FooterComponent', () => {
  let component: MockFooterComponent;
  let fixture: ComponentFixture<MockFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent,
        GridComponent,
        GridItemComponent,
        LinkDirective,
        IconComponent,
        FooterContentLeftDirective,
        FooterContentRightDirective,
        MockFooterComponent,
      ],
      providers: [FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getFooterGridElem() {
    return fixture.debugElement.query(By.directive(GridComponent));
  }

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  describe('CSS classes', () => {
    it('should have fudis-footer class', () => {
      const elem = fixture.debugElement.query(By.css('.fudis-footer'));

      expect(elem.nativeElement.className).toEqual('fudis-footer');
    });
  });

  describe('Contents', () => {
    it('should have fudis-grid element present', () => {
      expect(getFooterGridElem()).toBeTruthy();
    });

    it('should have fudis-grid-item elements present', () => {
      expect(getFooterGridElem().nativeElement.children.length).toEqual(2);
    });

    describe('Footer right side', () => {
      it('should have three child elements', () => {
        expect(getFooterGridElem().nativeElement.children[1].children.length).toEqual(3);
      });
    });

    describe('Footer left side', () => {
      it('should have two child elements', () => {
        expect(getFooterGridElem().nativeElement.children[0].children.length).toEqual(2);
      });

      it('should have Funidata logo visible with an alt text for screen readers', async () => {
        await fixture.whenStable().then(() => {
          const firstGridItemElem = getFooterGridElem().nativeElement.children[0];
          const anchorElem = firstGridItemElem.querySelector('.fudis-footer__item__logo');

          const svgElementTitle = firstGridItemElem.querySelector(
            '.fudis-footer__item__logo svg title',
          ) as HTMLTitleElement;

          expect(svgElementTitle.innerHTML).toEqual('Funidata logo');
          expect(anchorElem.children.length).toEqual(1);
          expect(anchorElem.getAttribute('aria-label')).toEqual(
            'Funidata homepage (opens in a new tab)',
          );
        });
      });
    });
    describe('Footer after lang update', () => {
      it('should have updated language', () => {
        component.translationService.setLanguage('fi');
        fixture.detectChanges();

        const firstGridItemElem = getFooterGridElem().nativeElement.children[0];
        const anchorElem = firstGridItemElem.querySelector('.fudis-footer__item__logo');

        expect(anchorElem.getAttribute('aria-label')).toEqual(
          'Funidatan kotisivut (aukeaa uuteen välilehteen)',
        );
      });
    });
  });
});
