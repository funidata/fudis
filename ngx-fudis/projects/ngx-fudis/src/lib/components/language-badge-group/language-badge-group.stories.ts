import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { Component, Input } from '@angular/core';
import { LanguageBadgeGroupComponent } from './language-badge-group.component';
import docs from './language-badge-group-docs.mdx';
import { FudisLanguageAbbr } from '../../types/miscellaneous';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { languageBadgeGroupControlsExclude } from '../../utilities/storybook';

@Component({
  selector: 'interactive-example-with-language-service-change-component',
  template: `
    <fudis-heading [level]="3" [variant]="'sm'" style="display: inline-block;"
      >Harry Potter and the Philosopher's Stone
    </fudis-heading>

    <fudis-language-badge-group
      [translatedLanguages]="translatedLanguages"
      (handleClick)="languageChange($event)"
    />

    <fudis-body-text style="margin-top: 1rem;margin-bottom: 3rem;">{{
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
  protected readonly translations = {
    fi: 'Harry Potter on mielestään ihan tavallinen poika. Tosin hän asuu huoltajiensa luona portaiden alla olevassa kaapissa. Harryn elämä muuttuu täysin, kun hän saa 11-vuotispäivänään merkillisen kirjeen. Se on kutsu Tylypahkan velhojen ja noitien kouluun. Harrylle avautuu kokonaan uusi maailma, johon kuuluvat velhot, noidat, yksisarviset ja lohikäärmeet. Harry saa tietää olevansa velhojen sukua!',
    sv: '',
    en: "Harry Potter considers himself just a normal boy. Although he lives with his guardians in the closet under the stairs. Harry's life changes completely when he receives a strange letter on his 11th birthday. It's an invitation to Hogwarts School of Witchcraft and Wizardry. A whole new world opens up for Harry, which includes wizards, witches, Unicorns and dragons. Harry learns that he is of wizarding blood!",
  };
  translated: FudisLanguageAbbr[];
  selected: FudisLanguageAbbr | null;

  constructor(private _languageService: FudisTranslationService) {
    this._languageService.setSelectableLanguages(['fi', 'sv', 'en']);
    this.selected = this._languageService.getLanguage();
  }

  @Input() translatedLanguages: FudisLanguageAbbr[] = [];

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
      declarations: [LanguageChangeComponent],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;

const LanguageBadgesTemplate: StoryFn<LanguageBadgeGroupComponent> = (
  args: LanguageBadgeGroupComponent,
) => ({
  props: {
    ...args,
    languageChange: action('languageChange'),
  },
  template: html`<fudis-language-badge-group
    [translatedLanguages]="translatedLanguages"
    (handleClick)="languageChange($event)"
  />`,
});

export const LanguageBadges = LanguageBadgesTemplate.bind({});
LanguageBadges.args = {
  translatedLanguages: ['fi', 'sv'],
};
LanguageBadges.parameters = {
  controls: {
    exclude: languageBadgeGroupControlsExclude,
  },
};

const LanguageBadgesInteractiveTemplate: StoryFn<LanguageBadgeGroupComponent> = (
  args: LanguageBadgeGroupComponent,
) => ({
  props: {
    ...args,
  },
  template: html`<interactive-example-with-language-service-change-component
    [translatedLanguages]="translatedLanguages"
  />`,
});

export const LanguageBadgesInteractive = LanguageBadgesInteractiveTemplate.bind({});
LanguageBadgesInteractive.args = {
  translatedLanguages: ['fi', 'en'],
};
LanguageBadgesInteractive.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
