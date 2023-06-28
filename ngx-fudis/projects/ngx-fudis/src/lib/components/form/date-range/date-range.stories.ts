import { Component, Signal, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Subject } from 'rxjs';
import { DateRangeComponent } from './date-range.component';
import { FudisTranslationConfig } from '../../../types/forms';
import { FudisTranslationConfigService } from '../../../utilities/config.service';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'language-change-component',
	template: `<fudis-button [label]="_label" (handleClick)="changeLanguage()"></fudis-button>`,
})
export class LanguageChangeComponent {
	_label = 'Change language';

	_config: Signal<FudisTranslationConfig>;

	requiredText = new BehaviorSubject<string>('Required');

	closeLabel = new BehaviorSubject<string>('Close calendar');

	constructor(private _configService: FudisTranslationConfigService) {
		this._config = this._configService.getConfig();

		this._configService.setConfig({
			appLanguage: 'en',
			requiredText: this.requiredText,
			datepicker: { closeLabel: this.closeLabel },
		});
	}

	changeLanguage(): void {
		if (this._config().appLanguage === 'en') {
			this.requiredText.next('Pakollinen');
			this.closeLabel.next('Sulje kalenteri');

			this._configService.setConfig({
				appLanguage: 'fi',
			});
		} else {
			this.requiredText.next('Required');
			this.closeLabel.next('Close calendar');
			this._configService.setConfig({
				appLanguage: 'en',
			});
		}
	}
}

export default {
	title: 'Components/Form/Date Range',
	component: DateRangeComponent,
	decorators: [
		moduleMetadata({
			declarations: [LanguageChangeComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	argTypes: {},
} as Meta;

const Template: StoryFn<DateRangeComponent> = () => ({
	props: {},
	template: `
	<fudis-date-range [label]="'Date range selection'" [helpText]="'Some help text here'"/>
	<language-change-component/>
	`,
});

export const DateRange = Template.bind({});
