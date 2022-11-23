import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
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
import { TextInputComponent } from './components/form/fudis-text-input/text-input.component';
import { TouchedErrorStateMatcher } from './components/form/touched-error-state.matcher';

@NgModule({
	declarations: [
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		ButtonComponent,
		HeadingComponent,
		BodyTextComponent,
		TextInputComponent,
	],
	imports: [MatDialogModule, CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
	exports: [
		FudisDialogTitleDirective,
		FudisDialogActionsDirective,
		FudisDialogContentDirective,
		FudisDialogCloseDirective,
		ButtonComponent,
		HeadingComponent,
		BodyTextComponent,
		TextInputComponent,
	],
	providers: [FudisDialog, { provide: ErrorStateMatcher, useClass: TouchedErrorStateMatcher }],
})
export class NgxFudisModule {}
