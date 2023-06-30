import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteMultiSelectSelectedItemChipComponent } from './autocomplete-multi-select-selected-item-chip.component';

describe('AutocompleteMultiSelectFilterItemComponent', () => {
	let component: AutocompleteMultiSelectSelectedItemChipComponent;
	let fixture: ComponentFixture<AutocompleteMultiSelectSelectedItemChipComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AutocompleteMultiSelectSelectedItemChipComponent],
		});
		fixture = TestBed.createComponent(AutocompleteMultiSelectSelectedItemChipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
