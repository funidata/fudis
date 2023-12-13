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
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbsItemComponent } from './components/breadcrumbs/breadcrumbs-item/breadcrumbs-item.component';
import { BodyTextComponent } from './components/typography/body-text/body-text.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/form/checkbox-group/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './components/form/checkbox-group/checkbox-group.component';

import { DateRangeComponent } from './components/form/date/date-range/date-range.component';

import {
	ContentDirective,
	FooterContentLeftDirective,
	FooterContentRightDirective,
} from './directives/content-projection/content/content.directive';
import { DatepickerComponent } from './components/form/date/datepicker/datepicker.component';

import { DatepickerCustomHeaderComponent } from './components/form/date/date-common/datepicker-custom-header/datepicker-custom-header.component';
import { DescriptionListComponent } from './components/description-list/description-list.component';
import {
	DialogCloseDirective,
	DialogContentDirective,
	DialogTitleDirective,
	DialogActionsDirective,
} from './directives/dialog/dialog-directives';
import { DialogComponent } from './components/dialog/dialog.component';
import { FudisDialogService } from './services/dialog/dialog.service';
import { DropdownComponent } from './components/form/dropdown/dropdown.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DropdownMenuItemComponent } from './components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component';

import { FudisFocusService } from './services/focus/focus.service';
import { ErrorMessageComponent } from './components/form/error-message/error-message.component';
import { FudisInternalErrorSummaryService } from './services/form/error-summary/internal-error-summary.service';
import { FudisErrorSummaryService } from './services/form/error-summary/error-summary.service';
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
import { FudisGridService } from './services/grid/grid.service';
import { GuidanceComponent } from './components/form/guidance/guidance.component';
import { HeaderDirective } from './directives/content-projection/header/header.directive';
import { HeadingComponent } from './components/typography/heading/heading.component';
import { IconComponent } from './components/icon/icon.component';
import { FudisIdService } from './services/id/id.service';
import { InputBaseDirective } from './directives/form/input-base/input-base.directive';
import { InputWithLanguageOptionsComponent } from './components/form/input-with-language-options/input-with-language-options.component';
import { LabelComponent } from './components/form/label/label.component';
import { LinkComponent } from './components/link/link.component';
import { NotificationComponent } from './components/notification/notification.component';

import { RadioButtonComponent } from './components/form/radio-button-group/radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './components/form/radio-button-group/radio-button-group.component';
import { SectionComponent } from './components/section/section.component';
import { SpacingApiDirective } from './directives/spacing/spacing-api/spacing-api.directive';
import { SpacingDirective } from './directives/spacing/spacing.directive';
import { TextInputComponent } from './components/form/text-input/text-input.component';

import { TextAreaComponent } from './components/form/text-area/text-area.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { DescriptionListItemComponent } from './components/description-list/description-list-item/description-list-item.component';
import { DescriptionListItemTermComponent } from './components/description-list/description-list-item/description-list-item-term/description-list-item-term.component';
import { DescriptionListItemDetailsComponent } from './components/description-list/description-list-item/description-list-item-details/description-list-item-details.component';
import { NotificationsDirective } from './directives/content-projection/notifications/notifications.directive';
import { FooterComponent } from './components/footer/footer.component';
import { LanguageBadgeGroupComponent } from './components/language-badge-group/language-badge-group.component';
import { LanguageBadgeComponent } from './components/language-badge-group/language-badge/language-badge.component';
import { FudisTranslationService } from './services/translation/translation.service';
import { FudisLanguageBadgeGroupService } from './services/language-badge-group/language-badge-group.service';
import { AlertComponent } from './components/alert/alert/alert.component';
import { AlertGroupComponent } from './components/alert/alert-group/alert-group.component';
import { FudisAlertService } from './services/alert/alert.service';
import { FudisBreakpointService } from './services/breakpoint/breakpoint.service';
import { SelectComponent } from './components/form/select/select.component';
import { SelectOptionComponent } from './components/form/select/select-option/select-option.component';
import { SelectGroupComponent } from './components/form/select/select-group/select-group.component';
import { DropdownItemBaseDirective } from './directives/form/dropdown-item-base/dropdown-item-base.directive';
import { DropdownBaseDirective } from './directives/form/dropdown-base/dropdown-base.directive';
import { SelectDropdownComponent } from './components/form/select/select-dropdown/select-dropdown.component';
import { SelectMultiselectChipListComponent } from './components/form/select/select-multiselect-chip/select-multiselect-chip-list.component';
import { SelectBaseDirective } from './components/form/select/select-base/select-base.directive';

