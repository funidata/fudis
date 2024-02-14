import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { DialogComponent } from './dialog.component';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import { AlertGroupComponent } from '../alert/alert-group/alert-group.component';
import { getElement } from '../../utilities/tests/utilities';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogService: FudisDialogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent, AlertGroupComponent, MockComponent(ButtonComponent)],
      imports: [MatDialogModule],
      providers: [FudisDialogService],
    }).compileComponents();

    dialogService = TestBed.inject(FudisDialogService);

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML attributes', () => {
    it('should have CSS classes according to given size Input', () => {
      const dialogEl = getElement(fixture, '.fudis-dialog');
      component.ngOnInit();

      expect(component.size).toEqual('md');
      expect(dialogEl.className).toEqual('fudis-dialog fudis-dialog__size__md');

      component.size = 'sm';
      fixture.detectChanges();
      component.ngOnInit();

      expect(dialogEl.className).toEqual('fudis-dialog fudis-dialog__size__sm');

      component.size = 'lg';
      fixture.detectChanges();
      component.ngOnInit();

      expect(dialogEl.className).toEqual('fudis-dialog fudis-dialog__size__lg');

      component.size = 'xl';
      fixture.detectChanges();
      component.ngOnInit();

      expect(dialogEl.className).toEqual('fudis-dialog fudis-dialog__size__xl');

      component.size = 'initial';
      fixture.detectChanges();
      component.ngOnInit();

      expect(dialogEl.className).toEqual('fudis-dialog fudis-dialog__size__initial');
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
    component.ngOnInit();

    expect(dialogSpy).toHaveBeenCalledWith(true);
  });

  it('should call open signal on destroy', () => {
    const dialogSpy = jest.spyOn(dialogService, 'setDialogOpenSignal');
    component.ngOnDestroy();

    expect(dialogSpy).toHaveBeenCalledWith(false);
  });

  // TODO: add tests for Alert Group inside Dialog
});
