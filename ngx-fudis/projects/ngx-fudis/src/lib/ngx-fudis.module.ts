import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {
	FudisDialogActionsDirective,
	FudisDialogCloseDirective,
	FudisDialogContentDirective,
	FudisDialogTitleDirective,
} from './components/dialog/dialog-directives';
import { FudisDialog } from './components/dialog/dialog';
import { ButtonComponent } from './components/button/button.component';
import { HeadingComponent } from './components/heading/heading.component';
import { BodyTextComponent } from './components/body-text/body-text.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { TextInputComponent } from './components/form/fudis-text-input/text-input.component';

@NgModule({
	declarations: [
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		ButtonComponent,
		HeadingComponent,
		BodyTextComponent,
		ButtonComponent,
		CheckboxComponent,
		TextInputComponent,
	],
	imports: [MatDialogModule, CommonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
	exports: [
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		ButtonComponent,
		HeadingComponent,
		BodyTextComponent,
		ButtonComponent,
		CheckboxComponent,
		TextInputComponent,
	],
	providers: [FudisDialog],
})
export class NgxFudisModule {}
