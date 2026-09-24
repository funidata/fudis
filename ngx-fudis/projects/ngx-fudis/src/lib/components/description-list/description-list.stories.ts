import { StoryFn, Meta, moduleMetadata } from '@storybook/angular-vite';
import { action } from 'storybook/actions';
import { Component } from '@angular/core';
import { DescriptionListComponent } from './description-list.component';
import docs from './description-list.mdx';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import {
  descriptionListEmptyState,
  descriptionListExclude,
  nestedDescriptionListExclude,
} from '../../utilities/storybook';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { ButtonComponent } from '../button/button.component';
import { GridComponent } from '../grid/grid/grid.component';

@Component({
  selector: 'example-language-service-change-component',
  imports: [ButtonComponent, GridComponent],
  template: `
    <fudis-grid [columns]="3" [width]="'sm'">
      <fudis-button
        [label]="'Change to: fi, sv'"
        (handleClick)="changeBadgeLanguages(['fi', 'sv'])"
      />
      <fudis-button
        [label]="'Change to: sv, en'"
        (handleClick)="changeBadgeLanguages(['sv', 'en'])"
      />
      <fudis-button
        [label]="'Change to: sv, fi, en'"
        (handleClick)="changeBadgeLanguages(['sv', 'fi', 'en'])"
      />
      <fudis-button [label]="'Set App Lang to En'" (handleClick)="changeAppLang('en')" />
      <fudis-button [label]="'Set App Lang to Fi'" (handleClick)="changeAppLang('fi')" />
      <fudis-button [label]="'Set App Lang to Sv'" (handleClick)="changeAppLang('sv')" />
    </fudis-grid>
  `,
})
class LanguageChangeComponent {
  constructor(private _languageService: FudisTranslationService) {
    this._languageService.setSelectableLanguages(['fi', 'sv', 'en']);
  }

  changeBadgeLanguages(languages: FudisLanguageAbbr[]): void {
    this._languageService.setSelectableLanguages(languages);
  }
  changeAppLang(lang: FudisLanguageAbbr): void {
    this._languageService.setLanguage(lang);
  }
}

const html = String.raw;

export default {
  title: 'Components/Description List',
  component: DescriptionListComponent,
  decorators: [
    moduleMetadata({
      imports: [LanguageChangeComponent],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: descriptionListExclude,
    },
  },
} as Meta;

const DescriptionListTemplate: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-heading [level]="2" [variant]="'md'"
      >{{variant==='regular' ? 'Regular' : 'Compact'}} Description List</fudis-heading
    >
    <fudis-dl
      [classes]="'fudis-mt-sm'"
      [variant]="variant"
      [columns]="2"
      [disableGrid]="disableGrid"
    >
      <fudis-dl-item>
        <fudis-dt [contentText]="'First name'"></fudis-dt>
        <fudis-dd [contentText]="'Aino'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Last name'"></fudis-dt>
        <fudis-dd [contentText]="'Laine'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Student ID'"></fudis-dt>
        <fudis-dd [contentText]="'STU-2026-0142'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Programme'"></fudis-dt>
        <fudis-dd [contentText]="'Bachelor of Science'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Study status'"></fudis-dt>
        <fudis-dd [contentText]="'Enrolled'" [subHeading]="'Academic standing'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
  `,
});

export const DescriptionList = DescriptionListTemplate.bind({});
DescriptionList.args = {
  variant: 'regular',
  disableGrid: false,
};

export const DescriptionListCompact = DescriptionListTemplate.bind({});
DescriptionListCompact.args = {
  variant: 'compact',
  disableGrid: false,
};

const NestedDescriptionListsTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    quoteOne: 'Autumn 2026',
    quoteTwo: 'Spring 2027',
  },
  template: html`
    <fudis-heading [level]="2" [variant]="'md'"
      >Nested Description Lists with Course Information</fudis-heading
    >
    <fudis-dl [classes]="'fudis-mt-sm'" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [contentText]="'Introduction to Data Science'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Course code'"></fudis-dt>
              <fudis-dd [contentText]="'CS-101'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Credits'"></fudis-dt>
              <fudis-dd [contentText]="'5 ECTS'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Teaching period'"></fudis-dt>
              <fudis-dd [contentText]="quoteOne"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Academic Writing'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Course code'"></fudis-dt>
              <fudis-dd [contentText]="'LANG-210'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Credits'"></fudis-dt>
              <fudis-dd [contentText]="'3 ECTS'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Teaching period'"></fudis-dt>
              <fudis-dd [contentText]="'Autumn 2026'"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Research Methods'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Course code'"></fudis-dt>
              <fudis-dd [contentText]="'RES-305'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Credits'"></fudis-dt>
              <fudis-dd [contentText]="'5 ECTS'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Assessment method'"></fudis-dt>
              <fudis-dd [contentText]="'Examination and research proposal'"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Sustainable Development'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Course code'"></fudis-dt>
              <fudis-dd [contentText]="'SUS-220'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Credits'"></fudis-dt>
              <fudis-dd [contentText]="'5 ECTS'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Teaching period'"></fudis-dt>
              <fudis-dd [contentText]="'Spring 2027'"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Project Management'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Course code'"></fudis-dt>
              <fudis-dd [contentText]="'BUS-315'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Credits'"></fudis-dt>
              <fudis-dd [contentText]="'3 ECTS'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Teaching period'"></fudis-dt>
              <fudis-dd [contentText]="quoteTwo"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
  `,
});

export const NestedDescriptionLists = NestedDescriptionListsTemplate.bind({});
NestedDescriptionLists.args = {
  disableGrid: false,
};

NestedDescriptionLists.parameters = {
  controls: {
    exclude: nestedDescriptionListExclude,
  },
};

const DescriptionListInsideGridTemplate: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-grid [columns]="{sm: 1, md: 2}" [rowGap]="'xs'">
    <fudis-heading [level]="2" [variant]="'md'"
      >Description List as Grid's Child Component</fudis-heading
    >
    <fudis-dl [disableGrid]="disableGrid" [variant]="variant">
      <fudis-dl-item>
        <fudis-dt [contentText]="'Teacher email'"></fudis-dt>
        <fudis-dd
          [contentText]="'advisor@university.example'"
          [subHeading]="'Academic advisor'"
        ></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Course name'"></fudis-dt>
        <fudis-dd [contentText]="'Introduction to Data Science'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
    <fudis-body-text
      >This is Body Text. Both this and the DL next to it are Grid Items inside
      Grid.</fudis-body-text
    >
  </fudis-grid>`,
});

