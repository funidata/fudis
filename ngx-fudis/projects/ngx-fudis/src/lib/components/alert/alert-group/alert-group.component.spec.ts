import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MockComponent } from 'ng-mocks';
import { AlertGroupComponent } from './alert-group.component';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { FudisAlert, fudisAlertPositionArray } from '../../../types/miscellaneous';
import { AlertComponent } from '../alert/alert.component';
import { IconComponent } from '../../icon/icon.component';
import { getElement, sortClasses } from '../../../utilities/tests/utilities';
import { BehaviorSubject } from 'rxjs';

describe('AlertGroupComponent', () => {
  let component: AlertGroupComponent;
  let fixture: ComponentFixture<AlertGroupComponent>;
  let alertService: FudisAlertService;
  let dialogService: FudisDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [
        AlertGroupComponent,
        AlertComponent,
        BodyTextComponent,
        MockComponent(IconComponent),
      ],
      providers: [
        FudisDialogService,
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: [],
        },
      ],
    }).compileComponents();

    alertService = TestBed.inject(FudisAlertService);
    dialogService = TestBed.inject(FudisDialogService);
    fixture = TestBed.createComponent(AlertGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic inputs', () => {
    it('should update CSS class according to position input', () => {
      fudisAlertPositionArray.forEach((position) => {
        const element = getElement(fixture, '.fudis-alert-group');
        fixture.componentRef.setInput('position', `${position}`);
        fixture.detectChanges();

        expect(sortClasses(element.className)).toEqual(
          sortClasses(`fudis-alert-group fudis-alert-group__${position}`),
        );
      });
    });
  });

  describe('Functionality with services', () => {
    beforeEach(() => {
      const firstAlert: FudisAlert = {
        message: new BehaviorSubject<string>('Test message'),
        id: 'my-test-id-1',
        type: 'info',
      };

      const secondAlert: FudisAlert = {
        message: new BehaviorSubject<string>('Second test message'),
        id: 'my-test-id-2',
        type: 'warning',
      };

      alertService.addAlert(firstAlert);
      alertService.addAlert(secondAlert);
    });

    it('should have two alerts as children', () => {
      fixture.detectChanges();

      const childAlerts = fixture.nativeElement.querySelectorAll('fudis-alert');

      expect(childAlerts.length).toEqual(2);
    });

    it('should have one alert as child after one is dismissed', () => {
      alertService.dismissAlert('my-test-id-1');
      fixture.detectChanges();

      const childAlerts = fixture.nativeElement.querySelectorAll('fudis-alert');

      expect(childAlerts.length).toEqual(1);

      expect(childAlerts[0].getAttribute('id')).toEqual('my-test-id-2');
    });

    it('should not be visible, if Dialog is open', () => {
      dialogService.setDialogOpenStatus(true);

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('section')).toBeNull();
      expect(component.getVisibleStatus()).toEqual(false);
    });

    it('should be visible, if Dialog is closed', () => {
      dialogService.setDialogOpenStatus(false);

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('section')).toBeDefined();
      expect(component.getVisibleStatus()).toEqual(true);
    });

    // TODO: Fix this
    // it('should not be visible, if Dialog is not open and Alert Group is inside dialog', () => {
    //   dialogService.setDialogOpenStatus(false);

    //   component.insideDialog = true;

    //   fixture.autoDetectChanges();

    //   expect(fixture.nativeElement.querySelector('section')).toBeNull();
    //   expect(component.getVisibleStatus()).toEqual(false);
    // });
  });
});
