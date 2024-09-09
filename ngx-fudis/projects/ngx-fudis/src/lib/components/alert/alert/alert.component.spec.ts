import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MockComponent } from 'ng-mocks';
import { getElement, sortClasses } from '../../../utilities/tests/utilities';
import { AlertComponent } from './alert.component';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { IconComponent } from '../../icon/icon.component';
import { LinkComponent } from '../../link/link.component';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { fudisNotificationVariantArray } from '../../../types/miscellaneous';
import { AlertGroupComponent } from '../alert-group/alert-group.component';
import { ButtonComponent } from '../../button/button.component';
import { RouterModule } from '@angular/router';
import { LinkDirective } from '../../../directives/link/link.directive';
import { BehaviorSubject } from 'rxjs';

const testMessage = new BehaviorSubject<string>('Test message for alert');
const testHtmlId = 'test-html-id';
const testButtonId = 'test-button-id';
const testLinkTitle = 'Test link title';
const testRouterLinkUrl = '/test/alert/url';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService: FudisAlertService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AlertComponent,
        AlertGroupComponent,
        BodyTextComponent,
        ButtonComponent,
        LinkComponent,
        LinkDirective,
        MockComponent(IconComponent),
      ],
      imports: [MatDialogModule, RouterModule.forRoot([])],
      providers: [
        FudisDialogService,
        FudisAlertService,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [],
        },
      ],
    });
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.buttonId = testButtonId;
    component.htmlId = testHtmlId;
    component.message = testMessage;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should create alert with basic inputs', () => {
      fixture.detectChanges();

      const element = getElement(fixture, '.fudis-alert');

      // Test @Input() htmlId
      expect(element.getAttribute('id')).toEqual(testHtmlId);

      // Test @Input() buttonId
      expect(element.querySelector('button')?.getAttribute('id')).toEqual(testButtonId);

      // Test @Input() message
      expect(element.querySelector('button')?.getAttribute('aria-label')).toEqual(
        String(testMessage.value) + ', Close',
      );

      // Test @Input() message
      expect(element.querySelector('p')?.textContent).toContain(String(testMessage.value));

      // Test that link does not exist by default
      expect(element.querySelector('fudis-link')).toBeFalsy();
    });

    it('should create alert with a link', () => {
      component.linkTitle = testLinkTitle;
      component.link = testRouterLinkUrl;
      component.initialFocus = true;

      fixture.detectChanges();

      const linkElement = getElement(fixture, '.fudis-alert p fudis-link');
      const anchorElement = linkElement.querySelector('a');

      // Test that inputs forwarded to Fudis Link are correct
      expect(linkElement).toBeTruthy();

      expect(sortClasses(linkElement.className)).toEqual(['fudis-alert__link']);

      expect(linkElement?.getAttribute('aria-label')).toEqual(String(testMessage.value));

      expect(linkElement?.getAttribute('ng-reflect-initial-focus')).toEqual('true');

      expect(anchorElement?.getAttribute('ng-reflect-router-link')).toEqual(testRouterLinkUrl);

      expect(anchorElement?.getAttribute('href')).toEqual(testRouterLinkUrl);

      expect(linkElement?.getAttribute('ng-reflect-title')).toEqual(testLinkTitle);
    });
  });

  describe('CSS classes and HTML role', () => {
    it('should create alert variations with proper variant classes', () => {
      const alert = getElement(fixture, '.fudis-alert');

      fudisNotificationVariantArray.forEach((variant) => {
        fixture.componentRef.setInput('variant', `${variant}`);
        fixture.detectChanges();

        expect(sortClasses(alert.className)).toEqual(
          sortClasses(`fudis-alert fudis-alert__${variant}`),
        );
      });
    });

    it('should have assigned to correct role depending on the variant', () => {
      const alertText = getElement(fixture, '.fudis-alert__text');

      fudisNotificationVariantArray.forEach((variant) => {
        fixture.componentRef.setInput('variant', `${variant}`);
        fixture.detectChanges();

        if (variant === 'info' || variant === 'success') {
          expect(alertText.getAttribute('role')).toEqual('status');
        } else {
          expect(alertText.getAttribute('role')).toEqual('alert');
        }
      });
    });
  });

  describe('Close button interaction', () => {
    beforeEach(() => {
      alertService = TestBed.inject(FudisAlertService);
      jest.spyOn(alertService, 'dismissAlertFromButton').mockImplementation();
      fixture.detectChanges();
    });

    it('should emit events when the close button is clicked', () => {
      let clicked = false;

      component.handleClose.subscribe(() => {
        clicked = true;
      });

      fixture.detectChanges();

      const closeButton = getElement(fixture, '.fudis-alert .fudis-alert__close');
      closeButton.click();

      expect(clicked).toEqual(true);

      expect(alertService.dismissAlertFromButton).toHaveBeenCalledWith(testButtonId);
    });
  });
});
