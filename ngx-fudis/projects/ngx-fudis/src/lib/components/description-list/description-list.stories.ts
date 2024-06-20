import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
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

const DescriptionListTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html` <fudis-heading [level]="2" [variant]="'md'"
      >{{variant==='regular' ? 'Regular' : 'Compact'}} Description List</fudis-heading
    >
    <fudis-dl [marginTop]="'sm'" [variant]="variant" [columns]="2" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [textContent]="'First name'"></fudis-dt>
        <fudis-dd [textContent]="'Rex'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'Last name'"></fudis-dt>
        <fudis-dd [textContent]="'Dangerwest'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'Alias'"></fudis-dt>
        <fudis-dd [textContent]="'Radical Emmet Xtreme'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'Voice actor'"></fudis-dt>
        <fudis-dd [textContent]="'Chris Pratt'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'Enemy'"></fudis-dt>
        <fudis-dd [textContent]="'Emmet Brickowski'" [subHeading]="'Archenemy'"></fudis-dd>
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

const NestedDescriptionListsTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: {
    ...args,
    quoteOne: "It's not the years, honey, it's the mileage.",
    quoteTwo: "Archimedes didn't know about continental drift!",
  },
  template: html`
    <fudis-heading [level]="2" [variant]="'md'"
      >Nested Description Lists with Indiana Jones Movies</fudis-heading
    >
    <fudis-dl [marginTop]="'sm'" [disableGrid]="disableGrid">
      <fudis-dl-item>
        <fudis-dt [textContent]="'Raiders of the Lost Ark'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [textContent]="'Release Year'"></fudis-dt>
              <fudis-dd [textContent]="'1981'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [textContent]="'8.4 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'Famous Quote'"></fudis-dt>
              <fudis-dd [textContent]="quoteOne"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'The Temple of Doom'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [textContent]="'Release Year'"></fudis-dt>
              <fudis-dd [textContent]="'1984'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [textContent]="'7.5 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'Famous Quote'"></fudis-dt>
              <fudis-dd [textContent]="'Ah, dessert! Chilled monkey brains.'"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'The Last Crusade'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [textContent]="'Release Year'"></fudis-dt>
              <fudis-dd [textContent]="'1989'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [textContent]="'8.2 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'Famous Quote'"></fudis-dt>
              <fudis-dd
                [textContent]="'I suddenly remembered my Charlemagne. Let my armies be the rocks and the trees and the birds in the sky...'"
              ></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'The Kingdom of Crystal Skull'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [textContent]="'Release Year'"></fudis-dt>
              <fudis-dd [textContent]="'2008'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [textContent]="'6.2 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'Famous Quote'"></fudis-dt>
              <fudis-dd [textContent]="'How much of human life is lost in waiting?'"></fudis-dd>
            </fudis-dl-item>
          </fudis-dl>
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'The Dial of Destiny'"></fudis-dt>
        <fudis-dd>
          <fudis-dl [variant]="'compact'">
            <fudis-dl-item>
              <fudis-dt [textContent]="'Release Year'"></fudis-dt>
              <fudis-dd [textContent]="'2023'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'IMDB Rating'"></fudis-dt>
              <fudis-dd [textContent]="'6.5 / 10'"></fudis-dd>
            </fudis-dl-item>
            <fudis-dl-item>
              <fudis-dt [textContent]="'Famous Quote'"></fudis-dt>
              <fudis-dd [textContent]="quoteTwo"></fudis-dd>
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

const DescriptionListInsideGridTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`<fudis-grid [columns]="{sm: 1, md: 2}" [rowGap]="'xs'">
    <fudis-heading [level]="2" [variant]="'md'"
      >Description List as Grid's Child Component</fudis-heading
    >
    <fudis-dl [disableGrid]="disableGrid" [variant]="variant">
      <fudis-dl-item>
        <fudis-dt [textContent]="'Teacher email'"></fudis-dt>
        <fudis-dd [textContent]="'snape@hogwarts.wiz'" [subHeading]="'Severus Snape'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'Course name'"></fudis-dt>
        <fudis-dd [textContent]="'Defense Against the Dark Arts'"></fudis-dd>
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

const NestedSubComponentsTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`<fudis-heading [level]="2" [variant]="'md'"
      >Description List With Sub Components</fudis-heading
    >
    <fudis-description-list
      [marginTop]="'sm'"
      [disableGrid]="disableGrid"
      [variant]="variant"
      [columns]="columns"
    >
      <fudis-dl-item>
        <fudis-dt [textContent]="'First name'"></fudis-dt>
        <fudis-dd [textContent]="'Rex'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'Last name'"></fudis-dt>
        <fudis-dd [textContent]="'Dangerwest'"></fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'Alias'"></fudis-dt>
        <fudis-dd [textContent]="'Radical Emmet Xtreme'">
          <fudis-button [label]="'Edit'" [variant]="'tertiary'" [size]="'small'" [icon]="'edit'" />
        </fudis-dd>
      </fudis-dl-item>
      <fudis-dl-item>
        <fudis-dt [textContent]="'Enemy'">Enemy</fudis-dt>
        <fudis-dd [textContent]="'Emmet Brickowski'" [subHeading]="'Archenemy'">
          <fudis-button [label]="'Read more'" [variant]="'secondary'" [size]="'small'" />
        </fudis-dd>
      </fudis-dl-item>
    </fudis-description-list> `,
});

export const NestedSubComponents = NestedSubComponentsTemplate.bind({});
NestedSubComponents.args = {
  variant: 'regular',
  columns: { xs: 1, sm: 2 },
  disableGrid: false,
};

const WithLanguageBadgesTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`<fudis-heading [level]="2" [variant]="'md'"
      >Description List With Language Badges</fudis-heading
    >
    <fudis-description-list
      [marginTop]="'sm'"
      [disableGrid]="disableGrid"
      [variant]="variant"
      [serviceDefaults]="serviceDefaults"
      [columns]="columns"
      [marginBottom]="'sm'"
    >
      <fudis-description-list-item>
        <fudis-dt [textContent]="'Example paragraph'"></fudis-dt>
        <fudis-dd [lang]="'sv'" [textContent]="'Och den här är på Svenska'"></fudis-dd>
        <fudis-dd [lang]="'en'" [textContent]="'This is in English'"></fudis-dd>
        <fudis-dd [lang]="'fi'" [textContent]="'Tämä on suomeksi'"></fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt [textContent]="'Example without one language'"></fudis-dt>
        <fudis-dd [lang]="'fi'" [textContent]="'Tähtien sota'"></fudis-dd>
        <fudis-dd [lang]="'en'" [textContent]="''"></fudis-dd>
        <fudis-dd [lang]="'sv'" [textContent]="'Stjärnornas krig'"></fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt
          [textContent]="'Example which has multiple Details in different languages'"
        ></fudis-dt>
        <fudis-dd [lang]="'fi'" [textContent]="'Uusi toivo'"></fudis-dd>
        <fudis-dd [lang]="'fi'" [textContent]="'Imperiumin vastaisku'"></fudis-dd>
        <fudis-dd [lang]="'fi'" [textContent]="'Jedin paluu'"></fudis-dd>

        <fudis-dd [lang]="'en'" [textContent]="'New Hope'"></fudis-dd>
        <fudis-dd [lang]="'en'" [textContent]="'Empire Strikes Back'"></fudis-dd>
        <fudis-dd [lang]="'en'" [textContent]="'Return of the Jedi'"></fudis-dd>
      </fudis-description-list-item>
    </fudis-description-list>
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

const ItemWithMultipleDdElementsTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: { ...args, data: multipleDDData },
  template: html`
    <fudis-heading [level]="2" [variant]="'md'"
      >Description List Item With Multiple Details</fudis-heading
    >
    <fudis-description-list
      [marginTop]="'sm'"
      [variant]="'regular'"
      [columns]="'1fr 1fr'"
      [disableGrid]="disableGrid"
      [variant]="variant"
    >
      <fudis-description-list-item>
        <fudis-dt [textContent]="'Members of Jedi High Council'"></fudis-dt>
        <fudis-dd
          [textContent]="item.value"
          [subHeading]="item.subHeading"
          *ngFor="let item of data"
        ></fudis-dd>
      </fudis-description-list-item>
      <fudis-description-list-item>
        <fudis-dt [textContent]="'Non-Jedi Master Members'"></fudis-dt>
        <fudis-dd [textContent]="'Anakin Skywalker'"></fudis-dd>
      </fudis-description-list-item>
    </fudis-description-list>
  `,
});

export const ItemWithMultipleDdElements = ItemWithMultipleDdElementsTemplate.bind({});
ItemWithMultipleDdElements.args = {
  variant: 'regular',
  disableGrid: false,
  serviceDefaults: false,
};

const SingleListItemTemplate: StoryFn<DescriptionListComponent> = (
  args: DescriptionListComponent,
) => ({
  props: args,
  template: html`
    <fudis-heading [level]="2" [variant]="'md'">Description List with Single Item</fudis-heading>
    <fudis-description-list
      [marginTop]="'sm'"
      [variant]="'regular'"
      [columns]="'1fr 1fr'"
      [disableGrid]="disableGrid"
      [variant]="variant"
      [tag]="'p'"
    >
      <fudis-description-list-item>
        <fudis-dt [textContent]="'Address'"></fudis-dt>
        <fudis-dd [textContent]="'Under the stairs'" [subHeading]="'4 Privet Drive'"></fudis-dd>
      </fudis-description-list-item>
    </fudis-description-list>
  `,
});

export const SingleListItem = SingleListItemTemplate.bind({});
SingleListItem.args = {
  variant: 'regular',
  disableGrid: false,
};
