/**
 * Angular & ngMaterial
 */
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

/**
 * Fudis Components
 */
import { AlertComponent } from './components/alert/alert/alert.component';
import { AlertGroupComponent } from './components/alert/alert-group/alert-group.component';
import { BadgeComponent } from './components/badge/badge.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbsItemComponent } from './components/breadcrumbs/breadcrumbs-item/breadcrumbs-item.component';
import { BodyTextComponent } from './components/typography/body-text/body-text.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/form/checkbox/checkbox.component';
import { CheckboxGroupComponent } from './components/form/checkbox-group/checkbox-group.component';
import { CheckboxGroupOptionComponent } from './components/form/checkbox-group/checkbox-group-option/checkbox-group-option.component';
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
import { ErrorSummaryComponent } from './components/form/error-summary/error-summary.component';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { FieldSetComponent } from './components/form/fieldset/fieldset.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form/form.component';
import { GridComponent } from './components/grid/grid/grid.component';
import { GridItemComponent } from './components/grid/grid-item/grid-item.component';
import { GuidanceComponent } from './components/form/guidance/guidance.component';
import { HeadingComponent } from './components/typography/heading/heading.component';
import { HorizontalRuleComponent } from './components/horizontal-rule/horizontal-rule.component';
import { IconComponent } from './components/icon/icon.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LocalizedTextGroupComponent } from './components/form/localized-text-group/localized-text-group.component';
import { LabelComponent } from './components/form/label/label.component';
import { LanguageBadgeComponent } from './components/language-badge-group/language-badge/language-badge.component';
import { LanguageBadgeGroupComponent } from './components/language-badge-group/language-badge-group.component';
import { MultiselectChipListComponent } from './components/form/select/multiselect/multiselect-chip-list/multiselect-chip-list.component';
import { MultiselectComponent } from './components/form/select/multiselect/multiselect.component';
import { MultiselectOptionComponent } from './components/form/select/multiselect/multiselect-option/multiselect-option.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RadioButtonComponent } from './components/form/radio-button-group/radio-button/radio-button.component';
import { RadioButtonGroupComponent } from './components/form/radio-button-group/radio-button-group.component';
import { SectionComponent } from './components/section/section.component';
import { SelectComponent } from './components/form/select/select/select.component';
import { SelectOptionComponent } from './components/form/select/select/select-option/select-option.component';
import { SelectDropdownComponent } from './components/form/select/common/select-dropdown/select-dropdown.component';
import { SelectGroupComponent } from './components/form/select/common/select-group/select-group.component';
import { SelectIconsComponent } from './components/form/select/common/select-icons/select-icons.component';
import { TabNavigationBarComponent } from './components/tab-navigation/tab-navigation-bar.component';
import { TabNavigationPanelComponent } from './components/tab-navigation/tab-navigation-panel.component';
import { TabNavigationTabComponent } from './components/tab-navigation/tab-navigation-tab.component';
import { TextAreaComponent } from './components/form/text-area/text-area.component';
import { TextInputComponent } from './components/form/text-input/text-input.component';
import { ValidatorErrorMessageComponent } from './components/form/error-message/validator-error-message/validator-error-message.component';

/**
 * Fudis Directives
 */
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
} from './components/dialog/dialog-directives';
import { DropdownBaseDirective } from './directives/form/dropdown-base/dropdown-base.directive';
import { DropdownItemBaseDirective } from './directives/form/dropdown-item-base/dropdown-item-base.directive';
import {
  ExpandableActionsDirective,
  ExpandableContentDirective,
} from './components/expandable/expandable-content.directive';
import { ErrorMessageDirective } from './components/form/error-message/error-message/error-message.directive';
import {
  FieldsetActionsDirective,
  FieldsetContentDirective,
} from './components/form/fieldset/fieldset-content.directive';
import { FormCommonApiDirective } from './directives/form/form-common-api/form-common-api.directive';
import { FormSubmitDirective } from './directives/form/form-actions/form-actions.directive';
import {
  FormActionsDirective,
  FormContentDirective,
  FormHeaderDirective,
} from './components/form/form/form-content.directive';
import { GridApiDirective } from './directives/grid/grid-api/grid-api.directive';
import { GridDirective } from './directives/grid/grid/grid.directive';
import { GridItemDirective } from './directives/grid/grid-item/grid-item.directive';
import { GroupComponentBaseDirective } from './directives/form/group-component-base/group-component-base.directive';
import { LinkDirective } from './directives/link/link.directive';
import {
  SectionActionsDirective,
  SectionContentDirective,
} from './components/section/section-content.directive';
import { SelectBaseDirective } from './components/form/select/common/select-base/select-base.directive';
import {
  SelectAutocompleteDirective,
  SelectAutocompleteBaseDirective,
  MultiselectAutocompleteDirective,
} from './components/form/select/common/autocomplete/autocomplete.directive';
import {
  SelectControlValueAccessorDirective,
  MultiselectControlValueAccessorDirective,
} from './components/form/select/common/select-control-value-accessor/select-control-value-accessor.directive';
import { SelectOptionBaseDirective } from './components/form/select/common/select-option-base/select-option-base.directive';
import { SelectOptionsDirective } from './components/form/select/common/select-options-directive/select-options.directive';
import { TextFieldComponentBaseDirective } from './directives/form/text-field-component-base/text-field-component-base.directive';

/**
 * Fudis Services
 */
