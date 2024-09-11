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
import { FudisAlert, fudisNotificationVariantArray } from '../../../types/miscellaneous';
import { AlertGroupComponent } from '../alert-group/alert-group.component';
import { ButtonComponent } from '../../button/button.component';
import { RouterModule } from '@angular/router';
import { LinkDirective } from '../../../directives/link/link.directive';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FudisFocusService } from '../../../services/focus/focus.service';

const testMessage = new BehaviorSubject<string>('Test message for alert');
const testHtmlId = 'test-html-id';
const testButtonId = 'test-button-id';

@Component({
  selector: 'fudis-mock-component',
  template: `<div class="mock-container">
    <fudis-alert-group />
    <fudis-button [label]="'Test button'" />
  </div>`,
})
class MockAlertComponent implements OnInit {
  constructor(
    private _alertService: FudisAlertService,
    private _cdRef: ChangeDetectorRef,
  ) {
    const firstAlert: FudisAlert = {
      message: new BehaviorSubject('Test message'),
      id: 'my-test-id-1',
      type: 'info',
    };

    _alertService.addAlert(firstAlert);

    const secondAlert: FudisAlert = {
      message: new BehaviorSubject('Second test message'),
      id: 'my-test-id-2',
      type: 'warning',
    };
    this._alertService.addAlert(secondAlert);
  }

  ngOnInit(): void {
    this._cdRef.detectChanges();
  }
}

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let mockComponent: MockAlertComponent;
  let mockFixture: ComponentFixture<MockAlertComponent>;
  let alertService: FudisAlertService;
  let focusService: FudisFocusService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AlertComponent,
        AlertGroupComponent,
        BodyTextComponent,
        ButtonComponent,
        LinkComponent,
        LinkDirective,
        MockAlertComponent,
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
    mockFixture = TestBed.createComponent(MockAlertComponent);
    mockComponent = mockFixture.componentInstance;
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
      fixture.whenStable().finally(() => {
        const element = getElement(fixture, '.fudis-alert');

        // Test @Input() message
        expect(element.querySelector('button')?.getAttribute('aria-label')).toEqual(
          String(testMessage.value) + ', Close',
        );

        // Test @Input() htmlId
        expect(element.getAttribute('id')).toEqual(testHtmlId);

        // Test @Input() buttonId
        expect(element.querySelector('button')?.getAttribute('id')).toEqual(testButtonId);

        // Test @Input() message
        expect(element.querySelector('p')?.textContent).toContain(String(testMessage.value));

        // Test that link does not exist by default
        expect(element.querySelector('fudis-link')).toBeFalsy();
      });
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

  describe('Focus and blur events', () => {
    beforeEach(() => {
      focusService = TestBed.inject(FudisFocusService);
      jest.spyOn(focusService, 'setFocusTarget').mockImplementation();
      jest.spyOn(focusService, 'getFocusTarget').mockImplementation();

      alertService = TestBed.inject(FudisAlertService);
      jest.spyOn(alertService, 'addAlert').mockImplementation(() => {});
      jest.spyOn(alertService, 'updateAlertLinkFocusState').mockImplementation();

      mockFixture.detectChanges();
    });

    it('should create mock', () => {
      expect(mockComponent).toBeTruthy();
    });

    it('should emit info to focusService when focusing on closeButton', () => {
      const button = getElement(mockFixture, '.fudis-button');
      button.focus();

      const closeButton = getElement(mockFixture, '.fudis-alert .fudis-alert__close');
      closeButton.focus();

      expect(focusService.setFocusTarget).toHaveBeenCalledWith(button);
    });

    it('should set focus to close button, if another close is clicked', () => {
      const firstClose = getElement(mockFixture, '#fudis-alert-1 .fudis-alert__close');
      const secondClose = getElement(mockFixture, '#fudis-alert-2 .fudis-alert__close');

      jest.spyOn(secondClose, 'focus').mockImplementation(() => {});

      firstClose.focus();
      firstClose.click();

      expect(secondClose.focus).toHaveBeenCalledWith();
    });

    it('should call getFocusTarget, when all alerts are closed', () => {
      const uiButton = getElement(mockFixture, '.fudis-button');
      uiButton.focus();

      const firstClose = getElement(mockFixture, '#fudis-alert-1 .fudis-alert__close');
      const secondClose = getElement(mockFixture, '#fudis-alert-2 .fudis-alert__close');

      firstClose.click();
      secondClose.click();

      expect(focusService.getFocusTarget).toHaveBeenCalledWith();
    });

    it('should not call getFocusTarget, if only one is closed', () => {
      const uiButton = getElement(mockFixture, '.fudis-button');
      uiButton.focus();

      const firstClose = getElement(mockFixture, '#fudis-alert-1 .fudis-alert__close');
      firstClose.click();

      expect(focusService.getFocusTarget).not.toHaveBeenCalledWith();
    });
  });
});
