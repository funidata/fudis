import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { Component } from '@angular/core';
import { DescriptionListComponent } from './description-list.component';
import docs from './description-list-docs.mdx';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import { descriptionListExclude, nestedDescriptionListExclude } from '../../utilities/storybook';
import { FudisTranslationService } from '../../services/translation/translation.service';

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

const DescriptionListTemplate: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-heading [level]="2" [variant]="'md'"
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
        <fudis-dd [contentText]="'Rex'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Last name'"></fudis-dt>
        <fudis-dd [contentText]="'Dangerwest'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Alias'"></fudis-dt>
        <fudis-dd [contentText]="'Radical Emmet Xtreme'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Voice actor'"></fudis-dt>
        <fudis-dd [contentText]="'Chris Pratt'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Enemy'"></fudis-dt>
        <fudis-dd [contentText]="'Emmet Brickowski'" [subHeading]="'Archenemy'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>`,
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
    quoteOne: "It's not the years, honey, it's the mileage.",
    quoteTwo: "Archimedes didn't know about continental drift!",
  },
  template: html`
    <fudis-heading [level]="2" [variant]="'md'"
      >Nested Description Lists with Indiana Jones Movies</fudis-heading
    >
    <fudis-dl [classes]="'fudis-mt-sm'" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [contentText]="'Raiders of the Lost Ark'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Release Year'"></fudis-dt>
              <fudis-dd [contentText]="'1981'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [contentText]="'8.4 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Famous Quote'"></fudis-dt>
              <fudis-dd [contentText]="quoteOne"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'The Temple of Doom'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Release Year'"></fudis-dt>
              <fudis-dd [contentText]="'1984'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [contentText]="'7.5 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Famous Quote'"></fudis-dt>
              <fudis-dd [contentText]="'Ah, dessert! Chilled monkey brains.'"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'The Last Crusade'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Release Year'"></fudis-dt>
              <fudis-dd [contentText]="'1989'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [contentText]="'8.2 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Famous Quote'"></fudis-dt>
              <fudis-dd
                [contentText]="'I suddenly remembered my Charlemagne. Let my armies be the rocks and the trees and the birds in the sky...'"
              ></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'The Kingdom of Crystal Skull'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Release Year'"></fudis-dt>
              <fudis-dd [contentText]="'2008'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [contentText]="'6.2 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Famous Quote'"></fudis-dt>
              <fudis-dd [contentText]="'How much of human life is lost in waiting?'"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'The Dial of Destiny'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [contentText]="'Release Year'"></fudis-dt>
              <fudis-dd [contentText]="'2023'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [contentText]="'6.5 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [contentText]="'Famous Quote'"></fudis-dt>
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
        <fudis-dd [contentText]="'snape@hogwarts.wiz'" [subHeading]="'Severus Snape'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Course name'"></fudis-dt>
        <fudis-dd [contentText]="'Defense Against the Dark Arts'"></fudis-dd>
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
        <fudis-dt [contentText]="'First name'"></fudis-dt>
        <fudis-dd [contentText]="'Rex'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Last name'"></fudis-dt>
        <fudis-dd
          [contentText]="classified ? '&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' : 'Dangerwest'"
          [ariaLabel]="classified ? 'Hidden classified content' : null"
        >
          <fudis-button
            [variant]="'tertiary'"
            [size]="'small'"
            [icon]="classified ? 'eye' : 'eye-blind'"
            [label]="classified ? 'Show details' : 'Hide details'"
            (handleClick)="classified = !classified"
          ></fudis-button>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Alias'"></fudis-dt>
        <fudis-dd [contentText]="'Radical Emmet Xtreme'">
          <fudis-button [label]="'Edit'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Enemy'">Enemy</fudis-dt>
        <fudis-dd [contentText]="'Emmet Brickowski'" [subHeading]="'Archenemy'">
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
        <fudis-dt [contentText]="'Example paragraph'"></fudis-dt>
        <fudis-dd [lang]="'sv'" [contentText]="'Och den här är på Svenska'"></fudis-dd>
        <fudis-dd [lang]="'en'" [contentText]="'This is in English'"></fudis-dd>
        <fudis-dd [lang]="'fi'" [contentText]="'Tämä on suomeksi'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Example without one language'"></fudis-dt>
        <fudis-dd [lang]="'fi'" [contentText]="'Tähtien sota'"></fudis-dd>
        <fudis-dd [lang]="'en'" [contentText]="''"></fudis-dd>
        <fudis-dd [lang]="'sv'" [contentText]="'Stjärnornas krig'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt
          [contentText]="'Example which has multiple Details in different languages'"
        ></fudis-dt>
        <fudis-dd [lang]="'fi'" [contentText]="'Uusi toivo'"></fudis-dd>
        <fudis-dd [lang]="'fi'" [contentText]="'Imperiumin vastaisku'"></fudis-dd>
        <fudis-dd [lang]="'fi'" [contentText]="'Jedin paluu'"></fudis-dd>

        <fudis-dd [lang]="'en'" [contentText]="'New Hope'"></fudis-dd>
        <fudis-dd [lang]="'en'" [contentText]="'Empire Strikes Back'"></fudis-dd>
        <fudis-dd [lang]="'en'" [contentText]="'Return of the Jedi'"></fudis-dd>
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
        <fudis-dt [contentText]="'Members of Jedi High Council'"></fudis-dt>
        <fudis-dd
          [contentText]="item.value"
          [subHeading]="item.subHeading"
          *ngFor="let item of data"
        ></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [contentText]="'Non-Jedi Master Members'"></fudis-dt>
        <fudis-dd [contentText]="'Anakin Skywalker'"></fudis-dd>
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
        <fudis-dd [contentText]="'Under the stairs'" [subHeading]="'4 Privet Drive'"></fudis-dd>
      </fudis-dl-item>
    </fudis-dl>
  `,
});

export const SingleListItem = SingleListItemTemplate.bind({});
SingleListItem.args = {
  variant: 'regular',
  disableGrid: false,
};
