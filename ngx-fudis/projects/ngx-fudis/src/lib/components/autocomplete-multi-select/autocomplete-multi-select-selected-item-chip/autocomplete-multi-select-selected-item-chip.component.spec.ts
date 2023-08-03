import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng-mocks';
import { AutocompleteMultiSelectSelectedItemChipComponent } from './autocomplete-multi-select-selected-item-chip.component';
import { IconComponent } from '../../icon/icon.component';

describe('AutocompleteMultiSelectSelectedItemChipComponent', () => {
	let component: AutocompleteMultiSelectSelectedItemChipComponent;
	let fixture: ComponentFixture<AutocompleteMultiSelectSelectedItemChipComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AutocompleteMultiSelectSelectedItemChipComponent, MockComponent(IconComponent)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AutocompleteMultiSelectSelectedItemChipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
