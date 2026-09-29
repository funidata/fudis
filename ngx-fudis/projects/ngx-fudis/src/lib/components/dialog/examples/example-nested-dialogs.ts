import { Component, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

type TestNestedDialogForm = {
  preference: FormControl<string | null>;
};

type StudyPreference = 'studyFormat' | 'teachingLanguage' | 'campus';

type StudyPreferences = { [preference in StudyPreference]?: string | null | undefined };

const studyPreferenceLabels: Record<StudyPreference, string> = {
  studyFormat: 'study format',
  teachingLanguage: 'teaching language',
  campus: 'campus',
};

const getStudyPreferenceLabel = (preference: string): string =>
  studyPreferenceLabels[preference as StudyPreference] ?? preference;

@Component({
  selector: 'example-nested-dialog',
  imports: [NgxFudisModule, CommonModule],
  template: `
    <fudis-dialog [size]="size">
      @if (id) {
        <fudis-dialog-content>
          <fudis-form
            [title]="title"
            [level]="2"
            [titleVariant]="'xl'"
            [errorSummaryTitle]="'You need to fill up the information.'"
          >
            <fudis-form-content>
              <ng-container *ngTemplateOutlet="studyPreferences" />
              <fudis-text-input
                class="fudis-mb-md"
                [id]="'example-input-' + id"
                [label]="'Preferred ' + _getStudyPreferenceLabel(id)"
                [control]="exampleDialogFormGroup.controls['preference']"
              />
            </fudis-form-content>
            <fudis-form-actions>
              <fudis-button
                fudisFormSubmit
                (handleClick)="closeDialog()"
                [label]="'Save and close dialog'"
                [variant]="'secondary'"
              />
              @if (nextDialogToOpen) {
                <fudis-button
                  fudisFormSubmit
                  (handleClick)="openDialogTemplate(nextDialogToOpen)"
                  [label]="'Save and open next Dialog'"
                />
              }
            </fudis-form-actions>
          </fudis-form>
        </fudis-dialog-content>
      }
      @if (!id) {
        <fudis-heading fudisDialogTitle [level]="2" [variant]="'xl'">{{ title }}</fudis-heading>
        <fudis-dialog-content>
          <ng-container *ngTemplateOutlet="studyPreferences" />
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Close this dialog'" [variant]="'secondary'" />
          <fudis-button (handleClick)="closeAll()" [label]="'Close all Dialogs'" />
        </fudis-dialog-actions>
      }
    </fudis-dialog>

    <ng-template #studyPreferences>
      @if ((_studyPreferences | keyvalue)?.length === 0) {
        <fudis-body-text class="fudis-mb-sm">
          No study preferences have been provided.
        </fudis-body-text>
      }
      @for (
        preference of _studyPreferences | keyvalue: _preservePreferenceOrder;
        track preference.key
      ) {
        <fudis-body-text class="fudis-mb-sm">
          Your preferred {{ _getStudyPreferenceLabel(preference.key) }} is
          <b>{{ preference.value }}</b
          >.
        </fudis-body-text>
      }
    </ng-template>
  `,
})
export class ExampleNestedDialogComponent {
  constructor(
    private _dialogService: FudisDialogService,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    private data?: { studyPreferences?: StudyPreferences },
  ) {
    this._studyPreferences = this.data?.studyPreferences || {};
  }

  @Input() size: FudisDialogSize = 'md';
  @Input() id: StudyPreference;
  @Input() title: string;
  @Input() nextDialogToOpen:
    ComponentType<ExampleNestedDialogComponent> | TemplateRef<ExampleNestedDialogComponent>;

  protected _studyPreferences: StudyPreferences = {};
  protected readonly _getStudyPreferenceLabel = getStudyPreferenceLabel;
  protected readonly _preservePreferenceOrder = (): number => 0;
  exampleDialogFormGroup = new FormGroup<TestNestedDialogForm>({
    preference: new FormControl(null),
  });

  updateStudyPreferences(): StudyPreferences {
    const value = this.exampleDialogFormGroup?.controls?.preference?.value;

    if (value) {
      this._studyPreferences[this.id] = value;
    }

    return this._studyPreferences;
  }

  openDialogTemplate(
    dialogToOpen:
      ComponentType<ExampleNestedDialogComponent> | TemplateRef<ExampleNestedDialogComponent>,
  ) {
    this._dialogService.open(dialogToOpen, {
      data: {
        studyPreferences: this.updateStudyPreferences(),
      },
    });
  }

  closeDialog() {
    this._dialogService.close(this.updateStudyPreferences());
  }

  closeAll(): void {
    this._dialogService.closeAll();
  }
}

@Component({
  selector: 'example-nested-dialogs',
  imports: [NgxFudisModule, CommonModule, ExampleNestedDialogComponent],
  template: `
    <fudis-body-text class="fudis-mb-md">
      NOTE: It is recommended to have only one Dialog open at a time.
    </fudis-body-text>
    <fudis-button
      (handleClick)="openDialogTemplate(firstDialog)"
      [label]="'Open dialog with nested dialogs'"
    />

    @if (_preferences) {
      @for (preference of _preferences | keyvalue: _preservePreferenceOrder; track preference.key) {
        <fudis-body-text class="fudis-mt-sm">
          Your preferred {{ _getStudyPreferenceLabel(preference.key) }} is
          <b>{{ preference.value }}</b
          >.
        </fudis-body-text>
      }
    }

    <ng-template #firstDialog>
      <example-nested-dialog
        [id]="'studyFormat'"
        [title]="'Select study format'"
        [size]="size"
        [nextDialogToOpen]="secondDialog"
      />
    </ng-template>

    <ng-template #secondDialog>
      <example-nested-dialog
        [id]="'teachingLanguage'"
        [title]="'Select teaching language'"
        [size]="size"
        [nextDialogToOpen]="thirdDialog"
      />
    </ng-template>

    <ng-template #thirdDialog>
      <example-nested-dialog
        [id]="'campus'"
        [title]="'Select campus'"
        [size]="size"
        [nextDialogToOpen]="fourthDialog"
      />
    </ng-template>

    <ng-template #fourthDialog>
      <example-nested-dialog [title]="'Study preferences summary'" [size]="size" />
    </ng-template>
  `,
})
export class ExampleNestedDialogsComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  protected _preferences: StudyPreferences | null;
  protected readonly _getStudyPreferenceLabel = getStudyPreferenceLabel;
  protected readonly _preservePreferenceOrder = (): number => 0;

  openDialogTemplate(
    dialogToOpen:
      ComponentType<ExampleNestedDialogComponent> | TemplateRef<ExampleNestedDialogComponent>,
  ) {
    this._dialogService
      .open(dialogToOpen)
      .afterClosed()
      .subscribe((result: StudyPreferences) => {
        if (result) {
          this._preferences = result;
        }
      });
  }
}
