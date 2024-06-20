import { ChangeDetectionStrategy, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { LinkComponent } from './link.component';
import { LinkDirective } from '../../directives/link/link.directive';
import { getElement } from '../../utilities/tests/utilities';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkComponent, LinkDirective, MockComponent(IconComponent)],
      imports: [RouterModule.forRoot([])],
    })
      .overrideComponent(LinkComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    component.link = '/example-router-link';
    fixture.detectChanges();
  });

  function linkSizeCheck(size: 'inherit' | 'md' | 'lg'): void {
    component.size = size;
    fixture.detectChanges();

    const linkEl = getElement(fixture, 'a');

    expect(linkEl.className).toContain(`fudis-link__size__${size}`);
  }

  describe('CSS classes', () => {
    it('should have default CSS classes', () => {
      const wrapperElement = getElement(fixture, '.fudis-link');
      const linkElement = getElement(fixture, 'a');
      const linkClasses = linkElement.className;

      expect(linkClasses).toContain('fudis-link fudis-link__router fudis-link__size__inherit');
      expect(wrapperElement).toBeTruthy();
    });

    it('should have respective CSS class for size', () => {
      linkSizeCheck('inherit');
      linkSizeCheck('md');
      linkSizeCheck('lg');
    });
  });

  describe('Regular link component', () => {
    it('should render title if it is given', () => {
      component.externalLink = 'www.example.com';
      component.title = 'My link';

      component.ngOnChanges({
        externalLink: new SimpleChange(null, component.externalLink, true),
        title: new SimpleChange(null, component.title, true),
      });

      fixture.detectChanges();
      const anchorElement = fixture.debugElement.query(By.css('.fudis-link__external'));

      expect(anchorElement.nativeElement.textContent).toEqual('My link');
    });
  });

  describe('External link component', () => {
    beforeEach(() => {
      component.externalLink = 'www.example.com';
      fixture.detectChanges();
    });

    it('should have default CSS classes', () => {
      const externalLinkElement = getElement(fixture, 'a');
      const externalLinkClasses = externalLinkElement.className;

      expect(externalLinkClasses).toContain(
        'fudis-link fudis-link__external fudis-link__size__inherit',
      );
    });

    it('should have new-tab icon', () => {
      const externalLinkComponent = fixture.debugElement.query(By.css('.fudis-link__external'));
      const iconExist = externalLinkComponent.query(By.css('fudis-icon'));

      expect(iconExist).toBeTruthy();
    });

    it('should have assistive aria-label for screen readers', () => {
      const externalLinkComponent = fixture.debugElement.query(By.css('.fudis-link__external'));

      expect(externalLinkComponent.nativeElement.getAttribute('aria-label')).toEqual(
        'www.example.com, (opens in a new tab)',
      );
    });
  });

  describe('Link with routerUrl component', () => {
    it('should have router link', () => {
      component.link = '/some/routerUrl';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toEqual(
        '/some/routerUrl',
      );
    });

    it('should have fragment link', () => {
      component.link = '/some/routerUrl';
      component.fragmentId = 'test-fragment-id';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toEqual(
        '/some/routerUrl#test-fragment-id',
      );
    });
  });

  describe('Link with initial focus', () => {
    it('should have focus after first load', () => {
      component.initialFocus = true;
      fixture.detectChanges();

      const linkElement = fixture.nativeElement.querySelector('a');
      expect(linkElement?.getAttribute('ng-reflect-initial-focus')).toEqual('true');
    });

    it('should NOT have focus after first load', () => {
      component.initialFocus = false;
      fixture.detectChanges();

      const linkElement = fixture.nativeElement.querySelector('a');
      expect(linkElement?.getAttribute('ng-reflect-initial-focus')).toEqual('false');
    });
  });
});
