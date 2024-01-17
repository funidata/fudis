import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MockComponents } from 'ng-mocks';
import { FudisDialogService } from './dialog.service';
import { BodyTextComponent } from '../../components/typography/body-text/body-text.component';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { HeadingComponent } from '../../components/typography/heading/heading.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  DialogActionsDirective,
  DialogCloseDirective,
  DialogContentDirective,
} from '../../directives/dialog/dialog-directives';
import { AlertGroupComponent } from '../../components/alert/alert-group/alert-group.component';

@Component({
  selector: 'fudis-dialog-test-content',
  template: `
    <fudis-dialog [size]="'lg'">
      <fudis-heading fudisDialogTitle [level]="2">Dialog Heading</fudis-heading>
      <fudis-dialog-content>
        <fudis-heading [level]="3" [size]="'sm'">Content heading</fudis-heading>
        <fudis-body-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc
          vehicula ut massa non facilisis.
        </fudis-body-text>
      </fudis-dialog-content>
      <fudis-dialog-actions>
        <fudis-button (handleClick)="closeTestDialog()" [label]="'Ok'"></fudis-button>
      </fudis-dialog-actions>
    </fudis-dialog>
  `,
})
class DialogTestContentComponent {
  constructor(public ngMaterialDialog: MatDialog) {}

  closeTestDialog() {
    this.ngMaterialDialog.closeAll();
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
    this.dialog.open(DialogTestContentComponent);
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
        MockComponents(HeadingComponent, BodyTextComponent, AlertGroupComponent),
        ButtonComponent,
        DialogComponent,
        DialogContentDirective,
        DialogCloseDirective,
        DialogActionsDirective,
        DialogTestButtonComponent,
        DialogTestContentComponent,
      ],
      providers: [FudisDialogService],
    });
    fixture = TestBed.createComponent(DialogTestButtonComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  beforeEach(() => {
    service = TestBed.inject(FudisDialogService);
  });

  it('should open fudis-dialog', () => {
    const openDialogSpy = jest.spyOn(service, 'open');
    component.openTestDialog();

    expect(openDialogSpy).toHaveBeenCalledWith(DialogTestContentComponent);
  });

  it('should close fudis-dialog', () => {
    dialogContentFixture = TestBed.createComponent(DialogTestContentComponent);
    dialogContentComponent = dialogContentFixture.componentInstance;

    const closeDialogSpy = jest.spyOn(service.ngMaterialDialog, 'closeAll');
    dialogContentComponent.closeTestDialog();

    expect(closeDialogSpy).toHaveBeenCalledWith();
  });
});
