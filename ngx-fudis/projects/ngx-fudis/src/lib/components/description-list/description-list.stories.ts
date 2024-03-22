import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { DescriptionListComponent } from './description-list.component';
import docs from './docs.mdx';
import { FudisLanguageBadgeGroupService } from '../../services/language-badge-group/language-badge-group.service';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import { descriptionListExclude, excludeAllRegex } from '../../utilities/storybook';

@Component({
  selector: 'example-language-service-change-component',
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
    </fudis-grid>
  `,
})
class LanguageChangeComponent {
  constructor(private _languageService: FudisLanguageBadgeGroupService) {
    this._languageService.setLanguages(['fi', 'sv', 'en']);
  }

  changeBadgeLanguages(languages: FudisLanguageAbbr[]): void {
    this._languageService.setLanguages(languages);
  }
}

@Component({
  selector: 'example-dl-with-multiple-dd',
  template: `
    <fudis-heading>DT element with multiple DD elements</fudis-heading>
    <fudis-description-list [marginBottom]="'md'" [variant]="'regular'" [columns]="'1fr 1fr'">
      <fudis-description-list-item>
        <fudis-dt>Example DT</fudis-dt>
        <fudis-dd *ngFor="let item of _ddData">{{ item.value }}</fudis-dd>
      </fudis-description-list-item>
    </fudis-description-list>
  `,
})
class DlWithMultipleDdComponent {
  protected _ddData = [
    { value: 'First DD' },
    { value: 'Second DD' },
    { value: 'Third DD' },
    { value: 'Fourth DD' },
    { value: 'Fifth DD' },
    { value: 'Sixth DD' },
  ];
}

@Component({
  selector: 'example-dl-component',
  template: ``,
})
class ExampleDlComponent {
  protected testData = [
    { key: 'First Name', value: 'Rex' },
    { key: 'Last Name', value: 'Dangerwest' },
    { key: 'Alias', value: 'Radical Emmet Xtreme' },
    { key: 'Voice actor', value: 'Chris Pratt' },
    { key: 'Favorite animal', value: 'Velociraptor', subHeading: 'Dinosaurus' },
    { key: 'Real name', value: 'Emmet Joseph Brickowski' },
    { key: 'Species', value: 'Lego' },
    { key: 'Enemy', value: 'Emmet Brickowski' },
    { key: 'Enemy', value: 'Lucy' },
  ];
}

const html = String.raw;

export default {
  title: 'Components/Description List',
  component: DescriptionListComponent,
  decorators: [
    moduleMetadata({
      declarations: [LanguageChangeComponent, DlWithMultipleDdComponent, ExampleDlComponent],
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
    <fudis-description-list
      [marginBottom]="'md'"
      [marginTop]="'md'"
      [variant]="variant"
      [columns]="'1fr 1fr'"
      [rowGap]="rowGap"
      [disableGrid]="disableGrid"
    >
      <fudis-description-list-item>
        <fudis-dt>First Name</fudis-dt>
        <fudis-dd>Rex</fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt>Last Name</fudis-dt>
        <fudis-dd>Dangerwest</fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt>Alias</fudis-dt>
        <fudis-dd>Radical Emmet Xtreme</fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt>Voice Actor</fudis-dt>
        <fudis-dd>Chris Pratt</fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt>Enemy</fudis-dt>
        <fudis-dd [subHeading]="'Archenemy'">Emmet Brickowski</fudis-dd>
      </fudis-description-list-item>
    </fudis-description-list>`,
});

export const DescriptionList = DescriptionListTemplate.bind({});
DescriptionList.args = {
  variant: 'compact',
  rowGap: 'sm',
};

const DescriptionListItemInsideGridTemplate: StoryFn = () => ({
  template: html`<fudis-grid [columns]="columns" [rowGap]="'xs'">
    <fudis-heading [level]="2" [size]="'md'"
      >This is Fudis Grid where DL is used as child component</fudis-heading
    >
    <fudis-dl [disableGrid]="true">
      <fudis-dl-item>
        <fudis-dt>Vastuuopettajan sähköposti</fudis-dt>
        <fudis-dd [subHeading]="'Olli Opettaja'">olli@ope.com</fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
    <fudis-body-text
      >Item next to this Body Text is a lonely Description List component with only one list item.
      This and DL item are both inside a Fudis Grid.</fudis-body-text
    >
  </fudis-grid>`,
  props: {
    columns: '1fr 1fr',
  },
});

export const DescriptionListItemInsideGrid = DescriptionListItemInsideGridTemplate.bind({});

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
      <fudis-description-list-item>
        <fudis-dt>First Name</fudis-dt>
        <fudis-dd>Rex</fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt>Last Name</fudis-dt>
        <fudis-dd>Dangerwest</fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
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
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt>Enemy</fudis-dt>
        <fudis-dd [subHeading]="'Archenemy'"
          >Emmet Brickowski
          <ng-template fudisActions [type]="'dd'">
            <fudis-button [label]="'Read more'" [variant]="'secondary'" [size]="'small'" />
          </ng-template>
        </fudis-dd>
      </fudis-description-list-item>
    </fudis-description-list> `,
});

export const DescriptionListWithSubComponents = DescriptionListWithSubComponentsTemplate.bind({});
DescriptionListWithSubComponents.args = {
  variant: 'regular',
  columns: { xs: 1, sm: 2 },
  rowGap: 'md',
};

const DescriptionListWithLanguagesTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`<fudis-heading [tag]="'h2'" [size]="'md'"
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
};

const MultipleDdElementsTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`<example-dl-with-multiple-dd> </example-dl-with-multiple-dd> `,
});

export const DescriptionListWithMultipleDdElements = MultipleDdElementsTemplate.bind({});
DescriptionListWithMultipleDdElements.args = {
  variant: 'regular',
  disableGrid: false,
  serviceDefaults: false,
};
DescriptionListWithMultipleDdElements.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
