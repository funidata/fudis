import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { AfterViewInit, Component, TemplateRef, ViewChild, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertGroupComponent } from './alert-group.component';
import { FudisAlert, FudisAlertElement } from '../../../types/miscellaneous';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisAlertService } from '../../../services/alert/alert.service';
import { alertGroupExclude } from '../../../utilities/storybook';
import docs from '../alert.docs.mdx';

@Component({
  selector: 'example-add-alerts',
  template: `<div [style]="'margin-top:' + _marginCounter + 'rem'">
      <fudis-grid [columns]="'repeat(4,auto)'" [width]="'sm'">
        <fudis-button [label]="'Add danger'" (handleClick)="addDanger()" />
        <fudis-button [label]="'Add warning'" (handleClick)="addWarning()" />
        <fudis-button [label]="'Add success'" (handleClick)="addSuccess()" />
        <fudis-button [label]="'Add info'" (handleClick)="addInfo()" />
        <fudis-button [label]="'Add info with link'" (handleClick)="addInfoWithLink()" />
        <fudis-button [label]="'Add warning with link'" (handleClick)="addWarningWithLink()" />
        <fudis-button [label]="'Dismiss random id'" (handleClick)="dismissRandom()" />
        <fudis-button [label]="'Dismiss all'" (handleClick)="dismissAll()" />
        <fudis-button [label]="'Open dialog'" (handleClick)="openDialog()" />
      </fudis-grid>
    </div>
    <ng-template #exampleDialogTemplate>
      <fudis-dialog [size]="'sm'">
        <fudis-heading fudisDialogTitle [level]="2">Small test dialog</fudis-heading>
        <fudis-dialog-content>
          <fudis-body-text>Some content</fudis-body-text>
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Ok'"></fudis-button>
        </fudis-dialog-actions>
      </fudis-dialog>
    </ng-template>`,
})
class AddAlertsComponent implements AfterViewInit {
  constructor(
    private _dialog: FudisDialogService,
    private _alertService: FudisAlertService,
  ) {
    effect(() => {
      this._alerts = this._alertService.allAlertsObservable;
      this._marginCounter = 2 + this._alerts.getValue().length * 2;
    });
  }

  @ViewChild('exampleDialogTemplate', { static: true }) templateRef: TemplateRef<unknown>;

  protected _marginCounter: number = 2;

  protected _alerts: BehaviorSubject<FudisAlertElement[]>;

  openDialog(): void {
    this._dialog.open(this.templateRef);
  }

  addDanger(): void {
    const newAlert: FudisAlert = {
      message: new BehaviorSubject('Something dangerous happened'),
      type: 'danger',
      id: 'my-own-id-1',
    };

    this._alertService.addAlert(newAlert);
  }

  addWarning(): void {
    const newAlert: FudisAlert = {
      message: 'Something dangerous MIGHT happen',
      type: 'warning',
      id: 'my-own-id-2',
    };

    this._alertService.addAlert(newAlert);
  }

  addWarningWithLink(): void {
    const newAlert: FudisAlert = {
      message: new BehaviorSubject('Something dangerous MIGHT happen.'),
      type: 'warning',
      id: 'my-own-id-3',
      routerLinkUrl: '/',
      linkTitle: 'More info about this warning.',
    };

    this._alertService.addAlert(newAlert);
  }

  addSuccess(): void {
    const newAlert: FudisAlert = {
      message: 'Yippee Ki-Yay! You were successful!',
      type: 'success',
      id: 'my-own-id-4',
    };

    this._alertService.addAlert(newAlert);
  }

  addInfo(): void {
    const newAlert: FudisAlert = {
      message: 'Nothing special here.',
      type: 'info',
      id: 'my-own-id-5',
    };

    this._alertService.addAlert(newAlert);
  }

  addInfoWithLink(): void {
    const newAlert: FudisAlert = {
      message: 'Mostly neutral information here.',
      type: 'info',
      id: 'my-own-id-6',
      routerLinkUrl: '/',
      linkTitle: 'Additional information about this situation.',
    };

    this._alertService.addAlert(newAlert);
  }

  dismissRandom(): void {
    const alerts = this._alertService.allAlertsObservable.getValue();

    if (alerts.length > 0) {
      const random = Math.floor(Math.random() * alerts.length);
      this._alertService.dismissAlert(alerts[random].id);
    }
  }

  dismissAll(): void {
    this._alertService.dismissAll();
  }

  ngAfterViewInit(): void {
    this.addDanger();
    this.addInfo();
    this.addWarning();
    this.addSuccess();
  }
}

export default {
  title: 'Components/Alert Group',
  component: AlertGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
      declarations: [AddAlertsComponent],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: alertGroupExclude,
    },
  },
  argTypes: {
    position: {
      options: ['fixed', 'static', 'absolute'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn<AlertGroupComponent> = (args: AlertGroupComponent) => ({
  props: args,
  template: html`<fudis-alert-group [position]="position" /><example-add-alerts /> `,
});

export const Example = Template.bind({});
Example.args = {
  position: 'fixed',
};
