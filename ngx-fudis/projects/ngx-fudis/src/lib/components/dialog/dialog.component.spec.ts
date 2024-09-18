import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { DialogComponent } from './dialog.component';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { AlertGroupComponent } from '../alert/alert-group/alert-group.component';
import { getElement, sortClasses } from '../../utilities/tests/utilities';
import { fudisDialogSizeArray } from '../../types/miscellaneous';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogService: FudisDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent, AlertGroupComponent, MockComponent(ButtonComponent)],
      imports: [MatDialogModule],
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
        component.size = size;
        fixture.detectChanges();

        expect(dialogEl.className).toEqual(`fudis-dialog fudis-dialog__size__${size}`);
      });
    });

    it('should have CSS class for close button', () => {
      component.closeButtonPositionAbsolute = true;
      fixture.detectChanges();

      const closeButtonEl = getElement(fixture, '.fudis-dialog fudis-button');

      expect(closeButtonEl.className).toEqual('fudis-dialog__close fudis-dialog__close__absolute');
    });
  });

  it('should call open signal on initialisation', () => {
    const dialogSpy = jest.spyOn(dialogService, 'setDialogOpenSignal');
    initDialogComponent();
    expect(dialogSpy).toHaveBeenCalledWith(true);
  });

  it('should call open signal on destroy', () => {
    const dialogSpy = jest.spyOn(dialogService, 'setDialogOpenSignal');
    initDialogComponent();
    component.ngOnDestroy();

    expect(dialogSpy).toHaveBeenCalledWith(false);
  });
});
