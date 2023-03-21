import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
	FudisDialogActionsDirective,
	FudisDialogCloseDirective,
	FudisDialogContentDirective,
	FudisDialogTitleDirective,
} from './components/dialog/dialog-directives';
import { BadgeComponent } from './components/badge/badge.component';
import { BodyTextComponent } from './components/typography/body-text/body-text.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { DatepickerComponent, FUDIS_DATE_FORMATS } from './components/form/datepicker/datepicker.component';
import { DatepickerCustomDateAdapter } from './components/form/datepicker/datepicker-custom-date-adapter';
import { DatepickerCustomHeaderComponent } from './components/form/datepicker/datepicker-custom-header/datepicker-custom-header.component';
import { DescriptionListComponent } from './components/description-list/description-list.component';
import { DropdownComponent } from './components/form/dropdown/dropdown.component';
import { ErrorMessageComponent } from './components/form/error-message/error-message.component';
import { ErrorSummaryComponent } from './components/form/error-summary/error-summary.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { ExpandableContentDirective } from './components/expandable/expandable-content.directive';
import { DialogComponent } from './components/dialog/dialog.component';
import { GuidanceComponent } from './components/form/guidance/guidance.component';
import { GridComponent } from './components/grid/grid.component';
import { GridApiDirective } from './components/grid/grid-api.directive';
import { GridDirective } from './components/grid/grid.directive';
import { HeadingComponent } from './components/typography/heading/heading.component';
import { IconComponent } from './components/icon/icon.component';
import { LabelComponent } from './components/form/label/label.component';
import { LegendComponent } from './components/form/legend/legend.component';
import { LinkComponent } from './components/link/link.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RadioButtonComponent } from './components/form/radio-button-group/radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './components/form/radio-button-group/radio-button-group.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { TextSpacingComponent } from './components/typography/text-spacing/text-spacing.component';
import { TextAreaComponent } from './components/form/text-area/text-area.component';

@NgModule({
	/*
	 * Include both internal and external Fudis components in 'declarations' array below.
	 */
	declarations: [
		BadgeComponent,
		BodyTextComponent,
		ButtonComponent,
		CheckboxComponent,
		DatepickerComponent,
		DatepickerCustomHeaderComponent,
		DescriptionListComponent,
		DialogComponent,
		DropdownComponent,
		ErrorMessageComponent,
		ErrorSummaryComponent,
		ExpandableComponent,
		ExpandableContentDirective,
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		GridComponent,
		GridApiDirective,
		GridDirective,
		GuidanceComponent,
		HeadingComponent,
		IconComponent,
		LabelComponent,
		LegendComponent,
		LinkComponent,
		NotificationComponent,
		RadioButtonComponent,
		RadioButtonGroupComponent,
		TextInputComponent,
		TextSpacingComponent,
		TextAreaComponent,
	],
	/*
	 * Include imports outside of Fudis components in 'imports' array below.
	 * E.g. components from Angular Material or other Angular tools
	 */
	imports: [
		BrowserAnimationsModule,
		CommonModule,
		FormsModule,
		LayoutModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatNativeDateModule,
		MatSelectModule,
		ReactiveFormsModule,
	],

	/*
	 * Include Fudis component in 'exports' array below
	 * and export in public-api.ts as well,
	 * when you want to expose it outside
	 */
	exports: [
		BadgeComponent,
		BodyTextComponent,
		ButtonComponent,
		CheckboxComponent,
		DatepickerComponent,
		DescriptionListComponent,
		DialogComponent,
		DropdownComponent,
		// ErrorSummaryComponent,
		ExpandableComponent,
		ExpandableContentDirective,
		// FudisDialogTitleDirective,
		// FudisDialogActionsDirective,
		// FudisDialogContentDirective,
		// FudisDialogCloseDirective,
		GridComponent,
		GridDirective,
		HeadingComponent,
		IconComponent,
		LegendComponent,
		LinkComponent,
		NotificationComponent,
		RadioButtonGroupComponent,
		TextAreaComponent,
		TextInputComponent,
		// TextSpacingComponent,
	],
	providers: [
		{ provide: DateAdapter, useClass: DatepickerCustomDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: FUDIS_DATE_FORMATS },
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } },
		{
			provide: MatDialogRef,
			useValue: {},
		},
	],
})
export class NgxFudisModule {}
