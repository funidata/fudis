import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { getElement } from '../../utilities/tests/utilities';
import { fudisDialogSizeArray } from '../../types/miscellaneous';
import { FudisAlertService } from '../../services/alert/alert.service';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogService: FudisDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [
        FudisDialogService,
        FudisAlertService,
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    dialogService = TestBed.inject(FudisDialogService);

    initDialogComponent();
  });

  const initDialogComponent = () => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML attributes', () => {
    it('should have CSS classes according to given size Input', () => {
      const dialogEl = getElement(fixture, '.fudis-dialog');

      expect(component.size).toEqual('md');
      expect(dialogEl.className).toEqual('fudis-dialog fudis-dialog__size__md');

      fudisDialogSizeArray.forEach((size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        expect(dialogEl.className).toEqual(`fudis-dialog fudis-dialog__size__${size}`);
      });
    });

    it('should have CSS class for close button', async () => {
      fixture.componentRef.instance.closeButtonPositionAbsolute.set(true);

      fixture.detectChanges();

      const closeButtonEl = getElement(
        fixture,
        '.fudis-dialog fudis-icon-button.fudis-dialog__close',
      );
      expect(closeButtonEl.className).toEqual(
        'fudis-dialog__close fudis-icon-button-host fudis-dialog__close__absolute',
      );
    });
  });

  it('should call open signal on initialisation', () => {
    const dialogSpy = jest.spyOn(dialogService, 'setDialogOpenStatus');
    initDialogComponent();
    expect(dialogSpy).toHaveBeenCalledWith(true);
  });

  it('should call open signal on destroy', () => {
    const dialogSpy = jest.spyOn(dialogService, 'setDialogOpenStatus');
    initDialogComponent();
    component.ngOnDestroy();

    expect(dialogSpy).toHaveBeenCalledWith(false);
  });

  describe('_handleEscapePress', () => {
    it('should not close dialog if hasJustClosedDropdownWithEscape returns true', () => {
      // Arrange
      const hasJustClosedSpy = jest
        .spyOn(dialogService, 'hasJustClosedDropdownWithEscape')
        .mockReturnValue(true);
      const closeSpy = jest.spyOn(dialogService, 'close');
      component['_orderNumber'] = dialogService.dialogsOpen().length;

      // Act
      const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape' });
      component['_handleEscapePress'](escapeEvent);

      // Assert
      expect(hasJustClosedSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledTimes(0);
    });

    it('should close dialog if hasJustClosedDropdownWithEscape returns false', () => {
      //Arrange
      const hasJustClosedSpy = jest
        .spyOn(dialogService, 'hasJustClosedDropdownWithEscape')
        .mockReturnValue(false);
      const closeSpy = jest.spyOn(dialogService, 'close');
      component['_orderNumber'] = dialogService.dialogsOpen().length;

      // Act
      const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape' });
      component['_handleEscapePress'](escapeEvent);

      // Assert
      expect(hasJustClosedSpy).toHaveBeenCalledTimes(1);
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