@NgModule({
	/*
	 * Include both internal and external Fudis components in 'declarations' array below.
	 */
	declarations: [
		ActionsDirective,
		AlertComponent,
		AlertGroupComponent,
		AutocompleteComponent,
		AutocompleteMultiSelectComponent,
		AutocompleteMultiSelectSelectedItemChipComponent,
		BadgeComponent,
		BodyTextComponent,
		BreadcrumbsComponent,
		BreadcrumbsItemComponent,
		ButtonComponent,
		CheckboxComponent,
		CheckboxGroupComponent,
		ContentDirective,
		DatepickerComponent,
		DatepickerCustomHeaderComponent,
		DateRangeComponent,
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
		DropdownItemBaseDirective,
		DropdownMenuItemComponent,
		ErrorMessageComponent,
		ErrorSummaryComponent,
		ExpandableComponent,
		FieldSetBaseDirective,
		FieldSetComponent,
		FooterComponent,
		FooterContentLeftDirective,
		FooterContentRightDirective,
		FormComponent,
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
		InputWithLanguageOptionsComponent,
		LabelComponent,
		LanguageBadgeGroupComponent,
		LanguageBadgeComponent,
		LinkComponent,
		NotificationComponent,
		NotificationsDirective,
		RadioButtonComponent,
		RadioButtonGroupComponent,
		SectionComponent,
		SelectBaseDirective,
		SelectComponent,
		SelectDropdownComponent,
		SelectGroupComponent,
		SelectOptionComponent,
		SelectMultiselectChipListComponent,
		SpacingApiDirective,
		SpacingDirective,
		TextInputComponent,
		TextAreaComponent,
		TooltipDirective,
		DropdownBaseDirective,
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
		AlertComponent,
		AlertGroupComponent,
		AutocompleteComponent,
		AutocompleteMultiSelectComponent,
		BadgeComponent,
		BodyTextComponent,
		BreadcrumbsComponent,
		BreadcrumbsItemComponent,
		ButtonComponent,
		CheckboxComponent,
		CheckboxGroupComponent,
		ContentDirective,
		DatepickerComponent,
		DateRangeComponent,
		DescriptionListComponent,
		DescriptionListItemComponent,
		DescriptionListItemTermComponent,
		DescriptionListItemDetailsComponent,
		DialogComponent,
		DialogTitleDirective,
		DialogContentDirective,
		DialogCloseDirective,
		DialogActionsDirective,
		DropdownComponent,
		DropdownMenuComponent,
		DropdownMenuItemComponent,
		ErrorMessageComponent,
		ExpandableComponent,
		FooterComponent,
		FooterContentLeftDirective,
		FooterContentRightDirective,
		FieldSetComponent,
		FormComponent,
		GridComponent,
		GridDirective,
		GridItemComponent,
		GridItemDirective,
		GuidanceComponent,
		HeaderDirective,
		HeadingComponent,
		IconComponent,
		InputWithLanguageOptionsComponent,
		LanguageBadgeGroupComponent,
		LinkComponent,
		NotificationComponent,
		NotificationsDirective,
		RadioButtonGroupComponent,
		SectionComponent,
		SelectComponent,
		SelectOptionComponent,
		SelectGroupComponent,
		SpacingDirective,
		TextAreaComponent,
		TextInputComponent,
		TooltipDirective,
	],
	providers: [
		FudisAlertService,
		FudisBreakpointService,
		FudisDialogService,
		FudisErrorSummaryService,
		FudisInternalErrorSummaryService,
		FudisFocusService,
		FudisGridService,
		FudisIdService,
		FudisLanguageBadgeGroupService,
		FudisErrorSummaryService,
		FudisTranslationService,
	],
})
export class NgxFudisModule {}
