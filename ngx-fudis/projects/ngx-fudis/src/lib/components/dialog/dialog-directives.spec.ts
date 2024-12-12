import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';
import { DialogComponent } from './dialog.component';
import { IconComponent } from '../icon/icon.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { HeadingComponent } from '../typography/heading/heading.component';
import { FudisDialogService } from '../../services/dialog/dialog.service';
import {
  DialogTitleDirective,
  DialogContentDirective,
  DialogActionsDirective,
  DialogCloseDirective,
} from './dialog-directives';
import { getElement } from '../../utilities/tests/utilities';
import { AlertGroupComponent } from '../alert/alert-group/alert-group.component';
import { FudisAlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'fudis-mock-dialog',
  template: `
    <fudis-dialog [size]="'lg'">
      <fudis-heading fudisDialogTitle [level]="2">Dialog Heading</fudis-heading>
      <fudis-dialog-content [contentFocus]="contentFocus">
        <fudis-body-text>Dialog Content</fudis-body-text>
      </fudis-dialog-content>
      <fudis-dialog-actions [align]="'start'">
        <fudis-button fudisDialogClose [label]="'Close this dialog'"></fudis-button>
      </fudis-dialog-actions>
    </fudis-dialog>
  `,
})
class HostComponent {
  @Input() contentFocus: boolean = false;
}

describe('DialogDirectives', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  // Let's mock the scrollHeight to be bigger than client height, so we can mock that the dialog is scrollable
  const originalScrollHeight =
    Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollHeight') || {};

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 10,
    });
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', originalScrollHeight);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AlertGroupComponent,
        BodyTextComponent,
        ButtonComponent,
        HeadingComponent,
        IconComponent,
        DialogComponent,
        DialogTitleDirective,
        DialogContentDirective,
        DialogActionsDirective,
        DialogCloseDirective,
        HostComponent,
      ],
      providers: [FudisDialogService, FudisAlertService],
      imports: [MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('DialogTitleDirective', () => {
    it('should set mat dialog class, tab index and focus', () => {
      const title = getElement(fixture, '[fudisDialogTitle]');
      expect(title.getAttribute('class')).toContain('mat-mdc-dialog-title');
      expect(title.getAttribute('tabIndex')).toEqual('-1');
      expect(title.focus).toBeTruthy();
      expect(title.textContent).toEqual('Dialog Heading');
    });
  });

  describe('DialogContentDirective', () => {
    it('should set mat dialog class, tab index, and role', () => {
      const content = getElement(fixture, 'fudis-dialog-content');
      expect(content.getAttribute('class')).toContain('mat-mdc-dialog-content');
      expect(content.textContent).toEqual('Dialog Content');
    });

    it('should have proper attributes according to contentFocus value', () => {
      const content = getElement(fixture, 'fudis-dialog-content');
      expect(content.getAttribute('tabIndex')).toEqual(null);

      component.contentFocus = true;

      fixture.detectChanges();

      expect(content.getAttribute('tabIndex')).toEqual('0');
      expect(content.getAttribute('role')).toEqual('document');
    });
  });

  describe('DialogActionsDirective', () => {
    it('should set mat dialog and mat dialog align classes', () => {
      const actions = getElement(fixture, 'fudis-dialog-actions');
      expect(actions.getAttribute('class')).toContain('mat-mdc-dialog-actions-align-start');
    });
  });

  describe('DialogCloseDirective', () => {
    it('should contain text', () => {
      const button = getElement(fixture, 'fudis-dialog-actions [fudisDialogClose]');

      expect(button.textContent).toEqual('Close this dialog');
    });
  });
});
