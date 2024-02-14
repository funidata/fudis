import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: LinkComponent;
  let fixture: ComponentFixture<LinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkComponent, MockComponent(IconComponent)],
      imports: [RouterModule.forRoot([])],
    })
      .overrideComponent(LinkComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Regular link component', () => {
    it('should render linkTitle if it is given', () => {
      component.href = 'www.example.com';
      component.linkTitle = 'My link';
      fixture.detectChanges();
      const anchorElement = fixture.debugElement.query(By.css('.fudis-link__anchor'));

      expect(anchorElement.nativeNode.innerHTML).toEqual(' My link ');
    });

    // TODO: Remove skip.
    it.skip('should always have href', () => {
      component.href = '';
      fixture.detectChanges();

      // FIXME: In jasmine, `.not.toBeTrue()` matches for strict boolean equality. This is probably not what was supposed to be tested here.
      // expect(component).not.toBeTrue();
    });
  });

  describe('External link component', () => {
    it('should have new-tab icon', () => {
      component.external = true;
      fixture.detectChanges();
      const externalLinkComponent = fixture.debugElement.query(
        By.css('.fudis-link__anchor__external'),
      );
      const iconExist = externalLinkComponent.query(By.css('fudis-icon'));

      expect(iconExist).toBeTruthy();
    });

    it('should have assistive aria-label for screen readers', () => {
      component.href = 'www.example.com';
      component.external = true;
      fixture.detectChanges();
      const externalLinkComponent = fixture.debugElement.query(
        By.css('.fudis-link__anchor__external'),
      );

      expect(externalLinkComponent.nativeElement.getAttribute('aria-label')).toEqual(
        'www.example.com, (opens in a new tab)',
      );
    });
  });

  describe('Link with routerUrl component', () => {
    it('should have router link', () => {
      component.routerLinkUrl = '/some/routerUrl';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toEqual(
        '/some/routerUrl',
      );
    });

    it('should have fragment link', () => {
      component.routerLinkUrl = '/some/routerUrl';
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

      jest.spyOn(linkElement, 'focus').mockImplementation(() => {});

      component.ngAfterViewInit();

      expect(linkElement.focus).toHaveBeenCalledWith();
    });

    it('should NOT have focus after first load', () => {
      component.initialFocus = false;
      fixture.detectChanges();

      const linkElement = fixture.nativeElement.querySelector('a');

      jest.spyOn(linkElement, 'focus').mockImplementation(() => {});

      component.ngAfterViewInit();

      expect(linkElement.focus).not.toHaveBeenCalledWith();
    });
  });
});
