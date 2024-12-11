import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Inject } from '@angular/core';
import { FudisDialogService } from './dialog.service';
import { BodyTextComponent } from '../../components/typography/body-text/body-text.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { HeadingComponent } from '../../components/typography/heading/heading.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  DialogActionsDirective,
  DialogCloseDirective,
  DialogContentDirective,
} from '../../components/dialog/dialog-directives';
import { AlertGroupComponent } from '../../components/alert/alert-group/alert-group.component';
import { IconComponent } from '../../components/icon/icon.component';
import { FudisAlertService } from '../alert/alert.service';

@Component({
  selector: 'fudis-dialog-test-content',
  template: `
    <fudis-dialog [size]="'lg'">
      <fudis-heading fudisDialogTitle [level]="2">Dialog Heading</fudis-heading>
      <fudis-dialog-content>
        <fudis-heading [level]="3" [variant]="'sm'">Content heading</fudis-heading>
        <fudis-body-text>{{ greetingFromOpeningComponent }}</fudis-body-text>
      </fudis-dialog-content>
      <fudis-dialog-actions>
        <fudis-button
          (handleClick)="closeTestDialog()"
          [label]="'Close this dialog'"
        ></fudis-button>
        <fudis-button
          (handleClick)="closeAllOpenDialogs()"
          [label]="'Close all open dialogs'"
        ></fudis-button>
      </fudis-dialog-actions>
    </fudis-dialog>
  `,
})
class DialogTestContentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { greeting: string },
    public dialog: FudisDialogService,
  ) {
    this.greetingFromOpeningComponent = this.data.greeting;
  }

  greetingFromOpeningComponent: string;

  closeTestDialog() {
    this.dialog.close('This string is passed when dialog is closed');
  }

  closeAllOpenDialogs() {
    this.dialog.closeAll();
  }
}

@Component({
  selector: 'fudis-dialog-test-button',
  template: `<fudis-button
    (handleClick)="openTestDialog()"
    [label]="'Open dialog'"
  ></fudis-button>`,
})
class DialogTestButtonComponent {
  constructor(public dialog: FudisDialogService) {}

  openTestDialog() {
    this.dialog.open(DialogTestContentComponent, { data: { greeting: 'Message to dialog!' } });
  }
}

describe('DialogService', () => {
  let service: FudisDialogService;
  let component: DialogTestButtonComponent;
  let fixture: ComponentFixture<DialogTestButtonComponent>;

  let dialogContentComponent: DialogTestContentComponent;
  let dialogContentFixture: ComponentFixture<DialogTestContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [
        HeadingComponent,
        BodyTextComponent,
        AlertGroupComponent,
        IconComponent,
        ButtonComponent,
        DialogComponent,
        DialogContentDirective,
        DialogCloseDirective,
        DialogActionsDirective,
        DialogTestButtonComponent,
        DialogTestContentComponent,
      ],
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
    fixture = TestBed.createComponent(DialogTestButtonComponent);
    dialogContentFixture = TestBed.createComponent(DialogTestContentComponent);
    component = fixture.componentInstance;
    dialogContentComponent = dialogContentFixture.componentInstance;

    fixture.detectChanges();
    dialogContentFixture.detectChanges();
  });

  beforeEach(() => {
    service = TestBed.inject(FudisDialogService);
  });

  it('should open fudis-dialog with greeting from component to dialog', () => {
    const openDialogSpy = jest.spyOn(service, 'open');
    expect(service.dialogsOpen().length).toEqual(0);
    component.openTestDialog();

    expect(openDialogSpy).toHaveBeenCalledWith(DialogTestContentComponent, {
      data: { greeting: 'Message to dialog!' },
    });
    expect(service.dialogsOpen().length).toEqual(1);
  });

  it('close should close dialog and pass data from dialog to component', () => {
    const closeDialogSpy = jest.spyOn(service, 'close');
    component.openTestDialog();
    dialogContentComponent.closeTestDialog();
    expect(closeDialogSpy).toHaveBeenCalled();
    expect(closeDialogSpy).toHaveBeenCalledWith('This string is passed when dialog is closed');
  });

  it('closeAll should close all open fudis-dialogs', () => {
    const closeDialogSpy = jest.spyOn(service.ngMaterialDialog, 'closeAll');

    dialogContentComponent.closeAllOpenDialogs();
    expect(closeDialogSpy).toHaveBeenCalled();
  });
});
