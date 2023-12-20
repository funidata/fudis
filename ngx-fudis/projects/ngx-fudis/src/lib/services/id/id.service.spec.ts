import { TestBed } from '@angular/core/testing';

import { FudisIdService } from './id.service';
import {
	fudisIdComponents,
	fudisIdParents,
	FudisIdComponentData,
	FudisIdFamilyData,
	FudisIdParent,
} from '../../types/id';

describe('FudisIdServiceService', () => {
	let idService: FudisIdService;

	const componentDataBefore: FudisIdComponentData = {
		alert: [],
		autocomplete: [],
		button: [],
		'autocomplete-multi-select': [],
		datepicker: [],
		daterange: [],
		dialog: [],
		dropdown: [],
		'error-message': [],
		expandable: [],
		fieldset: [],
		form: [],
		guidance: [],
		heading: [],
		'input-with-language-options': [],
		section: [],
		'text-area': [],
		'text-input': [],
		'validator-error-message': [],
	};

	const componentDataAfter: FudisIdComponentData = {
		alert: ['fudis-alert-1', 'fudis-alert-2', 'custom-id-for-alert', 'fudis-alert-4'],
		autocomplete: [
			'fudis-autocomplete-1',
			'fudis-autocomplete-2',
			'custom-id-for-autocomplete',
			'fudis-autocomplete-4',
		],
		button: ['fudis-button-1', 'fudis-button-2', 'custom-id-for-button', 'fudis-button-4'],
		'autocomplete-multi-select': [
			'fudis-autocomplete-multi-select-1',
			'fudis-autocomplete-multi-select-2',
			'custom-id-for-autocomplete-multi-select',
			'fudis-autocomplete-multi-select-4',
		],
		datepicker: ['fudis-datepicker-1', 'fudis-datepicker-2', 'custom-id-for-datepicker', 'fudis-datepicker-4'],
		daterange: ['fudis-daterange-1', 'fudis-daterange-2', 'custom-id-for-daterange', 'fudis-daterange-4'],
		dialog: ['fudis-dialog-1', 'fudis-dialog-2', 'custom-id-for-dialog', 'fudis-dialog-4'],
		dropdown: ['fudis-dropdown-1', 'fudis-dropdown-2', 'custom-id-for-dropdown', 'fudis-dropdown-4'],
		'error-message': [
			'fudis-error-message-1',
			'fudis-error-message-2',
			'custom-id-for-error-message',
			'fudis-error-message-4',
		],
		expandable: ['fudis-expandable-1', 'fudis-expandable-2', 'custom-id-for-expandable', 'fudis-expandable-4'],
		fieldset: ['fudis-fieldset-1', 'fudis-fieldset-2', 'custom-id-for-fieldset', 'fudis-fieldset-4'],
		form: ['fudis-form-1', 'fudis-form-2', 'custom-id-for-form', 'fudis-form-4'],
		guidance: ['fudis-guidance-1', 'fudis-guidance-2', 'custom-id-for-guidance', 'fudis-guidance-4'],
		heading: ['fudis-heading-1', 'fudis-heading-2', 'custom-id-for-heading', 'fudis-heading-4'],
		'input-with-language-options': [
			'fudis-input-with-language-options-1',
			'fudis-input-with-language-options-2',
			'custom-id-for-input-with-language-options',
			'fudis-input-with-language-options-4',
		],
		section: ['fudis-section-1', 'fudis-section-2', 'custom-id-for-section', 'fudis-section-4'],
		'text-area': ['fudis-text-area-1', 'fudis-text-area-2', 'custom-id-for-text-area', 'fudis-text-area-4'],
		'text-input': ['fudis-text-input-1', 'fudis-text-input-2', 'custom-id-for-text-input', 'fudis-text-input-4'],
		'validator-error-message': [
			'fudis-validator-error-message-1',
			'fudis-validator-error-message-2',
			'custom-id-for-validator-error-message',
			'fudis-validator-error-message-4',
		],
	};

	const familyDataBefore: FudisIdFamilyData = {
		breadcrumbs: [],
		'checkbox-group': [],
		'dropdown-menu': [],
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
		'dropdown-menu': [
			{
				parent: 'fudis-dropdown-menu-1',
				children: [
					'fudis-dropdown-menu-1-item-1',
					'fudis-dropdown-menu-1-item-2',
					'dropdown-menu-1-custom-child-id',
					'fudis-dropdown-menu-1-item-4',
					'fudis-dropdown-menu-1-item-5',
				],
			},
			{
				parent: 'dropdown-menu-some-custom-id',
				children: [
					'dropdown-menu-some-custom-id-item-1',
					'dropdown-menu-some-custom-id-item-2',
					'dropdown-menu-2-custom-child-id',
					'dropdown-menu-some-custom-id-item-4',
					'dropdown-menu-some-custom-id-item-5',
				],
			},
			{
				parent: 'fudis-dropdown-menu-3',
				children: [
					'fudis-dropdown-menu-3-item-1',
					'fudis-dropdown-menu-3-item-2',
					'dropdown-menu-3-custom-child-id',
					'fudis-dropdown-menu-3-item-4',
					'fudis-dropdown-menu-3-item-5',
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
		expect(idService.getComponentIdList()).toEqual(componentDataBefore);

		fudisIdComponents.forEach((componentType) => {
			for (let index = 1; index <= 4; index += 1) {
				if (index !== 3) {
					const newId = idService.getNewId(componentType);

					expect(newId).toEqual(`fudis-${componentType}-${index}`);
				} else {
					idService.addNewId(componentType, `custom-id-for-${componentType}`);
				}
			}
		});

		expect(idService.getComponentIdList()).toEqual(componentDataAfter);
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
		expect(idService.getFamilyIdData()).toEqual(familyDataBefore);

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

		expect(idService.getFamilyIdData()).toEqual(familyDataAfter);
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
