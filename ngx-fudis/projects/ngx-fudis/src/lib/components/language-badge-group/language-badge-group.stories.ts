import { StoryFn, Meta, moduleMetadata } from '@storybook/angular-vite';
import { action } from 'storybook/actions';
import { Component } from '@angular/core';
import { LanguageBadgeGroupComponent } from './language-badge-group.component';
import docs from './language-badge-group.mdx';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { languageBadgeGroupControlsExclude } from '../../utilities/storybook';
import { HeadingComponent } from '../typography/heading/heading.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';
import { ButtonComponent } from '../button/button.component';
import { GridComponent } from '../grid/grid/grid.component';

@Component({
  selector: 'interactive-example-with-language-service-change-component',
  imports: [
    HeadingComponent,
    LanguageBadgeGroupComponent,
    BodyTextComponent,
    GridComponent,
    ButtonComponent,
  ],
  template: `
    <fudis-heading [level]="3" [variant]="'sm'" style="display: inline-block;"
      >Bachelor of Computer Science
    </fudis-heading>

    <fudis-language-badge-group
      [translatedLanguages]="translatedLanguages"
      (handleClick)="languageChange($event)"
    />

    <fudis-body-text [lang]="selected" style="margin-top: 1rem;margin-bottom: 3rem;">{{
      translations[selected]
    }}</fudis-body-text>

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
    this.selected = this._languageService.getLanguage();
  }

  protected readonly translations = {
    fi: 'Tietojenkäsittelytieteen kandidaattiohjelma antaa opiskelijalle valmiudet ohjelmointiin, tietojärjestelmien suunnitteluun ja tieteelliseen työskentelyyn. Opiskelija laatii henkilökohtaisen opintosuunnitelman ja ilmoittautuu kursseille opinto-oikeutensa mukaisesti.',
    sv: '',
    en: 'The Bachelor of Computer Science programme gives students a foundation in programming, information systems design, and academic work. Students prepare a personal study plan and register for courses according to their study right.',
  };
  translated: FudisLanguageAbbr[];
  selected: FudisLanguageAbbr | null;
  translatedLanguages: FudisLanguageAbbr[] = ['fi', 'en'];

  changeBadgeLanguages(languages: FudisLanguageAbbr[]): void {
    this._languageService.setSelectableLanguages(languages);
  }
  changeAppLang(lang: FudisLanguageAbbr): void {
    this._languageService.setLanguage(lang);
  }

  languageChange(event: FudisLanguageAbbr | null): void {
    this.selected = event;
  }
}

const html = String.raw;

export default {
  title: 'Components/Language Badge Group',
  component: LanguageBadgeGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [LanguageChangeComponent],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;

const ExampleTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    languageChange: action('languageChange'),
  },
  template: html`<fudis-language-badge-group
    [translatedLanguages]="translatedLanguages"
    (handleClick)="languageChange($event)"
  />`,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  translatedLanguages: ['fi', 'sv'],
};
Example.parameters = {
  controls: {
    exclude: languageBadgeGroupControlsExclude,
  },
};

const WithInteractiveContentTemplate: StoryFn = (args) => ({
  props: {
    ...args,
  },
  template: html`<interactive-example-with-language-service-change-component />`,
});

export const WithInteractiveContent = WithInteractiveContentTemplate.bind({});
WithInteractiveContent.args = {
  translatedLanguages: ['fi', 'en'],
};
WithInteractiveContent.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
