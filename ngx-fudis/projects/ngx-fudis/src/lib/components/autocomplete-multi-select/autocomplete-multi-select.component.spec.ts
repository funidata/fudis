import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { AutocompleteMultiSelectComponent } from './autocomplete-multi-select.component';
import { FudisDropdownMenuItemService } from '../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { LabelComponent } from '../form/label/label.component';
import { ButtonComponent } from '../button/button.component';
import { FudisDropdownOption, FudisInputSize } from '../../types/forms';
import { AutocompleteMultiSelectSelectedItemChipComponent } from './autocomplete-multi-select-selected-item-chip/autocomplete-multi-select-selected-item-chip.component';

const multiSelectOptions: FudisDropdownOption[] = [
	{ value: 1, label: 'Dog' },
	{ value: 2, label: 'Cat' },
	{ value: 3, label: 'Parrot' },
];

describe('AutocompleteMultiSelectComponent', () => {
	let component: AutocompleteMultiSelectComponent;
	let fixture: ComponentFixture<AutocompleteMultiSelectComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				AutocompleteMultiSelectComponent,
				MockComponent(LabelComponent),
				MockComponent(ButtonComponent),
				MockComponent(AutocompleteMultiSelectSelectedItemChipComponent),
			],
			providers: [FudisDropdownMenuItemService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AutocompleteMultiSelectComponent);
		component = fixture.componentInstance;
		component.options = multiSelectOptions;
		component.selectedOptions = [multiSelectOptions[0], multiSelectOptions[2]];
		fixture.detectChanges();
	});

	function asserMultiSelectHasClasses(classes: string): void {
		const childSpan = fixture.nativeElement.childNodes;
		const componentClasses = childSpan[0].className.split(' ').sort();

		expect(componentClasses).toEqual(classes.split(' ').sort());
	}

	function multiSelectSizeCheck(size: FudisInputSize): void {
		component.size = size;
		fixture.detectChanges();
		asserMultiSelectHasClasses(`fudis-autocomplete-multi-select fudis-input-size__${size}`);
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('OnInit', () => {
		it('options should be assigned to internal _results property', () => {
			component.ngOnInit();
			// eslint-disable-next-line @typescript-eslint/dot-notation
			expect(component['_results']).toEqual(jasmine.objectContaining(component.options));
		});
	});

	describe('Methods', () => {
		it('should select an option', () => {
			component.setItemSelection(multiSelectOptions[1]);

			expect(component.selectedOptions).toEqual(jasmine.arrayWithExactContents(multiSelectOptions));
		});

		it('should remove an option', () => {
			component.removeItem(multiSelectOptions[0]);

			expect(component.selectedOptions).toEqual([multiSelectOptions[2]]);
		});

		it('should remove an option by toggling checked	', () => {
			component.setItemSelection(multiSelectOptions[0]);

			expect(component.selectedOptions).toEqual([multiSelectOptions[2]]);
		});
	});

	describe('CSS classes', () => {
		it('should have respective classes according to given size Input', () => {
			multiSelectSizeCheck('sm');
			multiSelectSizeCheck('md');
			multiSelectSizeCheck('lg');
		});
	});
});
