/**
 * Angular & ngMaterial
 */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

/**
 * Fudis Components
 */
import { AutocompleteComponent } from './components/form/autocomplete/autocomplete.component';
import { AlertComponent } from './components/alert/alert/alert.component';
import { AlertGroupComponent } from './components/alert/alert-group/alert-group.component';
import { BadgeComponent } from './components/badge/badge.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbsItemComponent } from './components/breadcrumbs/breadcrumbs-item/breadcrumbs-item.component';
import { BodyTextComponent } from './components/typography/body-text/body-text.component';
import { ButtonComponent } from './components/button/button.component';
import { HorizontalRuleComponent } from './components/horizontal-rule/horizontal-rule.component';
import { CheckboxComponent } from './components/form/checkbox-group/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './components/form/checkbox-group/checkbox-group.component';
import { DatepickerComponent } from './components/form/date/datepicker/datepicker.component';
import { DateRangeComponent } from './components/form/date/date-range/date-range.component';
import { DescriptionListComponent } from './components/description-list/description-list.component';
import { DescriptionListItemComponent } from './components/description-list/description-list-item/description-list-item.component';
import { DescriptionListItemDetailsComponent } from './components/description-list/description-list-item/description-list-item-details/description-list-item-details.component';
import { DescriptionListItemTermComponent } from './components/description-list/description-list-item/description-list-item-term/description-list-item-term.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DropdownMenuItemComponent } from './components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.component';
import { DropdownMenuGroupComponent } from './components/dropdown-menu/dropdown-menu-group/dropdown-menu-group.component';
import { ErrorMessageComponent } from './components/form/error-message/error-message/error-message.component';
import { ErrorSummaryComponent } from './components/form/error-summary/error-summary.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { FieldSetComponent } from './components/form/fieldset/fieldset.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form/form.component';
import { GridComponent } from './components/grid/grid/grid.component';
import { GridItemComponent } from './components/grid/grid-item/grid-item.component';
import { GuidanceComponent } from './components/form/guidance/guidance.component';
import { HeadingComponent } from './components/typography/heading/heading.component';
import { IconComponent } from './components/icon/icon.component';
import { LocalizedTextGroupComponent } from './components/form/localized-text-group/localized-text-group.component';
import { LabelComponent } from './components/form/label/label.component';
import { LanguageBadgeComponent } from './components/language-badge-group/language-badge/language-badge.component';
import { LanguageBadgeGroupComponent } from './components/language-badge-group/language-badge-group.component';
import { LinkComponent } from './components/link/link.component';
import { MultiselectChipListComponent } from './components/form/select/multiselect/multiselect-chip-list/multiselect-chip-list.component';
import { MultiselectComponent } from './components/form/select/multiselect/multiselect.component';
import { MultiselectOptionComponent } from './components/form/select/multiselect/multiselect-option/multiselect-option.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RadioButtonComponent } from './components/form/radio-button-group/radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './components/form/radio-button-group/radio-button-group.component';
import { SectionComponent } from './components/section/section.component';
import { TextAreaComponent } from './components/form/text-area/text-area.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { SelectComponent } from './components/form/select/select/select.component';
import { SelectAutocompleteComponent } from './components/form/select/common/autocomplete/autocomplete.component';
import { SelectOptionComponent } from './components/form/select/select/select-option/select-option.component';
import { SelectDropdownComponent } from './components/form/select/common/select-dropdown/select-dropdown.component';
import { SelectGroupComponent } from './components/form/select/common/select-group/select-group.component';
import { SelectIconsComponent } from './components/form/select/common/select-icons/select-icons.component';
import { ValidatorErrorMessageComponent } from './components/form/error-message/validator-error-message/validator-error-message.component';

/**
 * Fudis Directives
 */
import { ActionsDirective } from './directives/content-projection/actions/actions.directive';
import {
  ContentDirective,
  FooterContentLeftDirective,
  FooterContentRightDirective,
} from './directives/content-projection/content/content.directive';
import { ControlComponentBaseDirective } from './directives/form/control-component-base/control-component-base.directive';
import {
  DateEndDirective,
  DateStartDirective,
} from './directives/form/datepicker/datepicker.directive';
import {
  DialogCloseDirective,
  DialogContentDirective,
  DialogTitleDirective,
  DialogActionsDirective,
} from './directives/dialog/dialog-directives';
import { DropdownBaseDirective } from './directives/form/dropdown-base/dropdown-base.directive';
import { DropdownItemBaseDirective } from './directives/form/dropdown-item-base/dropdown-item-base.directive';
import { FormCommonApiDirective } from './directives/form/form-common-api/form-common-api.directive';
import { FormSubmitDirective } from './directives/form/form-actions/form-actions.directive';
import { GridApiDirective } from './directives/grid/grid-api/grid-api.directive';
import { GridDirective } from './directives/grid/grid/grid.directive';
import { GridItemDirective } from './directives/grid/grid-item/grid-item.directive';
import { GroupComponentBaseDirective } from './directives/form/group-component-base/group-component-base.directive';
import { HeaderDirective } from './directives/content-projection/header/header.directive';
import { LinkApiDirective } from './directives/link/link-api/link-api.directive';
import { LinkDirective } from './directives/link/link.directive';
import { NotificationsDirective } from './directives/content-projection/notifications/notifications.directive';
import { SelectBaseDirective } from './components/form/select/common/select-base/select-base.directive';
import { SelectOptionBaseDirective } from './components/form/select/common/select-option-base/select-option-base.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';

