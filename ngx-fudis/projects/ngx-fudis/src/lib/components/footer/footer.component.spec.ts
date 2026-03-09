import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FooterComponent } from './footer.component';
import { IconComponent } from '../icon/icon.component';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { LinkDirective } from '../../directives/link/link.directive';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Component({
  standalone: false,
  selector: 'fudis-mock-footer',
  template: `<fudis-footer>
    <a fudisLink href="example.com" [external]="true" [title]="'Privacy notice'"></a>
    <a fudisLink href="example.com" [external]="true" [title]="'Accessibility statement'"></a>
    <a fudisLink href="example.com" [external]="true" [title]="'System information'"></a>
    <a fudisLink href="example.com" [external]="true" [title]="'Promo link'"></a>
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
      declarations: [FooterComponent, LinkDirective, MockFooterComponent],
      imports: [IconComponent],
      providers: [FudisBreakpointService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getFooter() {
    return fixture.debugElement.query(By.css('.fudis-footer')).nativeElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('CSS classes', () => {
    it('should have fudis-footer class', () => {
      expect(getFooter().className).toEqual('fudis-footer');
    });
  });

  describe('Contents', () => {
    it('should have footer item elements present', () => {
      expect(getFooter().children.length).toEqual(2);
    });

    it('second footer item element should have 4 children', () => {
      const elem = fixture.debugElement.queryAll(By.css('.fudis-footer__item'));
      expect(elem[1].nativeElement.children.length).toEqual(4);
    });

    describe('Footer left side', () => {
      it('should have Funidata logo visible with an alt text for screen readers', () => {
        const firstItemElem = getFooter().children[0];

        const anchorElem = firstItemElem.querySelector('.fudis-footer__item__logo');

        const svgElementTitle = firstItemElem.querySelector(
          '.fudis-footer__item__logo svg title',
        ) as HTMLTitleElement;

        expect(svgElementTitle.innerHTML).toEqual('Funidata logo');
        expect(anchorElem.children.length).toEqual(1);
        expect(anchorElem.getAttribute('aria-label')).toEqual(
          'Funidata homepage (opens in a new tab)',
        );
      });
    });
    describe('Footer after lang update', () => {
      it('should have updated language', () => {
        component.translationService.setLanguage('fi');
        fixture.detectChanges();

        const firstItemElem = getFooter().children[0];
        const anchorElem = firstItemElem.querySelector('.fudis-footer__item__logo');

        expect(anchorElem.getAttribute('aria-label')).toEqual(
          'Funidatan kotisivut (aukeaa uuteen välilehteen)',
        );
      });
    });
  });
});
