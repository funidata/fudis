import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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

import { ScrollingModule } from '@angular/cdk/scrolling';
import { ActionsDirective } from './directives/content-projection/actions/actions.directive';
import { AutocompleteComponent } from './components/form/autocomplete/autocomplete.component';
import { AutocompleteMultiSelectComponent } from './components/autocomplete-multi-select/autocomplete-multi-select.component';
import { AutocompleteMultiSelectSelectedItemChipComponent } from './components/autocomplete-multi-select/autocomplete-multi-select-selected-item-chip/autocomplete-multi-select-selected-item-chip.component';
import { BadgeComponent } from './components/badge/badge.component';
import { BodyTextComponent } from './components/typography/body-text/body-text.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { ContentDirective } from './directives/content-projection/content/content.directive';
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
import { FudisDialogService } from './components/dialog/dialog.service';
import { DropdownComponent } from './components/form/dropdown/dropdown.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DropdownMenuItemComponent } from './components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component';
import { FudisDropdownMenuItemService } from './components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { ErrorMessageComponent } from './components/form/error-message/error-message.component';
import { FudisErrorSummaryService } from './components/form/error-summary/error-summary.service';
import { ErrorSummaryComponent } from './components/form/error-summary/error-summary.component';
import { ExpandableComponent } from './components/expandable/expandable.component';

import { FieldSetBaseDirective } from './directives/form/fieldset-base/fieldset-base.directive';
import { FieldSetComponent } from './components/form/fieldset/fieldset.component';
import { FormComponent } from './components/form/form/form.component';
import { GridComponent } from './components/grid/grid/grid.component';
import { GridApiDirective } from './directives/grid/grid-api/grid-api.directive';
import { GridDirective } from './directives/grid/grid/grid.directive';
import { GridItemComponent } from './components/grid/grid-item/grid-item.component';
import { GridItemDirective } from './directives/grid/grid-item/grid-item.directive';
import { FudisGridService } from './directives/grid/grid-service/grid.service';
import { GuidanceComponent } from './components/form/guidance/guidance.component';
import { HeaderDirective } from './directives/content-projection/header/header.directive';
import { HeadingComponent } from './components/typography/heading/heading.component';
import { IconComponent } from './components/icon/icon.component';
import { FudisIdService } from './utilities/id-service.service';
import { InputBaseDirective } from './directives/form/input-base/input-base.directive';
import { InputWithLanguageOptionsComponent } from './components/form/input-with-language-options/input-with-language-options.component';
import { LabelComponent } from './components/form/label/label.component';
import { LinkComponent } from './components/link/link.component';
import { NotificationComponent } from './components/notification/notification.component';

import { RadioButtonComponent } from './components/form/radio-button-group/radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './components/form/radio-button-group/radio-button-group.component';
import { SectionComponent } from './components/section/section.component';
import { SpacingDirective } from './directives/spacing/spacing.directive';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { TextSpacingComponent } from './components/typography/text-spacing/text-spacing.component';
import { TextAreaComponent } from './components/form/text-area/text-area.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { DescriptionListItemComponent } from './components/description-list/description-list-item/description-list-item.component';
import { DescriptionListItemTermComponent } from './components/description-list/description-list-item/description-list-item-term/description-list-item-term.component';
import { DescriptionListItemDetailsComponent } from './components/description-list/description-list-item/description-list-item-details/description-list-item-details.component';
import { NotificationsDirective } from './directives/content-projection/notifications/notifications.directive';
import { FudisTranslationConfigService } from './utilities/config.service';

@NgModule({
	/*
	 * Include both internal and external Fudis components in 'declarations' array below.
	 */
	declarations: [
		ActionsDirective,
		AutocompleteComponent,
		AutocompleteMultiSelectComponent,
		AutocompleteMultiSelectSelectedItemChipComponent,
		BadgeComponent,
		BodyTextComponent,
		ButtonComponent,
		CheckboxComponent,
		ContentDirective,
		DatepickerComponent,
		DatepickerCustomHeaderComponent,
		DescriptionListComponent,
		DescriptionListItemComponent,
		DescriptionListItemTermComponent,
		DescriptionListItemDetailsComponent,
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
		FieldSetBaseDirective,
		FieldSetComponent,
		FormComponent,
		InputWithLanguageOptionsComponent,
		GridComponent,
		GridApiDirective,
		GridDirective,
		GridItemComponent,
		GridItemDirective,
		GuidanceComponent,
		HeaderDirective,
		HeadingComponent,
		IconComponent,
		InputBaseDirective,
		LabelComponent,
		LinkComponent,
		NotificationComponent,
		RadioButtonComponent,
		RadioButtonGroupComponent,
		SectionComponent,
		SpacingDirective,
		TextInputComponent,
		TextSpacingComponent,
		TextAreaComponent,
		TooltipDirective,
		ContentDirective,
		ActionsDirective,

		NotificationsDirective,
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
		RouterModule,
		ScrollingModule,
	],

	/*
	 * Include Fudis component in 'exports' array below
	 * and export in public-api.ts as well,
	 * when you want to expose it outside
	 */
	exports: [
		ActionsDirective,
		AutocompleteComponent,
		AutocompleteMultiSelectComponent,
		BadgeComponent,
		BodyTextComponent,
		ButtonComponent,
		CheckboxComponent,
		ContentDirective,
		DatepickerComponent,
		DescriptionListComponent,
		DescriptionListItemComponent,
		DescriptionListItemTermComponent,
		DescriptionListItemDetailsComponent,
		DialogComponent,
		DropdownComponent,
		DropdownMenuComponent,
		DropdownMenuItemComponent,
		ErrorMessageComponent,
		ErrorSummaryComponent,
		ExpandableComponent,
		DialogTitleDirective,
		DialogContentDirective,
		DialogCloseDirective,
		DialogActionsDirective,
		FieldSetComponent,
		FormComponent,
		InputWithLanguageOptionsComponent,
		GridComponent,
		GridDirective,
		GridItemComponent,
		GridItemDirective,
		GuidanceComponent,
		HeaderDirective,
		HeadingComponent,
		IconComponent,
		LinkComponent,
		NotificationComponent,
		NotificationsDirective,
		RadioButtonGroupComponent,
		SectionComponent,
		TextAreaComponent,
		TextInputComponent,
		TooltipDirective,
	],
	providers: [
		FudisDialogService,
		FudisErrorSummaryService,
		FudisGridService,
		FudisDropdownMenuItemService,
		FudisIdService,
		FudisTranslationConfigService,
	],
})
export class NgxFudisModule {}