export const DescriptionListInsideGrid = DescriptionListInsideGridTemplate.bind({});

DescriptionListInsideGrid.args = {
  variant: 'regular',
  disableGrid: true,
};

const NestedSubComponentsTemplate: StoryFn = (args) => ({
  props: { ...args, classified: action('classified') },
  template: html`<fudis-heading [level]="2" [variant]="'md'"
      >Description List With Sub Components</fudis-heading
    >
    <fudis-dl
      class="fudis-mt-sm"
      [disableGrid]="disableGrid"
      [variant]="variant"
      [columns]="columns"
    >
      <fudis-dl-item>
        <fudis-dt
          [contentText]="'First name'"
          [popoverText]="'Name shown in the student register'"
          [popoverPosition]="'right'"
          [popoverTriggerLabel]="'Additional information'"
        ></fudis-dt>
        <fudis-dd [contentText]="'Aino'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Last name'"></fudis-dt>
        <fudis-dd
          [contentText]="classified ? '&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' : 'Laine'"
          [ariaLabel]="classified ? 'Hidden personal information' : null"
        >
          <fudis-icon-button
            [variant]="'tertiary'"
            [size]="'extra-small'"
            [icon]="classified ? 'eye' : 'eye-blind'"
            [ariaLabel]="classified ? 'Show details' : 'Hide details'"
            (handleClick)="classified = !classified"
          ></fudis-icon-button>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Study programme'"></fudis-dt>
        <fudis-dd [contentText]="'Bachelor of Science'">
          <fudis-button [label]="'Edit'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Academic advisor'">Academic advisor</fudis-dt>
        <fudis-dd [contentText]="'Mika Virtanen'" [subHeading]="'Student services'">
          <fudis-button [label]="'Read more'" [variant]="'secondary'" [size]="'small'" />
        </fudis-dd>
      </fudis-dl-item>
    </fudis-dl> `,
});

export const NestedSubComponents = NestedSubComponentsTemplate.bind({});
NestedSubComponents.args = {
  variant: 'regular',
  columns: { xs: 1, sm: 2 },
  disableGrid: false,
};

