import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '../icon/icon.component';
import { NotificationComponent } from './notification.component';
import { FudisNotification } from '../../types/miscellaneous';
import { getElement } from '../../utilities/tests/utilities';
import { RouterModule } from '@angular/router';
import { LinkDirective } from '../../directives/link/link.directive';

describe('NotificationComponent', () => {
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationComponent, IconComponent, LinkDirective],
      imports: [RouterModule.forRoot([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    fixture.detectChanges();
  });

  function assertNotificationHasClasses(classes: string): void {
    const childSpan = fixture.nativeElement.childNodes;
    const componentClasses = childSpan[0].className.split(' ').sort();

    expect(componentClasses).toEqual(classes.split(' ').sort());
  }

  function notificationIconCheck(variant: FudisNotification): void {
    fixture.componentRef.setInput('variant', variant);

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

    const iconVariant = getElement(fixture, 'fudis-icon svg').getAttribute('id');
    expect(iconVariant).toEqual(icon);
  }

  function notificationVariants(variant: FudisNotification): void {
    fixture.componentRef.setInput('variant', variant);

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
});
