import { TestBed } from '@angular/core/testing';
import { FudisAlertService } from './alert.service';
import { FudisAlert, FudisAlertElement } from '../../types/miscellaneous';
import { BehaviorSubject } from 'rxjs';
import { FudisIdService } from '../id/id.service';

describe('FudisAlertService', () => {
  let service: FudisAlertService;

  const firstAlert: FudisAlert = {
    message: new BehaviorSubject<string>('First message'),
    type: 'danger',
    id: 'test-id-1',
  };

  const secondAlert: FudisAlert = {
    message: new BehaviorSubject<string>('Second message'),
    type: 'warning',
    id: 'test-id-2',
  };

  const firstAlertFromService: FudisAlertElement = {
    ...firstAlert,
    buttonId: 'fudis-alert-1-button',
    htmlId: 'fudis-alert-1',
    initialFocus: true,
  };

  const secondAlertFromService: FudisAlertElement = {
    ...secondAlert,
    buttonId: 'fudis-alert-2-button',
    htmlId: 'fudis-alert-2',
    initialFocus: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FudisAlertService, FudisIdService],
    });
    service = TestBed.inject(FudisAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array initially', () => {
    const alerts = service.alerts.getValue();

    expect(alerts).toEqual([]);
  });

  it('should return two alerts after adding two', () => {
    service.addAlert(firstAlert);
    service.addAlert(secondAlert);

    const alerts = service.alerts.getValue();

    expect(alerts).toEqual([firstAlertFromService, secondAlertFromService]);
  });

  it('should return second alert after dismissing first by id', () => {
    service.addAlert(firstAlert);
    service.addAlert(secondAlert);

    service.dismissAlert('test-id-1');

    const alerts = service.alerts.getValue();

    expect(alerts).toEqual([secondAlertFromService]);
  });

  it('should return empty array after dismissing all', () => {
    service.addAlert(firstAlert);
    service.addAlert(secondAlert);

    service.dismissAll();

    const alerts = service.alerts.getValue();

    expect(alerts).toEqual([]);
  });

  it('should return only second alert after first one is dismissed by button', () => {
    service.addAlert(firstAlert);
    service.addAlert(secondAlert);

    service.dismissAlertFromButton('fudis-alert-1-button');

    const alerts = service.alerts.getValue();

    expect(alerts).toEqual([secondAlertFromService]);
  });

  it('should update initialFocus status of second alert', () => {
    service.addAlert(firstAlert);
    service.addAlert(secondAlert);

    service.updateAlertLinkFocusState('fudis-alert-2');

    const alerts = service.alerts.getValue();

    expect(alerts[1].initialFocus).toEqual(false);
  });
});