import { FudisAlertService } from './services/alert/alert.service';
import { FudisBreakpointService } from './services/breakpoint/breakpoint.service';
import { FudisDialogService } from './services/dialog/dialog.service';
import { FudisFocusService } from './services/focus/focus.service';
import { FudisErrorSummaryService } from './services/form/error-summary/error-summary.service';
import { FudisGridService } from './services/grid/grid.service';
import { FudisIdService } from './services/id/id.service';
import { FudisInternalErrorSummaryService } from './services/form/error-summary/internal-error-summary.service';
import { FudisTranslationService } from './services/translation/translation.service';
import { PopoverDirective } from './directives/popover/popover.directive';

@NgModule({
  /*
   * Include both internal and external non-standalone Fudis components in 'declarations' array below.
   */
  declarations: [
    AlertComponent,
    AlertGroupComponent,
    BreadcrumbsComponent,
    BreadcrumbsItemComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxGroupOptionComponent,
    ControlComponentBaseDirective,
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
    ErrorMessageDirective,
    ErrorSummaryComponent,
    ExpandableComponent,
    ExpandableActionsDirective,
    ExpandableContentDirective,
    FieldsetActionsDirective,
    FieldsetContentDirective,
    FieldSetComponent,
    FooterComponent,
    FormCommonApiDirective,
    FormComponent,
    FormActionsDirective,
    FormContentDirective,
    FormHeaderDirective,
    FormSubmitDirective,
    GridComponent,
    GridApiDirective,
    GridDirective,
    GridItemComponent,
    GridItemDirective,
    GroupComponentBaseDirective,
    GuidanceComponent,
    HeadingComponent,
    LocalizedTextGroupComponent,
    LabelComponent,
    LanguageBadgeComponent,
    LanguageBadgeGroupComponent,
    LinkDirective,
    MultiselectComponent,
    MultiselectChipListComponent,
    MultiselectOptionComponent,
    NotificationComponent,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    SectionComponent,
    SectionActionsDirective,
    SectionContentDirective,
    SelectAutocompleteBaseDirective,
    SelectAutocompleteDirective,
    SelectBaseDirective,
    SelectComponent,
    SelectControlValueAccessorDirective,
    MultiselectAutocompleteDirective,
    MultiselectControlValueAccessorDirective,
    SelectDropdownComponent,
    SelectGroupComponent,
    SelectIconsComponent,
    SelectOptionsDirective,
    SelectOptionBaseDirective,
    SelectOptionComponent,
    TextAreaComponent,
    TextFieldComponentBaseDirective,
    TextInputComponent,
    ValidatorErrorMessageComponent,
  ],
  /*
   * Include imports outside of Fudis components in 'imports' array below, e.g. Angular Material components and other Angular tools.
   * Also import Fudis standalone components here. 
   */
  imports: [
    BadgeComponent,
    BodyTextComponent,
    ButtonComponent,
    CommonModule,
    FormsModule,
    HorizontalRuleComponent,
    IconButtonComponent,
    IconComponent,
    LayoutModule,
    LoadingSpinnerComponent,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    PaginationComponent,
    ReactiveFormsModule,
    RouterModule,
    ScrollingModule,
    TabNavigationBarComponent,
    TabNavigationPanelComponent,
    TabNavigationTabComponent,
    PopoverDirective,
  ],

  /*
   * Add Fudis components, including all standalone components, in 'exports' array below.
   * Export them in public-api.ts as well, when you want to expose them outside of the library.
   */
  exports: [
    AlertComponent,
    AlertGroupComponent,
    BadgeComponent,
    BodyTextComponent,
    BreadcrumbsComponent,
    BreadcrumbsItemComponent,
    ButtonComponent,
    CheckboxComponent,
    CheckboxGroupComponent,
    CheckboxGroupOptionComponent,
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
    ErrorMessageDirective,
    ExpandableComponent,
    ExpandableActionsDirective,
    ExpandableContentDirective,
    FooterComponent,
    FieldsetActionsDirective,
    FieldsetContentDirective,
    FieldSetComponent,
    FormComponent,
    FormActionsDirective,
    FormContentDirective,
    FormHeaderDirective,
    FormSubmitDirective,
    GridComponent,
    GridDirective,
    GridItemComponent,
    GridItemDirective,
    HeadingComponent,
    HorizontalRuleComponent,
    IconComponent,
    IconButtonComponent,
    LocalizedTextGroupComponent,
    LanguageBadgeGroupComponent,
    LinkDirective,
    LoadingSpinnerComponent,
    MultiselectComponent,
    MultiselectOptionComponent,
    NotificationComponent,
    PaginationComponent,
    PopoverDirective,
    RadioButtonComponent,
    RadioButtonGroupComponent,
    SectionComponent,
    SectionActionsDirective,
    SectionContentDirective,
    SelectComponent,
    SelectOptionComponent,
    SelectOptionsDirective,
    SelectGroupComponent,
    TabNavigationBarComponent,
    TabNavigationPanelComponent,
    TabNavigationTabComponent,
    TextAreaComponent,
    TextInputComponent,
  ],
  providers: [
    FudisInternalErrorSummaryService,
    FudisDialogService,
    FudisBreakpointService,
    FudisErrorSummaryService,
    FudisAlertService,
  ],
})
export class NgxFudisModule {
  static forRoot(): ModuleWithProviders<NgxFudisModule> {
    return {
      ngModule: NgxFudisModule,
      providers: [FudisFocusService, FudisGridService, FudisIdService, FudisTranslationService],
    };
  }
}