const WithLanguageBadgesTemplate: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-heading [level]="2" [variant]="'md'"
      >Description List With Language Badges</fudis-heading
    >
    <fudis-dl
      class="fudis-mt-sm fudis-mb-sm"
      [disableGrid]="disableGrid"
      [variant]="variant"
      [serviceDefaults]="serviceDefaults"
      [columns]="columns"
    >
      <fudis-dl-item>
        <fudis-dt [contentText]="'Programme description'"></fudis-dt>
        <fudis-dd [lang]="'sv'" [contentText]="'Programbeskrivning på svenska'"></fudis-dd>
        <fudis-dd [lang]="'en'" [contentText]="'Programme description in English'"></fudis-dd>
        <fudis-dd [lang]="'fi'" [contentText]="'Koulutusohjelman kuvaus suomeksi'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Course information without English translation'"></fudis-dt>
        <fudis-dd [lang]="'fi'" [contentText]="'Kurssin perustiedot'"></fudis-dd>
        <fudis-dd [lang]="'en'" [contentText]="''"></fudis-dd>
        <fudis-dd [lang]="'sv'" [contentText]="'Kursens grunduppgifter'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Learning outcomes in different languages'"></fudis-dt>
        <fudis-dd [lang]="'fi'" [contentText]="'Tunnistaa keskeiset käsitteet'"></fudis-dd>
        <fudis-dd [lang]="'fi'" [contentText]="'Soveltaa opittua käytäntöön'"></fudis-dd>
        <fudis-dd [lang]="'fi'" [contentText]="'Arvioi omaa oppimistaan'"></fudis-dd>

        <fudis-dd [lang]="'en'" [contentText]="'Identify key concepts'"></fudis-dd>
        <fudis-dd [lang]="'en'" [contentText]="'Apply learning in practice'"></fudis-dd>
        <fudis-dd [lang]="'en'" [contentText]="'Evaluate personal learning'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
    <example-language-service-change-component /> `,
});

export const WithLanguageBadges = WithLanguageBadgesTemplate.bind({});
WithLanguageBadges.args = {
  variant: 'regular',
  serviceDefaults: false,
  columns: '1fr 1fr',
  disableGrid: false,
};

const multipleDDData = [
  { value: 'Aino Laine' },
  { value: 'Mika Virtanen' },
  { value: 'Sofia Niemi' },
  { value: 'Elias Korhonen' },
  { value: 'Emma Maki' },
  { value: 'Oskari Lehtonen' },
  { value: 'Lina Salonen' },
  { value: 'Noah Heikkinen' },
  { value: 'Iida Koskinen' },
  { value: 'Joonas Lahti' },
  { value: 'Ella Aalto' },
  { value: 'Veera Ranta' },
  { value: 'Antti Saarinen' },
  { value: 'Laura Kivi' },
  { subHeading: 'Programme director', value: 'Kari Hietala' },
];

const ItemWithMultipleDdElementsTemplate: StoryFn = (args) => ({
  props: { ...args, data: multipleDDData },
  template: html`
    <fudis-heading [level]="2" [variant]="'md'"
      >Description List Item With Multiple Details</fudis-heading
    >
    <fudis-dl
      class="fudis-mt-sm"
      [columns]="'1fr 1fr'"
      [disableGrid]="disableGrid"
      [variant]="variant"
    >
      <fudis-dl-item>
        <fudis-dt [contentText]="'Members of the programme committee'"></fudis-dt>
        @for (item of data; track item.value) {
        <fudis-dd [contentText]="item.value" [subHeading]="item.subHeading"></fudis-dd>
        }
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Student representatives'"></fudis-dt>
        <fudis-dd [contentText]="'Aino Laine'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
  `,
});

export const ItemWithMultipleDdElements = ItemWithMultipleDdElementsTemplate.bind({});
ItemWithMultipleDdElements.args = {
  variant: 'regular',
  disableGrid: false,
  serviceDefaults: false,
};

const SingleListItemTemplate: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-heading [level]="2" [variant]="'md'">Description List with Single Item</fudis-heading>
    <fudis-dl
      class="fudis-mt-sm"
      [variant]="'regular'"
      [columns]="'1fr 1fr'"
      [disableGrid]="disableGrid"
      [variant]="variant"
      [tag]="'p'"
    >
      <fudis-dl-item>
        <fudis-dt [contentText]="'Address'"></fudis-dt>
        <fudis-dd
          [contentText]="'Faculty of Computing'"
          [subHeading]="'University campus'"
        ></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
  `,
});

export const SingleListItem = SingleListItemTemplate.bind({});
SingleListItem.args = {
  variant: 'regular',
  disableGrid: false,
};

const EmptyStateTemplate: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-heading [level]="2" [variant]="'md'">Details With Empty States</fudis-heading>
    <fudis-dl [classes]="'fudis-mt-sm'" [variant]="variant" [columns]="2">
      <fudis-dl-item>
        <fudis-dt [contentText]="'Education type'" />
        <fudis-dd [contentText]="'Open university studies'" [emptyState]="emptyState" />
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Location'" />
        <fudis-dd
          [contentText]="'Helsinki'"
          [emptyState]="emptyState"
          [emptyStateContentText]="emptyStateContentText"
        />
      </fudis-dl-item>
    </fudis-dl>
  `,
});

export const EmptyState = EmptyStateTemplate.bind({});
EmptyState.args = {
  variant: 'regular',
  emptyState: true,
  emptyStateContentText: 'Custom message',
};

EmptyState.parameters = {
  controls: {
    exclude: descriptionListEmptyState,
  },
};
