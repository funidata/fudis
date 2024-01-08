import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from '../icon/icon.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { LinkComponent } from '../link/link.component';
import { NotificationComponent } from './notification.component';
import { FudisNotification } from '../../types/miscellaneous';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NotificationComponent,
        MockComponent(IconComponent),
        MockComponent(BodyTextComponent),
        LinkComponent,
      ],
    }).compileComponents();
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
});
