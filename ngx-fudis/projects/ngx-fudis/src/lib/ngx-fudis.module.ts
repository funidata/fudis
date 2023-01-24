import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DescriptionListCompactComponent } from './components/description-list/description-list-compact/description-list-compact.component';
import { DropdownComponent } from './components/form/dropdown/dropdown.component';
import { ErrorMessageComponent } from './components/form/error-message/error-message.component';
import { ErrorSummaryComponent } from './components/form/error-summary/error-summary.component';
import { FudisDialog } from './components/dialog/dialog';
import { GridComponent } from './components/grid/grid.component';
import { HeadingComponent } from './components/typography/heading/heading.component';
import { IconComponent } from './components/icon/icon.component';
import { LegendComponent } from './components/form/legend/legend.component';
import { RadioButtonComponent } from './components/form/radio-button-group/radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './components/form/radio-button-group/radio-button-group.component';
import { RadioButtonGroupComponentExample } from '../examples/form/radio-button-group-example/radio-button-group-example.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { TextSpacingComponent } from './components/typography/text-spacing/text-spacing.component';
import { TextAreaComponent } from './components/form/text-area/text-area.component';

@NgModule({
	/*
	 * Include internal Fudis components in 'declarations' array below.
	 * These are not exposed outside and can be used in Stories or as an sub-component
	 */
	declarations: [
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		BadgeComponent,
		ButtonComponent,
		BodyTextComponent,
		CheckboxComponent,
		GridComponent,
		DescriptionListComponent,
		DescriptionListCompactComponent,
		DropdownComponent,
		ErrorMessageComponent,
		ErrorSummaryComponent,
		HeadingComponent,
		IconComponent,
		LegendComponent,
		RadioButtonComponent,
		RadioButtonGroupComponent,
		RadioButtonGroupComponentExample,
		TextInputComponent,
		TextSpacingComponent,
		TextAreaComponent,
	],
	/*
	 * Include imports outside of Fudis components in 'imports' array below.
	 * E.g. components from Angular Material or other Angular tools
	 */
	imports: [
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
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		BadgeComponent,
		ButtonComponent,
		BodyTextComponent,
		CheckboxComponent,
		DescriptionListComponent,
		DescriptionListCompactComponent,
		DropdownComponent,
		// ErrorSummaryComponent,
		GridComponent,
		HeadingComponent,
		IconComponent,
		LegendComponent,
		RadioButtonGroupComponent,
		TextAreaComponent,
		TextInputComponent,
		// TextSpacingComponent,
	],
	providers: [FudisDialog],
})
export class NgxFudisModule {}
