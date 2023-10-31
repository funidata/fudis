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
		button: 0,
		'autocomplete-multi-select': 0,
		datepicker: 0,
		daterange: 0,
		dropdown: 0,
		expandable: 0,
		fieldset: 0,
		form: 0,
		heading: 0,
		'input-with-language-options': 0,
		section: 0,
		'text-area': 0,
		'text-input': 0,
	};

	const componentDataAfter: FudisIdComponentAmounts = {
		alert: 10,
		autocomplete: 10,
		button: 10,
		'autocomplete-multi-select': 10,
		datepicker: 10,
		daterange: 10,
		dropdown: 10,
		expandable: 10,
		fieldset: 10,
		form: 10,
		heading: 10,
		'input-with-language-options': 10,
		section: 10,
		'text-area': 10,
		'text-input': 10,
	};

	const familyDataBefore: FudisIdFamilyData = {
		breadcrumbs: [],
		'checkbox-group': [],
		'radio-button-group': [],
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
		'checkbox-group': [
			{
				parent: 'fudis-checkbox-group-1',
				children: [
					'fudis-checkbox-group-1-item-1',
					'fudis-checkbox-group-1-item-2',
					'checkbox-group-1-custom-child-id',
					'fudis-checkbox-group-1-item-4',
					'fudis-checkbox-group-1-item-5',
				],
			},
			{
				parent: 'checkbox-group-some-custom-id',
				children: [
					'checkbox-group-some-custom-id-item-1',
					'checkbox-group-some-custom-id-item-2',
					'checkbox-group-2-custom-child-id',
					'checkbox-group-some-custom-id-item-4',
					'checkbox-group-some-custom-id-item-5',
				],
			},
			{
				parent: 'fudis-checkbox-group-3',
				children: [
					'fudis-checkbox-group-3-item-1',
					'fudis-checkbox-group-3-item-2',
					'checkbox-group-3-custom-child-id',
					'fudis-checkbox-group-3-item-4',
					'fudis-checkbox-group-3-item-5',
				],
			},
		],
		'radio-button-group': [
			{
				parent: 'fudis-radio-button-group-1',
				children: [
					'fudis-radio-button-group-1-item-1',
					'fudis-radio-button-group-1-item-2',
					'radio-button-group-1-custom-child-id',
					'fudis-radio-button-group-1-item-4',
					'fudis-radio-button-group-1-item-5',
				],
			},
			{
				parent: 'radio-button-group-some-custom-id',
				children: [
					'radio-button-group-some-custom-id-item-1',
					'radio-button-group-some-custom-id-item-2',
					'radio-button-group-2-custom-child-id',
					'radio-button-group-some-custom-id-item-4',
					'radio-button-group-some-custom-id-item-5',
				],
			},
			{
				parent: 'fudis-radio-button-group-3',
				children: [
					'fudis-radio-button-group-3-item-1',
					'fudis-radio-button-group-3-item-2',
					'radio-button-group-3-custom-child-id',
					'fudis-radio-button-group-3-item-4',
					'fudis-radio-button-group-3-item-5',
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
