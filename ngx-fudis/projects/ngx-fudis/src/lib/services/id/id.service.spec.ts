import { TestBed } from '@angular/core/testing';

import { FudisIdService } from './id.service';
import {
	fudisIdComponents,
	fudisIdParents,
	FudisIdComponentAmounts,
	FudisIdFamilyData,
	FudisIdParent,
} from '../../types/id';

describe('FudisIdServiceService', () => {
	let idService: FudisIdService;

	const componentDataBefore: FudisIdComponentAmounts = {
		alert: 0,
		autocomplete: 0,
		autocompleteMultiSelect: 0,
		button: 0,
		datepicker: 0,
		daterange: 0,
		dropdown: 0,
		expandable: 0,
		fieldset: 0,
		form: 0,
		heading: 0,
		inputWithLanguageOptions: 0,
		section: 0,
		textArea: 0,
		textInput: 0,
	};

	const componentDataAfter: FudisIdComponentAmounts = {
		alert: 10,
		autocomplete: 10,
		autocompleteMultiSelect: 10,
		button: 10,
		datepicker: 10,
		daterange: 10,
		dropdown: 10,
		expandable: 10,
		fieldset: 10,
		form: 10,
		heading: 10,
		inputWithLanguageOptions: 10,
		section: 10,
		textArea: 10,
		textInput: 10,
	};

	const familyDataBefore: FudisIdFamilyData = {
		breadcrumbs: [],
		checkboxGroup: [],
		radiobuttonGroup: [],
	};
	const familyDataAfter: FudisIdFamilyData = {
		breadcrumbs: [
			{
				parent: 'fudis-breadcrumbs-1',
				children: [
					'fudis-breadcrumbs-1-item-1',
					'fudis-breadcrumbs-1-item-2',
					'breadcrumbs-1-custom-child-id',
					'fudis-breadcrumbs-1-item-4',
					'fudis-breadcrumbs-1-item-5',
				],
			},
			{
				parent: 'breadcrumbs-some-custom-id',
				children: [
					'breadcrumbs-some-custom-id-item-1',
					'breadcrumbs-some-custom-id-item-2',
					'breadcrumbs-2-custom-child-id',
					'breadcrumbs-some-custom-id-item-4',
					'breadcrumbs-some-custom-id-item-5',
				],
			},
			{
				parent: 'fudis-breadcrumbs-3',
				children: [
					'fudis-breadcrumbs-3-item-1',
					'fudis-breadcrumbs-3-item-2',
					'breadcrumbs-3-custom-child-id',
					'fudis-breadcrumbs-3-item-4',
					'fudis-breadcrumbs-3-item-5',
				],
			},
		],
		checkboxGroup: [
			{
				parent: 'fudis-checkboxGroup-1',
				children: [
					'fudis-checkboxGroup-1-item-1',
					'fudis-checkboxGroup-1-item-2',
					'checkboxGroup-1-custom-child-id',
					'fudis-checkboxGroup-1-item-4',
					'fudis-checkboxGroup-1-item-5',
				],
			},
			{
				parent: 'checkboxGroup-some-custom-id',
				children: [
					'checkboxGroup-some-custom-id-item-1',
					'checkboxGroup-some-custom-id-item-2',
					'checkboxGroup-2-custom-child-id',
					'checkboxGroup-some-custom-id-item-4',
					'checkboxGroup-some-custom-id-item-5',
				],
			},
			{
				parent: 'fudis-checkboxGroup-3',
				children: [
					'fudis-checkboxGroup-3-item-1',
					'fudis-checkboxGroup-3-item-2',
					'checkboxGroup-3-custom-child-id',
					'fudis-checkboxGroup-3-item-4',
					'fudis-checkboxGroup-3-item-5',
				],
			},
		],
		radiobuttonGroup: [
			{
				parent: 'fudis-radiobuttonGroup-1',
				children: [
					'fudis-radiobuttonGroup-1-item-1',
					'fudis-radiobuttonGroup-1-item-2',
					'radiobuttonGroup-1-custom-child-id',
					'fudis-radiobuttonGroup-1-item-4',
					'fudis-radiobuttonGroup-1-item-5',
				],
			},
			{
				parent: 'radiobuttonGroup-some-custom-id',
				children: [
					'radiobuttonGroup-some-custom-id-item-1',
					'radiobuttonGroup-some-custom-id-item-2',
					'radiobuttonGroup-2-custom-child-id',
					'radiobuttonGroup-some-custom-id-item-4',
					'radiobuttonGroup-some-custom-id-item-5',
				],
			},
			{
				parent: 'fudis-radiobuttonGroup-3',
				children: [
					'fudis-radiobuttonGroup-3-item-1',
					'fudis-radiobuttonGroup-3-item-2',
					'radiobuttonGroup-3-custom-child-id',
					'fudis-radiobuttonGroup-3-item-4',
					'fudis-radiobuttonGroup-3-item-5',
				],
			},
		],
	};

	const testAllComponents = () => {
		expect(idService.getComponentAmounts()).toEqual(componentDataBefore);

		fudisIdComponents.forEach((componentType) => {
			for (let index = 1; index <= 10; index += 1) {
				const newId = idService.getNewId(componentType);

				expect(newId).toEqual(`fudis-${componentType}-${index}`);
			}
		});

		expect(idService.getComponentAmounts()).toEqual(componentDataAfter);
	};

	const testChildComponents = (componentType: FudisIdParent, parentIndex: number, parentId: string) => {
		for (let index = 1; index <= 5; index += 1) {
			if (index !== 3) {
				const childId = idService.getNewChildId(componentType, parentId);

				expect(childId).toEqual(`${parentId}-item-${index}`);
			} else {
				const customChildId = `${componentType}-${parentIndex}-custom-child-id`;

				idService.addNewChildId(componentType, parentId, customChildId);
			}
		}
	};

	const testFamilyComponents = () => {
		expect(idService.getFamilyData()).toEqual(familyDataBefore);

		fudisIdParents.forEach((componentType) => {
			for (let index = 1; index <= 3; index += 1) {
				let newId = '';

				let expectedId = '';

				if (index !== 2) {
					newId = idService.getNewParentId(componentType);

					expectedId = `fudis-${componentType}-${index}`;

					testChildComponents(componentType, index, expectedId);
				} else {
					const customId = `${componentType}-some-custom-id`;

					idService.addNewParentId(componentType, customId);

					testChildComponents(componentType, index, customId);
				}

				expect(newId).toEqual(expectedId);
			}
		});

		expect(idService.getFamilyData()).toEqual(familyDataAfter);
	};

	beforeEach(() => {
		TestBed.configureTestingModule({});
		idService = TestBed.inject(FudisIdService);
	});

	it('should be created', () => {
		expect(idService).toBeTruthy();
	});

	describe('getNewId()', () => {
		it('should return correct id with getNewId()', () => {
			testAllComponents();
		});
	});

	describe('family data', () => {
		it('should return correct parent data', () => {
			testFamilyComponents();
		});
	});
});
