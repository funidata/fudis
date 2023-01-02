import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	FudisDialogActionsDirective,
	FudisDialogCloseDirective,
	FudisDialogContentDirective,
	FudisDialogTitleDirective,
} from './components/dialog/dialog-directives';
import { FudisDialog } from './components/dialog/dialog';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { HeadingComponent } from './components/typography/heading/heading.component';
import { BodyTextComponent } from './components/typography/body-text/body-text.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { VanillaTextInputComponent } from './components/form/vanilla-text-input/vanilla-text-input.component';
import { FormLayoutComponent } from './components/form/form-layout/form-layout.component';
import { ErrorSummaryComponent } from './components/form/error-summary/error-summary.component';
import { TextSpacingComponent } from './components/typography/text-spacing/text-spacing.component';
import { GridComponent } from './components/grid/grid.component';
import { LegendComponent } from './components/form/legend/legend.component';
import { FudisCheckboxComponent } from './components/form/fudis-checkbox/fudis-checkbox.component';
import { VanillaTextAreaComponent } from './components/form/vanilla-text-area/vanilla-text-area.component';
import { BadgeComponent } from './components/badge/badge.component';
import { IconComponent } from './components/icon/icon.component';
import { DropdownComponent } from './components/form/dropdown/dropdown.component';

@NgModule({
	declarations: [
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		ButtonComponent,
		HeadingComponent,
		BodyTextComponent,
		CheckboxComponent,
		TextInputComponent,
		FormLayoutComponent,
		ErrorSummaryComponent,
		TextSpacingComponent,
		GridComponent,
		LegendComponent,
		FudisCheckboxComponent,
		VanillaTextInputComponent,
		VanillaTextAreaComponent,
		BadgeComponent,
		IconComponent,
		DropdownComponent,
	],
	imports: [
		FormsModule,
		MatDialogModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		ReactiveFormsModule,
		MatSelectModule,
	],
	exports: [
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		ButtonComponent,
		HeadingComponent,
		BodyTextComponent,
		CheckboxComponent,
		TextInputComponent,
		FormLayoutComponent,
		ErrorSummaryComponent,
		TextSpacingComponent,
		GridComponent,
		LegendComponent,
		FudisCheckboxComponent,
		VanillaTextInputComponent,
		VanillaTextAreaComponent,
		BadgeComponent,
		IconComponent,
		DropdownComponent,
	],
	providers: [FudisDialog],
})
export class NgxFudisModule {}
