import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
import { DescriptionListComponent } from './components/description-list/description-list.component';
import { DropdownComponent } from './components/form/dropdown/dropdown.component';
import { ErrorMessageComponent } from './components/form/error-message/error-message.component';
import { ErrorSummaryComponent } from './components/form/error-summary/error-summary.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { ExpandableContentDirective } from './components/expandable/expandable-content.directive';
import { FudisDialog } from './components/dialog/dialog';
import { GuidanceComponent } from './components/form/guidance/guidance.component';
import { GridComponent } from './components/grid/grid.component';
import { HeadingComponent } from './components/typography/heading/heading.component';
import { IconComponent } from './components/icon/icon.component';
import { LabelComponent } from './components/form/label/label.component';
import { LegendComponent } from './components/form/legend/legend.component';
import { LinkComponent } from './components/link/link.component';
import { RadioButtonComponent } from './components/form/radio-button-group/radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './components/form/radio-button-group/radio-button-group.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { TextSpacingComponent } from './components/typography/text-spacing/text-spacing.component';
import { TextAreaComponent } from './components/form/text-area/text-area.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
	/*
	 * Include both internal and external Fudis components in 'declarations' array below.
	 */
	declarations: [
		ExpandableComponent,
		ExpandableContentDirective,
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		BadgeComponent,
		ButtonComponent,
		BodyTextComponent,
		CheckboxComponent,
		GridComponent,
		GuidanceComponent,
		DescriptionListComponent,
		DropdownComponent,
		ErrorMessageComponent,
		ErrorSummaryComponent,
		HeadingComponent,
		IconComponent,
		LabelComponent,
		LegendComponent,
		LinkComponent,
		RadioButtonComponent,
		RadioButtonGroupComponent,
		TextInputComponent,
		TextSpacingComponent,
		TextAreaComponent,
		NotificationComponent,
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
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
	],

	/*
	 * Include Fudis component in 'exports' array below
	 * and export in public-api.ts as well,
	 * when you want to expose it outside
	 */
	exports: [
		ExpandableComponent,
		ExpandableContentDirective,
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		BadgeComponent,
		ButtonComponent,
		BodyTextComponent,
		CheckboxComponent,
		DescriptionListComponent,
		DropdownComponent,
		// ErrorSummaryComponent,
		GridComponent,
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
	providers: [FudisDialog],
})
export class NgxFudisModule {}