/**
 * Fudis Services
 */
import { FudisAlertService } from './services/alert/alert.service';
import { FudisBreakpointService } from './services/breakpoint/breakpoint.service';
import { FudisDialogService } from './services/dialog/dialog.service';
import { FudisDOMUtilitiesService } from './services/dom/dom-utilities.service';
import { FudisFocusService } from './services/focus/focus.service';
import { FudisErrorSummaryService } from './services/form/error-summary/error-summary.service';
import { FudisGridService } from './services/grid/grid.service';
import { FudisIdService } from './services/id/id.service';
import { FudisInternalErrorSummaryService } from './services/form/error-summary/internal-error-summary.service';
import { FudisTranslationService } from './services/translation/translation.service';

@NgModule({
  /*
   * Include both internal and external Fudis components in 'declarations' array below.
   */
  declarations: [
    ActionsDirective,
    AutocompleteComponent,
    AlertComponent,
    AlertGroupComponent,
    BadgeComponent,
    BodyTextComponent,
    BreadcrumbsComponent,
    BreadcrumbsItemComponent,
    ButtonComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    ControlComponentBaseDirective,
    ContentDirective,
    DatepickerComponent,
    DateRangeComponent,
    DateStartDirective,
    DateEndDirective,
    DescriptionListComponent,
    DescriptionListItemComponent,
    DescriptionListItemTermComponent,
    DescriptionListItemDetailsComponent,
    DialogTitleDirective,
    DialogComponent,
    DialogActionsDirective,
    DialogContentDirective,
    DialogCloseDirective,
    DropdownBaseDirective,
    DropdownMenuGroupComponent,
    DropdownMenuComponent,
    DropdownItemBaseDirective,
    DropdownMenuItemComponent,
    ErrorMessageComponent,
    ErrorSummaryComponent,
    ExpandableComponent,
    FieldSetComponent,
    FooterComponent,
    FooterContentLeftDirective,
    FooterContentRightDirective,
    FormCommonApiDirective,
    FormComponent,
    FormSubmitDirective,
    GridComponent,
    GridApiDirective,
    GridDirective,
    GridItemComponent,
    GridItemDirective,
    GroupComponentBaseDirective,
    GuidanceComponent,
    HeaderDirective,
    HeadingComponent,
    HorizontalRuleComponent,
    IconComponent,
    LocalizedTextGroupComponent,
    LabelComponent,
    LanguageBadgeComponent,
    LanguageBadgeGroupComponent,
    LinkApiDirective,
    LinkComponent,
    LinkDirective,
    MultiselectComponent,
    MultiselectChipListComponent,
    MultiselectOptionComponent,
    NotificationComponent,
    NotificationsDirective,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    SectionComponent,
    SelectAutocompleteComponent,
    SelectBaseDirective,
    SelectComponent,
    SelectDropdownComponent,
    SelectGroupComponent,
    SelectOptionBaseDirective,
    SelectOptionComponent,
    TextInputComponent,
    TextAreaComponent,
    TooltipDirective,
    ValidatorErrorMessageComponent,
    SelectIconsComponent,
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
    DateStartDirective,
    DateEndDirective,
    DescriptionListComponent,
    DescriptionListItemComponent,
    DescriptionListItemTermComponent,
    DescriptionListItemDetailsComponent,
    DialogComponent,
    DialogTitleDirective,
    DialogContentDirective,
    DialogCloseDirective,
    DialogActionsDirective,
    DropdownMenuGroupComponent,
    DropdownMenuComponent,
    DropdownMenuItemComponent,
    ErrorMessageComponent,
    ExpandableComponent,
    FooterComponent,
    FooterContentLeftDirective,
    FooterContentRightDirective,
    FieldSetComponent,
    FormComponent,
    FormSubmitDirective,
    GridComponent,
    GridDirective,
    GridItemComponent,
    GridItemDirective,
    HeaderDirective,
    HeadingComponent,
    HorizontalRuleComponent,
    IconComponent,
    LocalizedTextGroupComponent,
    LanguageBadgeGroupComponent,
    LinkComponent,
    LinkDirective,
    MultiselectComponent,
    MultiselectOptionComponent,
    NotificationComponent,
    NotificationsDirective,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    SectionComponent,
    SelectComponent,
    SelectOptionComponent,
    SelectGroupComponent,
    TextAreaComponent,
    TextInputComponent,
    TooltipDirective,
  ],
  providers: [
    FudisAlertService,
    FudisBreakpointService,
    FudisDialogService,
    FudisDOMUtilitiesService,
    FudisErrorSummaryService,
    FudisInternalErrorSummaryService,
    FudisFocusService,
    FudisGridService,
    FudisIdService,
    FudisTranslationService,
  ],
})
export class NgxFudisModule {}
