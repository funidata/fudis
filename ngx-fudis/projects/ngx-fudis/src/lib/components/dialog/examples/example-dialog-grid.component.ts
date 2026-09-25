import { Component, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { FudisDialogService } from '../../../services/dialog/dialog.service';
import { FudisDialogSize } from '../../../types/miscellaneous';
import { NgxFudisModule } from '../../../ngx-fudis.module';

@Component({
  imports: [NgxFudisModule],
  selector: 'example-dialog-with-grid',
  template: `
    <fudis-button
      (handleClick)="openDialogTemplate(dialogWithGrid)"
      [label]="'Open dialog with grid'"
    ></fudis-button>

    <ng-template #dialogWithGrid>
      <fudis-dialog [size]="size">
        <fudis-heading fudisDialogTitle [level]="1" [variant]="'xl'"
          >Course information and learning outcomes</fudis-heading
        >
        <fudis-dialog-content [contentFocus]="true">
          <fudis-grid [classes]="'fudis-mb-md'">
            <fudis-heading [level]="3" [variant]="'sm'">
              Introduction to Data Science
            </fudis-heading>
            <fudis-icon-button
              #menuTrigger
              [id]="'fudis-menu-button-1'"
              [ariaLabel]="'Additional menu'"
              [size]="'small'"
              [variant]="'secondary'"
              [icon]="'three-dots'"
              [asMenuButton]="true"
            >
              <fudis-dropdown-menu [size]="'md'">
                <fudis-dropdown-menu-item
                  [label]="'View registration details'"
                  (handleClick)="openExtraDialogTemplate(extraDialog)"
                ></fudis-dropdown-menu-item>
              </fudis-dropdown-menu>
            </fudis-icon-button>
            <fudis-body-text>
              This course introduces data collection, analysis, and visualisation. Students apply
              statistical methods to practical research questions and learn to communicate results
              clearly for academic and professional audiences.
            </fudis-body-text>
            <fudis-body-text>
              Teaching consists of lectures, workshops, and independent assignments. Assessment is
              based on a project report and active participation in the workshops. Review the course
              schedule before registering.
            </fudis-body-text>
            <fudis-body-text>
              During the course, students work with structured datasets from areas such as student
              wellbeing, learning analytics, and sustainability research. The workshops provide
              guided practice in preparing data, selecting suitable methods, and interpreting
              findings responsibly. No previous programming experience is required, but students
              should be prepared to complete weekly independent exercises.
            </fudis-body-text>
            <fudis-body-text>
              The project report is completed in pairs or small groups. It includes a research
              question, a description of the data and methods used, visualisations of the results,
              and a discussion of limitations. Groups receive formative feedback during the course
              and submit the final report through the learning platform by the published deadline.
            </fudis-body-text>
            <fudis-body-text>
              Course materials, workshop instructions, and assessment criteria are available in the
              learning platform before the first teaching session. Students who need individual
              study arrangements should contact the course teacher or accessibility services early
              in the teaching period. Attendance requirements and timetable changes are announced in
              the course catalogue.
            </fudis-body-text>
          </fudis-grid>
          <fudis-hr />
          <fudis-grid [columns]="{ xs: 1, sm: 2, md: 3 }" [classes]="'fudis-mt-sm fudis-mb-sm'">
            <div style="border: 2px solid lightblue">
              <fudis-body-text>5 ECTS credits</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Autumn 2026</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>On-campus teaching</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Lectures</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Workshops</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Project work</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Course catalogue</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Learning platform</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Reading list</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Assessment criteria</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Registration deadline</fudis-body-text>
            </div>
            <div style="border: 2px solid lightblue">
              <fudis-body-text>Student support</fudis-body-text>
            </div>
          </fudis-grid>
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Ok'" />
        </fudis-dialog-actions>
      </fudis-dialog>
    </ng-template>

    <ng-template #extraDialog>
      <fudis-dialog [size]="'sm'">
        <fudis-heading fudisDialogTitle [level]="1" [variant]="'md'"
          >Registration details</fudis-heading
        >
        <fudis-dialog-content>
          <fudis-body-text>
            Registration opens on 1 August and closes one week before teaching begins.
          </fudis-body-text>
        </fudis-dialog-content>
        <fudis-dialog-actions>
          <fudis-button fudisDialogClose [label]="'Ok'"></fudis-button>
        </fudis-dialog-actions>
      </fudis-dialog>
    </ng-template>
  `,
})
export class ExampleDialogWithGridComponent {
  constructor(private _dialogService: FudisDialogService) {}

  @Input() size: FudisDialogSize = 'md';

  @ViewChild('menuTrigger', { static: false, read: ElementRef })
  menuTrigger?: ElementRef<HTMLButtonElement>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openDialogTemplate<T = any>(dialogToOpen: ComponentType<T> | TemplateRef<T>) {
    this._dialogService.open(dialogToOpen);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openExtraDialogTemplate<T = any>(extraDialog: TemplateRef<T>) {
    const dialogRef = this._dialogService.open(extraDialog, { restoreFocus: false });
    const buttonElement = this.menuTrigger?.nativeElement.querySelector('button');
    dialogRef.afterClosed().subscribe(() => {
      buttonElement?.focus();
    });
  }
}
