import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { DescriptionListComponent } from './description-list.component';
import docs from './docs.mdx';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import { descriptionListExclude } from '../../utilities/storybook';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'example-language-service-change-component',
  template: `
    <fudis-grid [columns]="3" [width]="'sm'">
      <fudis-button
        [id]="'lang-btn-1'"
        [label]="'Change to: fi, sv'"
        (handleClick)="changeBadgeLanguages(['fi', 'sv'])"
      />
      <fudis-button
        [id]="'lang-btn-2'"
        [label]="'Change to: sv, en'"
        (handleClick)="changeBadgeLanguages(['sv', 'en'])"
      />
      <fudis-button
        [id]="'lang-btn-3'"
        [label]="'Change to: sv, fi, en'"
        (handleClick)="changeBadgeLanguages(['sv', 'fi', 'en'])"
      />
    </fudis-grid>
  `,
})
class LanguageChangeComponent {
  constructor(private _languageService: FudisTranslationService) {
    this._languageService.setBadgeGroupLanguages(['fi', 'sv', 'en']);
  }

  changeBadgeLanguages(languages: FudisLanguageAbbr[]): void {
    this._languageService.setBadgeGroupLanguages(languages);
  }
}

const html = String.raw;

export default {
  title: 'Components/Description List',
  component: DescriptionListComponent,
  decorators: [
    moduleMetadata({
      declarations: [LanguageChangeComponent],
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

const DescriptionListTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html` <fudis-heading>Basic Description list</fudis-heading>
    <fudis-dl
      [marginBottom]="'md'"
      [marginTop]="'md'"
      [variant]="variant"
      [columns]="'1fr 1fr'"
      [rowGap]="rowGap"
      [disableGrid]="disableGrid"
    >
      <fudis-dl-item>
        <fudis-dt>First name</fudis-dt>
        <fudis-dd>Rex</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Last name</fudis-dt>
        <fudis-dd>Dangerwest</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Alias</fudis-dt>
        <fudis-dd>Radical Emmet Xtreme</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Voice actor</fudis-dt>
        <fudis-dd>Chris Pratt</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Enemy</fudis-dt>
        <fudis-dd [subHeading]="'Archenemy'">Emmet Brickowski</fudis-dd>
      </fudis-dl-item>
    </fudis-dl>`,
});

export const DescriptionList = DescriptionListTemplate.bind({});
DescriptionList.args = {
  variant: 'compact',
  rowGap: 'sm',
  disableGrid: false,
};

const DescriptionListInsideGridTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`<fudis-grid [columns]="{sm: 1, md: 2}" [rowGap]="'xs'">
    <fudis-heading [level]="2" [size]="'md'"
      >Grid where DL is used as child component</fudis-heading
    >
    <fudis-dl [disableGrid]="disableGrid" [variant]="variant">
      <fudis-dl-item>
        <fudis-dt>Teacher email</fudis-dt>
        <fudis-dd [subHeading]="'Severus Snape'">snape@hogwarts.wiz</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Course name</fudis-dt>
        <fudis-dd>Defense Against the Dark Arts</fudis-dd>
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

const DescriptionListWithSubComponentsTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`<fudis-heading [level]="2" [size]="'md'"
      >Description list with example sub components</fudis-heading
    >
    <fudis-description-list
      [marginBottom]="'md'"
      [disableGrid]="disableGrid"
      [variant]="variant"
      [columns]="columns"
      [rowGap]="rowGap"
    >
      <fudis-dl-item>
        <fudis-dt>First name</fudis-dt>
        <fudis-dd>Rex</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Last name</fudis-dt>
        <fudis-dd>Dangerwest</fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Alias</fudis-dt>
        <fudis-dd
          >Radical Emmet Xtreme
          <ng-template fudisActions [type]="'dd'">
            <fudis-button
              [label]="'Edit'"
              [variant]="'tertiary'"
              [size]="'small'"
              [icon]="'edit'"
            />
          </ng-template>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt>Enemy</fudis-dt>
        <fudis-dd [subHeading]="'Archenemy'"
          >Emmet Brickowski<ng-template fudisActions [type]="'dd'">
            <fudis-button [label]="'Read more'" [variant]="'secondary'" [size]="'small'" />
          </ng-template>
        </fudis-dd>
      </fudis-dl-item>
    </fudis-description-list> `,
});

export const DescriptionListWithSubComponents = DescriptionListWithSubComponentsTemplate.bind({});
DescriptionListWithSubComponents.args = {
  variant: 'regular',
  columns: { xs: 1, sm: 2 },
  rowGap: 'md',
  disableGrid: false,
};

const DescriptionListWithLanguagesTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`<fudis-heading [level]="2" [size]="'md'"
      >Description List with Language Badges</fudis-heading
    >
    <fudis-description-list
      [marginBottom]="'md'"
      [disableGrid]="disableGrid"
      [variant]="variant"
      [serviceDefaults]="serviceDefaults"
      [columns]="columns"
    >
      <fudis-description-list-item>
        <fudis-dt [languages]="true">Example paragraph</fudis-dt>
        <fudis-dd [lang]="'sv'">Och den här är på Svenska</fudis-dd>
        <fudis-dd [lang]="'en'">This is in English</fudis-dd>
        <fudis-dd [lang]="'fi'">Tämä on suomeksi</fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt [languages]="true">Example without one language</fudis-dt>
        <fudis-dd [lang]="'fi'">Tähtien sota</fudis-dd>
        <fudis-dd [lang]="'en'"></fudis-dd>
        <fudis-dd [lang]="'sv'">Stjärnornas krig </fudis-dd>
      </fudis-description-list-item>
    </fudis-description-list>

    <example-language-service-change-component /> `,
});

export const DescriptionListWithLanguages = DescriptionListWithLanguagesTemplate.bind({});
DescriptionListWithLanguages.args = {
  variant: 'regular',
  serviceDefaults: false,
  columns: '1fr 1fr',
  disableGrid: false,
};

const multipleDDData = [
  { value: 'Anakin Skywalker' },
  { value: 'Obi-Wan Kenobi' },
  { value: 'Shaak Ti' },
  { value: 'Stass Allie' },
  { value: 'Agen Kolar' },
  { value: 'Depa Billaba' },
  { value: 'Coleman Kcaj' },
  { value: 'Saesee Tiin' },
  { value: 'Oppo Rancisis' },
  { value: 'Kit Fisto' },
  { value: 'Plo Koon' },
  { value: 'Luminara Unduli' },
  { value: 'Ki-Adi-Mundi' },
  { value: 'Mace Windu' },
  { subHeading: 'Grand Master', value: 'Yoda' },
];

const DescriptionListWithMultipleDdElementsTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: { ...args, data: multipleDDData },
  template: html`
    <fudis-heading>DT element with multiple DD elements</fudis-heading>
    <fudis-description-list
      [marginBottom]="'md'"
      [marginTop]="'md'"
      [variant]="'regular'"
      [columns]="'1fr 1fr'"
      [rowGap]="'sm'"
      [disableGrid]="disableGrid"
      [variant]="variant"
    >
      <fudis-description-list-item>
        <fudis-dt>Members of Jedi High Council</fudis-dt>
        <fudis-dd [subHeading]="item.subHeading" *ngFor="let item of data"
          >{{ item.value }}</fudis-dd
        >
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt>Non-Jedi Master Members</fudis-dt>
        <fudis-dd>Anakin Skywalker</fudis-dd>
      </fudis-description-list-item>
    </fudis-description-list>
  `,
});

export const DescriptionListWithMultipleDdElements =
  DescriptionListWithMultipleDdElementsTemplate.bind({});
DescriptionListWithMultipleDdElements.args = {
  variant: 'regular',
  disableGrid: false,
  serviceDefaults: false,
};

const DescriptionListWithSingleItemTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`
    <fudis-heading>Description List with Single Item</fudis-heading>
    <fudis-description-list
      [marginBottom]="'md'"
      [marginTop]="'md'"
      [variant]="'regular'"
      [columns]="'1fr 1fr'"
      [rowGap]="'sm'"
      [disableGrid]="disableGrid"
      [variant]="variant"
    >
      <fudis-description-list-item>
        <fudis-dt>Address</fudis-dt>
        <fudis-dd [subHeading]="'4 Privet Drive'">Under the stairs</fudis-dd>
      </fudis-description-list-item>
    </fudis-description-list>
  `,
});

export const DescriptionListWithSingleItem = DescriptionListWithSingleItemTemplate.bind({});
DescriptionListWithSingleItem.args = {
  variant: 'regular',
  disableGrid: false,
};
