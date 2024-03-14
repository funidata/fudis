import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from '../icon/icon.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { LinkComponent } from '../link/link.component';
import { NotificationComponent } from './notification.component';
import { FudisNotification } from '../../types/miscellaneous';
import { getElement, getTrimmedTextContent } from '../../utilities/tests/utilities';
import { RouterModule } from '@angular/router';
import { LinkDirective } from '../../directives/link/link.directive';
import { ChangeDetectionStrategy } from '@angular/core';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NotificationComponent,
        IconComponent,
        MockComponent(BodyTextComponent),
        LinkComponent,
        LinkDirective,
      ],
      imports: [RouterModule.forRoot([])],
    })
      .overrideComponent(NotificationComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function assertNotificationHasClasses(classes: string): void {
    const childSpan = fixture.nativeElement.childNodes;
    const componentClasses = childSpan[0].className.split(' ').sort();

    expect(componentClasses).toEqual(classes.split(' ').sort());
  }

  function notificationIconCheck(variant: FudisNotification): void {
    component.variant = variant;
    component.ngOnChanges();
    fixture.detectChanges();

    let icon: string = '';

    switch (variant) {
      case 'warning':
        icon = 'exclamation-mark-circle';
        break;
      case 'danger':
        icon = 'alert';
        break;
      case 'success':
        icon = 'checkmark-circle';
        break;
      case 'info':
        icon = 'info-circle';
        break;
      default:
        break;
    }

    const iconElement = getElement(fixture, 'fudis-icon');
    const iconHref = iconElement.querySelector('use')?.getAttribute('href');

    expect(component.icon).toEqual(icon);
    expect(iconHref).toEqual(`${icon}.svg#${icon}`);
  }

  function notificationVariants(variant: FudisNotification): void {
    component.variant = variant;
    fixture.detectChanges();
    assertNotificationHasClasses(`fudis-notification fudis-notification__${variant}`);
  }

  describe('CSS classes', () => {
    it('should change the class according to the given notification variant', () => {
      notificationVariants('danger');
      notificationVariants('warning');
      notificationVariants('success');
      notificationVariants('info');
    });
  });

  describe('Icons', () => {
    it('should have respective icon in each Notification variants', () => {
      notificationIconCheck('warning');
      notificationIconCheck('danger');
      notificationIconCheck('success');
      notificationIconCheck('info');
    });
  });

  describe('Link inside Notification', () => {
    beforeEach(() => {
      component.link = ['/test-url'];
      fixture.detectChanges();
    });
    it('should have default CSS class', () => {
      const linkElement = getElement(fixture, 'fudis-link');

      expect(linkElement).toBeTruthy();
      expect(linkElement.className).toContain('fudis-notification__link');
    });

    it('should have router link element', () => {
      const anchorElement = getElement(fixture, 'a');

      expect(anchorElement).toBeTruthy();
      expect(anchorElement.getAttribute('href')).toEqual('/test-url');
    });

    it('should replace router link with linkTitle if given', () => {
      component.linkTitle = 'New link title';
      fixture.detectChanges();

      const anchorElement = getElement(fixture, 'a');

      expect(getTrimmedTextContent(anchorElement)).toEqual('New link title');
    });

    it('should replace router link with external link', () => {
      component.externalLink = 'www.example.com';
      fixture.detectChanges();

      const anchorElement = getElement(fixture, 'a');

      expect(anchorElement.getAttribute('href')).toEqual('www.example.com');
      expect(anchorElement.getAttribute('aria-label')).toEqual(
        'www.example.com, (opens in a new tab)',
      );
    });
  });
});
