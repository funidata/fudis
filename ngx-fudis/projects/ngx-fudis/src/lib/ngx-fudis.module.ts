import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

import { AutocompleteComponent } from './components/form/autocomplete/autocomplete.component';
import { BadgeComponent } from './components/badge/badge.component';
import { BodyTextComponent } from './components/typography/body-text/body-text.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { DatepickerComponent } from './components/form/datepicker/datepicker.component';

import { DatepickerCustomHeaderComponent } from './components/form/datepicker/datepicker-custom-header/datepicker-custom-header.component';
import { DescriptionListComponent } from './components/description-list/description-list.component';
import {
	DialogCloseDirective,
	DialogContentDirective,
	DialogTitleDirective,
	DialogActionsDirective,
} from './components/dialog/dialog-directives';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from './components/dialog/dialog.service';
import { DropdownComponent } from './components/form/dropdown/dropdown.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DropdownMenuItemComponent } from './components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component';
import { DropdownMenuItemService } from './components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { ErrorMessageComponent } from './components/form/error-message/error-message.component';
import { ErrorSummaryService } from './components/form/error-summary/error-summary.service';
import { ErrorSummaryComponent } from './components/form/error-summary/error-summary.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { ExpandableContentDirective, ExpandableActionsDirective } from './components/expandable/expandable-directives';
import { FieldSetComponent } from './components/form/fieldset/fieldset.component';
import { GuidanceComponent } from './components/form/guidance/guidance.component';
import { GridComponent } from './components/grid/grid.component';
import { GridApiDirective } from './directives/grid/grid-api.directive';
import { GridDirective } from './directives/grid/grid.directive';
import { HeadingComponent } from './components/typography/heading/heading.component';
import { IconComponent } from './components/icon/icon.component';
import { LabelComponent } from './components/form/label/label.component';
import { LinkComponent } from './components/link/link.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationContentDirective } from './components/notification/notification-directives';
import { RadioButtonComponent } from './components/form/radio-button-group/radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './components/form/radio-button-group/radio-button-group.component';
import { SpacingDirective } from './directives/spacing/spacing.directive';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { TextSpacingComponent } from './components/typography/text-spacing/text-spacing.component';
import { TextAreaComponent } from './components/form/text-area/text-area.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { InputBaseDirective } from './directives/form/input-base/input-base.directive';
import { FieldSetBaseDirective } from './directives/form/fieldset-base/fieldset-base.directive';

import { InputWithLanguageOptionsComponent } from './components/form/input-with-language-options/input-with-language-options.component';

@NgModule({
	/*
	 * Include both internal and external Fudis components in 'declarations' array below.
	 */
	declarations: [
		AutocompleteComponent,
		BadgeComponent,
		BodyTextComponent,
		ButtonComponent,
		CheckboxComponent,
		DatepickerComponent,
		DatepickerCustomHeaderComponent,
		DescriptionListComponent,
		DialogTitleDirective,
		DialogComponent,
		DialogActionsDirective,
		DialogContentDirective,
		DialogCloseDirective,
		DropdownComponent,
		DropdownMenuComponent,
		DropdownMenuItemComponent,
		ErrorMessageComponent,
		ErrorSummaryComponent,
		ExpandableComponent,
		ExpandableActionsDirective,
		ExpandableContentDirective,
		FieldSetBaseDirective,
		FieldSetComponent,
		InputWithLanguageOptionsComponent,
		GridComponent,
		GridApiDirective,
		GridDirective,
		GuidanceComponent,
		HeadingComponent,
		IconComponent,
		InputBaseDirective,
		LabelComponent,
		LinkComponent,
		NotificationComponent,
		NotificationContentDirective,
		RadioButtonComponent,
		RadioButtonGroupComponent,
		SpacingDirective,
		TextInputComponent,
		TextSpacingComponent,
		TextAreaComponent,
		TooltipDirective,
	],
	/*
	 * Include imports outside of Fudis components in 'imports' array below.
	 * E.g. components from Angular Material or other Angular tools
	 */
	imports: [
		CommonModule,
		FormsModule,
		LayoutModule,
		MatAutocompleteModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatNativeDateModule,
		MatSelectModule,
		MatButtonModule,
		MatTooltipModule,
		ReactiveFormsModule,
	],

	/*
	 * Include Fudis component in 'exports' array below
	 * and export in public-api.ts as well,
	 * when you want to expose it outside
	 */
	exports: [
		AutocompleteComponent,
		BadgeComponent,
		BodyTextComponent,
		ButtonComponent,
		CheckboxComponent,
		DatepickerComponent,
		DescriptionListComponent,
		DialogComponent,
		DropdownComponent,
		DropdownMenuComponent,
		DropdownMenuItemComponent,
		ErrorMessageComponent,
		ErrorSummaryComponent,
		ExpandableComponent,
		ExpandableActionsDirective,
		ExpandableContentDirective,
		DialogTitleDirective,
		DialogContentDirective,
		DialogCloseDirective,
		DialogActionsDirective,
		FieldSetComponent,
		InputWithLanguageOptionsComponent,
		GridComponent,
		GridDirective,
		GuidanceComponent,
		HeadingComponent,
		IconComponent,

		LinkComponent,
		NotificationComponent,
		NotificationContentDirective,
		RadioButtonGroupComponent,
		// SpacingDirective,
		TextAreaComponent,
		TextInputComponent,
		// TextSpacingComponent,
		TooltipDirective,
	],
	providers: [DialogService, ErrorSummaryService, DropdownMenuItemService],
})
export class NgxFudisModule {}
