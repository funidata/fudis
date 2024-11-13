import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef, SimpleChange, ViewChild } from '@angular/core';
import { LinkDirective } from './link.directive';
import { IconComponent } from '../../components/icon/icon.component';
import { getElement, sortClasses } from '../../utilities/tests/utilities';
import { FudisFocusService } from '../../services/focus/focus.service';
import { FudisIdService } from '../../services/id/id.service';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'fudis-mock-link-directive',
  template: `<a
      *ngIf="!linkWithInitialFocus"
      fudisLink
      #linkRefOne
      href=""
      class="test-link-element"
      (focus)="handleFocus()"
      [title]="title"
    ></a>
    <a
      *ngIf="linkWithInitialFocus"
      fudisLink
      class="test-link-element"
      href=""
      (focus)="handleFocus()"
      [initialFocus]="true"
      [title]="title"
    ></a>`,
})
class MockComponent {
  @ViewChild('linkRefOne') public linkRefOne: ElementRef<HTMLAnchorElement>;
  @ViewChild(LinkDirective) public dirRef: LinkDirective;

  title = 'Test title for the link';

  linkWithInitialFocus = false;

  focused = false;

  handleFocus(): void {
    this.focused = true;
  }
}

describe('LinkDirective', () => {
  let component: MockComponent;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent, LinkDirective, IconComponent],
      providers: [FudisFocusService, FudisIdService, FudisTranslationService],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const defaultTitle = 'Test title for the link';
  const longChangedTitle = 'A new surprise title for the link!';
  const singleWordTitle = 'Supercalifragilisticexpialidocious';

  const changeTitle = (
    title: typeof defaultTitle | typeof longChangedTitle | typeof singleWordTitle,
    firstChange = false,
  ) => {
    const previousValue = component.dirRef.title;

    component.dirRef.title = title;

    component.dirRef.ngOnChanges({
      title: new SimpleChange(previousValue, title, firstChange),
    });

    fixture.detectChanges();
  };

  const changeExternal = (external: boolean, firstChange = false, title = defaultTitle) => {
    const previousValue = component.dirRef.external;

    component.dirRef.external = external;

    component.dirRef.ngOnChanges({
      external: new SimpleChange(previousValue, external, firstChange),
    });

    fixture.detectChanges();

    const linkElement = getElement(fixture, '.fudis-link');

    if (external) {
      expect(linkElement.innerHTML).not.toEqual(title);
    } else {
      expect(linkElement.innerHTML).toEqual(title);
    }
  };

  const externalTitleUpdatedCorrectlty = (
    title: typeof defaultTitle | typeof longChangedTitle | typeof singleWordTitle,
  ) => {
    const linkElement = getElement(fixture, '.fudis-link');
    const innerContainer = getElement(fixture, '.fudis-link__external__icon-wrapper');

    const parsedDefault = ['Test title for the', 'link'];
    const parsedLong = ['A new surprise title for the', 'link!'];

    const firstMatch =
      title === defaultTitle
        ? parsedDefault[0]
        : title === longChangedTitle
          ? parsedLong[0]
          : singleWordTitle;

    const secondMatch =
      title === defaultTitle
        ? parsedDefault[1]
        : title === longChangedTitle
          ? parsedLong[1]
          : singleWordTitle;

    expect(linkElement.childNodes[0].textContent?.trim()).toEqual(firstMatch);
    expect(innerContainer.textContent?.trim()).toEqual(secondMatch);
    expect(linkElement.getAttribute('aria-label')).toEqual(`${title}, (opens in a new tab)`);
  };

  describe('Initial focus', () => {
    it('should not be triggered by default', () => {
      expect(component.dirRef.initialFocus).toBeFalsy();
      expect(component.focused).toBeFalsy();
    });
    it('should be trigggered on init', () => {
      // Reset the component
      fixture = TestBed.createComponent(MockComponent);
      component = fixture.componentInstance;
      component.linkWithInitialFocus = true;
      fixture.detectChanges();
      expect(component.dirRef.initialFocus).toBeTruthy();
      expect(component.focused).toBeTruthy();
    });
  });

  describe('CSS classes', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default CSS classes', () => {
      const currentClasses = sortClasses(component.linkRefOne.nativeElement.className);

      const toEqual = sortClasses('fudis-link fudis-link__size__inherit test-link-element');

      expect(currentClasses).toEqual(toEqual);
    });

    it('should have correct CSS size classes', () => {
      const sizes: ('inherit' | 'md' | 'lg')[] = ['md', 'lg', 'inherit'];

      sizes.forEach((size, index) => {
        const previousSize = component.dirRef.size;

        component.dirRef.size = size;

        component.dirRef.ngOnChanges({
          size: new SimpleChange(previousSize, size, index !== 0 ? false : true),
        });

        fixture.detectChanges();

        const element = getElement(fixture, '.fudis-link') as HTMLAnchorElement;

        const currentClasses = sortClasses(element.className);

        const toEqual = sortClasses(`fudis-link fudis-link__size__${size} test-link-element`);

        expect(currentClasses).toEqual(toEqual);
      });
    });
  });

  describe('As a non-external link', () => {
    it('should not have Icon component', () => {
      const icon = getElement(fixture, 'svg');

      expect(icon).toBeNull();
    });

    it('should have only text as inner html', () => {
      const linkElement = getElement(fixture, '.fudis-link');

      expect(linkElement.innerHTML).toEqual(defaultTitle);

      changeExternal(true, true);

      changeExternal(false);
    });

    it('should have proper HTML attribute values', () => {
      const linkElement = getElement(fixture, '.fudis-link');

      let id = linkElement.getAttribute('id');
      let rel = linkElement.getAttribute('rel');
      let ariaLabel = linkElement.getAttribute('aria-label');

      expect(id).toEqual('fudis-link-1');
      expect(rel).toEqual(null);
      expect(ariaLabel).toEqual(defaultTitle);

      changeExternal(true, true);
      changeExternal(false);

      const toggledLinkElement = getElement(fixture, '.fudis-link');

      id = toggledLinkElement.getAttribute('id');
      rel = toggledLinkElement.getAttribute('rel');
      ariaLabel = toggledLinkElement.getAttribute('aria-label');

      expect(id).toEqual('fudis-link-1');
      expect(rel).toEqual(null);
      expect(ariaLabel).toEqual(defaultTitle);
    });

    it('should have changed title and aria-label', () => {
      changeTitle(longChangedTitle);

      let linkElement = getElement(fixture, '.fudis-link');

      expect(linkElement.innerHTML).toEqual(longChangedTitle);
      expect(linkElement.getAttribute('aria-label')).toEqual(longChangedTitle);

      changeExternal(true, true, longChangedTitle);
      changeExternal(false, true, longChangedTitle);

      linkElement = getElement(fixture, '.fudis-link');

      expect(linkElement.innerHTML).toEqual(longChangedTitle);
      expect(linkElement.getAttribute('aria-label')).toEqual(longChangedTitle);

      changeTitle(singleWordTitle);

      linkElement = getElement(fixture, '.fudis-link');

      expect(linkElement.innerHTML).toEqual(singleWordTitle);
      expect(linkElement.getAttribute('aria-label')).toEqual(singleWordTitle);
    });
  });
  describe('As an external link', () => {
    beforeEach(() => {
      changeExternal(true, true);
    });

    it('should have Icon component', () => {
      const icon = getElement(fixture, 'svg');

      expect(icon).toBeTruthy();
    });

    it('should have correct HTML attributes', () => {
      const linkElement = getElement(fixture, '.fudis-link');

      let id = linkElement.getAttribute('id');
      let rel = linkElement.getAttribute('rel');
      let ariaLabel = linkElement.getAttribute('aria-label');

      expect(id).toEqual('fudis-link-1');
      expect(rel).toEqual('noopener noreferrer');
      expect(ariaLabel).toEqual(`${defaultTitle}, (opens in a new tab)`);

      changeExternal(false);
      changeExternal(true);

      const toggledLinkElement = getElement(fixture, '.fudis-link');

      id = toggledLinkElement.getAttribute('id');
      rel = toggledLinkElement.getAttribute('rel');
      ariaLabel = toggledLinkElement.getAttribute('aria-label');

      expect(id).toEqual('fudis-link-1');
      expect(rel).toEqual('noopener noreferrer');
      expect(ariaLabel).toEqual(`${defaultTitle}, (opens in a new tab)`);
    });

    it('should have update title and aria-label', () => {
      changeTitle(longChangedTitle);

      externalTitleUpdatedCorrectlty(longChangedTitle);

      changeExternal(false, true, longChangedTitle);
      changeExternal(true, false, longChangedTitle);

      externalTitleUpdatedCorrectlty(longChangedTitle);

      changeTitle(defaultTitle);

      externalTitleUpdatedCorrectlty(defaultTitle);
    });

    it('should update short title and aria-label', () => {
      changeTitle(singleWordTitle);

      externalTitleUpdatedCorrectlty(singleWordTitle);

      changeExternal(false, true, singleWordTitle);
      changeExternal(true, false, singleWordTitle);

      externalTitleUpdatedCorrectlty(singleWordTitle);

      changeTitle(defaultTitle);

      externalTitleUpdatedCorrectlty(defaultTitle);

      changeTitle(singleWordTitle);

      externalTitleUpdatedCorrectlty(singleWordTitle);
    });
  });
});
