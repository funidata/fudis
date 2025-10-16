import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { DialogComponent } from './dialog.component';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { AlertGroupComponent } from '../alert/alert-group/alert-group.component';
import { getElement } from '../../utilities/tests/utilities';
import { fudisDialogSizeArray } from '../../types/miscellaneous';
import { FudisAlertService } from '../../services/alert/alert.service';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { IconComponent } from '../icon/icon.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogService: FudisDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent, AlertGroupComponent, ButtonComponent, IconButtonComponent, IconComponent],
      imports: [MatDialogModule],
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

      const closeButtonEl = getElement(fixture, '.fudis-dialog fudis-icon-button.fudis-dialog__close');
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
});
