import { FudisIdData } from '../../types/id';

export const testDataBefore: FudisIdData = {
  components: {
    alert: [],
    autocomplete: [],
    'body-text': [],
    button: [],
    'autocomplete-multi-select': [],
    datepicker: [],
    dialog: [],
    dropdown: [],
    'error-message': [],
    expandable: [],
    fieldset: [],
    form: [],
    guidance: [],
    heading: [],
    'localized-text-group': [],
    link: [],
    section: [],
    'text-area': [],
    'text-input': [],
    'validator-error-message': [],
  },
  parents: {
    breadcrumbs: {},
    'checkbox-group': {},
    'language-badge-group': {},
    'radio-button-group': {},
  },
  grandParents: {
    'description-list': {},
    'dropdown-menu': {},
    select: {},
    multiselect: {},
  },
};

export const testComponentDataAfter: FudisIdData = {
  components: {
    alert: ['fudis-alert-1', 'custom-id-for-alert', 'fudis-alert-3'],
    autocomplete: ['fudis-autocomplete-1', 'custom-id-for-autocomplete', 'fudis-autocomplete-3'],
    'body-text': ['fudis-body-text-1', 'custom-id-for-body-text', 'fudis-body-text-3'],
    button: ['fudis-button-1', 'custom-id-for-button', 'fudis-button-3'],
    'autocomplete-multi-select': [
      'fudis-autocomplete-multi-select-1',
      'custom-id-for-autocomplete-multi-select',
      'fudis-autocomplete-multi-select-3',
    ],
    datepicker: ['fudis-datepicker-1', 'custom-id-for-datepicker', 'fudis-datepicker-3'],
    dialog: ['fudis-dialog-1', 'custom-id-for-dialog', 'fudis-dialog-3'],
    dropdown: ['fudis-dropdown-1', 'custom-id-for-dropdown', 'fudis-dropdown-3'],
    'error-message': [
      'fudis-error-message-1',
      'custom-id-for-error-message',
      'fudis-error-message-3',
    ],
    expandable: ['fudis-expandable-1', 'custom-id-for-expandable', 'fudis-expandable-3'],
    fieldset: ['fudis-fieldset-1', 'custom-id-for-fieldset', 'fudis-fieldset-3'],
    form: ['fudis-form-1', 'custom-id-for-form', 'fudis-form-3'],
    guidance: ['fudis-guidance-1', 'custom-id-for-guidance', 'fudis-guidance-3'],
    heading: ['fudis-heading-1', 'custom-id-for-heading', 'fudis-heading-3'],
    'localized-text-group': [
      'fudis-localized-text-group-1',
      'custom-id-for-localized-text-group',
      'fudis-localized-text-group-3',
    ],
    link: ['fudis-link-1', 'custom-id-for-link', 'fudis-link-3'],
    section: ['fudis-section-1', 'custom-id-for-section', 'fudis-section-3'],
    'text-area': ['fudis-text-area-1', 'custom-id-for-text-area', 'fudis-text-area-3'],
    'text-input': ['fudis-text-input-1', 'custom-id-for-text-input', 'fudis-text-input-3'],
    'validator-error-message': [
      'fudis-validator-error-message-1',
      'custom-id-for-validator-error-message',
      'fudis-validator-error-message-3',
    ],
  },
  parents: {
    breadcrumbs: {},
    'checkbox-group': {},
    'language-badge-group': {},
    'radio-button-group': {},
  },
  grandParents: {
    'description-list': {},
    'dropdown-menu': {},
    select: {},
    multiselect: {},
  },
};

export const testParentDataAfter: FudisIdData = {
  components: {
    alert: [],
    autocomplete: [],
    'body-text': [],
    button: [],
    'autocomplete-multi-select': [],
    datepicker: [],
    dialog: [],
    dropdown: [],
    'error-message': [],
    expandable: [],
    fieldset: [],
    form: [],
    guidance: [],
    heading: [],
    'localized-text-group': [],
    link: [],
    section: [],
    'text-area': [],
    'text-input': [],
    'validator-error-message': [],
  },
  parents: {
    breadcrumbs: {
      'fudis-breadcrumbs-1': [
        'fudis-breadcrumbs-1-item-1',
        'breadcrumbs-1-custom-child-id',
        'fudis-breadcrumbs-1-item-3',
      ],
      'breadcrumbs-some-custom-id': [
        'breadcrumbs-some-custom-id-item-1',
        'breadcrumbs-2-custom-child-id',
        'breadcrumbs-some-custom-id-item-3',
      ],
      'fudis-breadcrumbs-3': [
        'fudis-breadcrumbs-3-item-1',
        'breadcrumbs-3-custom-child-id',
        'fudis-breadcrumbs-3-item-3',
      ],
    },
    'checkbox-group': {
      'fudis-checkbox-group-1': [
        'fudis-checkbox-group-1-item-1',
        'checkbox-group-1-custom-child-id',
        'fudis-checkbox-group-1-item-3',
      ],
      'checkbox-group-some-custom-id': [
        'checkbox-group-some-custom-id-item-1',
        'checkbox-group-2-custom-child-id',
        'checkbox-group-some-custom-id-item-3',
      ],
      'fudis-checkbox-group-3': [
        'fudis-checkbox-group-3-item-1',
        'checkbox-group-3-custom-child-id',
        'fudis-checkbox-group-3-item-3',
      ],
    },
    'language-badge-group': {
      'fudis-language-badge-group-1': [
        'fudis-language-badge-group-1-item-1',
        'language-badge-group-1-custom-child-id',
        'fudis-language-badge-group-1-item-3',
      ],
      'language-badge-group-some-custom-id': [
        'language-badge-group-some-custom-id-item-1',
        'language-badge-group-2-custom-child-id',
        'language-badge-group-some-custom-id-item-3',
      ],
      'fudis-language-badge-group-3': [
        'fudis-language-badge-group-3-item-1',
        'language-badge-group-3-custom-child-id',
        'fudis-language-badge-group-3-item-3',
      ],
    },
    'radio-button-group': {
      'fudis-radio-button-group-1': [
        'fudis-radio-button-group-1-item-1',
        'radio-button-group-1-custom-child-id',
        'fudis-radio-button-group-1-item-3',
      ],
      'radio-button-group-some-custom-id': [
        'radio-button-group-some-custom-id-item-1',
        'radio-button-group-2-custom-child-id',
        'radio-button-group-some-custom-id-item-3',
      ],
      'fudis-radio-button-group-3': [
        'fudis-radio-button-group-3-item-1',
        'radio-button-group-3-custom-child-id',
        'fudis-radio-button-group-3-item-3',
      ],
    },
  },
  grandParents: {
    'description-list': {},
    'dropdown-menu': {},
    select: {},
    multiselect: {},
  },
};

export const testGrandParentDataAfter: FudisIdData = {
  components: {
    alert: [],
    autocomplete: [],
    'body-text': [],
    button: [],
    'autocomplete-multi-select': [],
    datepicker: [],
    dialog: [],
    dropdown: [],
    'error-message': [],
    expandable: [],
    fieldset: [],
    form: [],
    guidance: [],
    heading: [],
    'localized-text-group': [],
    link: [],
    section: [],
    'text-area': [],
    'text-input': [],
    'validator-error-message': [],
  },
  parents: {
    breadcrumbs: {},
    'checkbox-group': {},
    'language-badge-group': {},
    'radio-button-group': {},
  },
  grandParents: {
    'description-list': {
      'fudis-description-list-1': {
        id: 'fudis-description-list-1',
        items: {
          'fudis-description-list-1-item-1': {
            term: ['fudis-description-list-1-item-1-term-1'],
            details: [
              'fudis-description-list-1-item-1-details-1',
              'fudis-description-list-1-item-1-details-2',
              'fudis-description-list-1-item-1-details-3',
            ],
          },
          'fudis-description-list-1-custom-child-id': {
            term: ['fudis-description-list-1-custom-child-id-term-1'],
            details: [
              'fudis-description-list-1-custom-child-id-details-1',
              'fudis-description-list-1-custom-child-id-details-2',
              'fudis-description-list-1-custom-child-id-details-3',
            ],
          },
          'fudis-description-list-1-item-3': {
            term: ['fudis-description-list-1-item-3-term-1'],
            details: [
              'fudis-description-list-1-item-3-details-1',
              'fudis-description-list-1-item-3-details-2',
              'fudis-description-list-1-item-3-details-3',
            ],
          },
        },
      },
      'custom-id-for-description-list': {
        id: 'custom-id-for-description-list',
        items: {
          'custom-id-for-description-list-item-1': {
            term: ['custom-id-for-description-list-item-1-term-1'],
            details: [
              'custom-id-for-description-list-item-1-details-1',
              'custom-id-for-description-list-item-1-details-2',
              'custom-id-for-description-list-item-1-details-3',
            ],
          },
          'fudis-description-list-2-custom-child-id': {
            term: ['fudis-description-list-2-custom-child-id-term-1'],
            details: [
              'fudis-description-list-2-custom-child-id-details-1',
              'fudis-description-list-2-custom-child-id-details-2',
              'fudis-description-list-2-custom-child-id-details-3',
            ],
          },
          'custom-id-for-description-list-item-3': {
            term: ['custom-id-for-description-list-item-3-term-1'],
            details: [
              'custom-id-for-description-list-item-3-details-1',
              'custom-id-for-description-list-item-3-details-2',
              'custom-id-for-description-list-item-3-details-3',
            ],
          },
        },
      },
      'fudis-description-list-3': {
        id: 'fudis-description-list-3',
        items: {
          'fudis-description-list-3-item-1': {
            term: ['fudis-description-list-3-item-1-term-1'],
            details: [
              'fudis-description-list-3-item-1-details-1',
              'fudis-description-list-3-item-1-details-2',
              'fudis-description-list-3-item-1-details-3',
            ],
          },
          'fudis-description-list-3-custom-child-id': {
            term: ['fudis-description-list-3-custom-child-id-term-1'],
            details: [
              'fudis-description-list-3-custom-child-id-details-1',
              'fudis-description-list-3-custom-child-id-details-2',
              'fudis-description-list-3-custom-child-id-details-3',
            ],
          },
          'fudis-description-list-3-item-3': {
            term: ['fudis-description-list-3-item-3-term-1'],
            details: [
              'fudis-description-list-3-item-3-details-1',
              'fudis-description-list-3-item-3-details-2',
              'fudis-description-list-3-item-3-details-3',
            ],
          },
        },
      },
    },
    'dropdown-menu': {
      'fudis-dropdown-menu-1': {
        id: 'fudis-dropdown-menu-1',
        groups: {
          'fudis-dropdown-menu-1-group-1': [
            'fudis-dropdown-menu-1-group-1-option-1',
            'fudis-dropdown-menu-1-group-1-option-2',
            'fudis-dropdown-menu-1-group-1-option-3',
          ],
          'fudis-dropdown-menu-1-custom-child-id': [
            'fudis-dropdown-menu-1-custom-child-id-option-1',
            'fudis-dropdown-menu-1-custom-child-id-option-2',
            'fudis-dropdown-menu-1-custom-child-id-option-3',
          ],
          'fudis-dropdown-menu-1-group-3': [
            'fudis-dropdown-menu-1-group-3-option-1',
            'fudis-dropdown-menu-1-group-3-option-2',
            'fudis-dropdown-menu-1-group-3-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-dropdown-menu-1-option-1',
          'fudis-dropdown-menu-1-option-2',
          'fudis-dropdown-menu-1-option-3',
        ],
      },
      'custom-id-for-dropdown-menu': {
        id: 'custom-id-for-dropdown-menu',
        groups: {
          'custom-id-for-dropdown-menu-group-1': [
            'custom-id-for-dropdown-menu-group-1-option-1',
            'custom-id-for-dropdown-menu-group-1-option-2',
            'custom-id-for-dropdown-menu-group-1-option-3',
          ],
          'fudis-dropdown-menu-2-custom-child-id': [
            'fudis-dropdown-menu-2-custom-child-id-option-1',
            'fudis-dropdown-menu-2-custom-child-id-option-2',
            'fudis-dropdown-menu-2-custom-child-id-option-3',
          ],
          'custom-id-for-dropdown-menu-group-3': [
            'custom-id-for-dropdown-menu-group-3-option-1',
            'custom-id-for-dropdown-menu-group-3-option-2',
            'custom-id-for-dropdown-menu-group-3-option-3',
          ],
        },
        nonGroupedOptions: [
          'custom-id-for-dropdown-menu-option-1',
          'custom-id-for-dropdown-menu-option-2',
          'custom-id-for-dropdown-menu-option-3',
        ],
      },
      'fudis-dropdown-menu-3': {
        id: 'fudis-dropdown-menu-3',
        groups: {
          'fudis-dropdown-menu-3-group-1': [
            'fudis-dropdown-menu-3-group-1-option-1',
            'fudis-dropdown-menu-3-group-1-option-2',
            'fudis-dropdown-menu-3-group-1-option-3',
          ],
          'fudis-dropdown-menu-3-custom-child-id': [
            'fudis-dropdown-menu-3-custom-child-id-option-1',
            'fudis-dropdown-menu-3-custom-child-id-option-2',
            'fudis-dropdown-menu-3-custom-child-id-option-3',
          ],
          'fudis-dropdown-menu-3-group-3': [
            'fudis-dropdown-menu-3-group-3-option-1',
            'fudis-dropdown-menu-3-group-3-option-2',
            'fudis-dropdown-menu-3-group-3-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-dropdown-menu-3-option-1',
          'fudis-dropdown-menu-3-option-2',
          'fudis-dropdown-menu-3-option-3',
        ],
      },
    },
    select: {
      'fudis-select-1': {
        id: 'fudis-select-1',
        groups: {
          'fudis-select-1-group-1': [
            'fudis-select-1-option-id-1',
            'fudis-select-1-option-id-2',
            'fudis-select-1-option-id-3',
          ],
          'fudis-select-1-custom-child-id': [
            'fudis-select-1-option-id-4',
            'fudis-select-1-option-id-5',
            'fudis-select-1-option-id-6',
          ],
          'fudis-select-1-group-3': [
            'fudis-select-1-option-id-7',
            'fudis-select-1-option-id-8',
            'fudis-select-1-option-id-9',
          ],
        },
        nonGroupedOptions: [
          'fudis-select-1-option-value-1',
          'fudis-select-1-option-value-2',
          'fudis-select-1-option-value-3',
        ],
      },
      'custom-id-for-select': {
        id: 'custom-id-for-select',
        groups: {
          'custom-id-for-select-group-1': [
            'custom-id-for-select-option-id-10',
            'custom-id-for-select-option-id-11',
            'custom-id-for-select-option-id-12',
          ],
          'fudis-select-2-custom-child-id': [
            'custom-id-for-select-option-id-13',
            'custom-id-for-select-option-id-14',
            'custom-id-for-select-option-id-15',
          ],
          'custom-id-for-select-group-3': [
            'custom-id-for-select-option-id-16',
            'custom-id-for-select-option-id-17',
            'custom-id-for-select-option-id-18',
          ],
        },
        nonGroupedOptions: [
          'custom-id-for-select-option-value-4',
          'custom-id-for-select-option-value-5',
          'custom-id-for-select-option-value-6',
        ],
      },
      'fudis-select-3': {
        id: 'fudis-select-3',
        groups: {
          'fudis-select-3-group-1': [
            'fudis-select-3-option-id-19',
            'fudis-select-3-option-id-20',
            'fudis-select-3-option-id-21',
          ],
          'fudis-select-3-custom-child-id': [
            'fudis-select-3-option-id-22',
            'fudis-select-3-option-id-23',
            'fudis-select-3-option-id-24',
          ],
          'fudis-select-3-group-3': [
            'fudis-select-3-option-id-25',
            'fudis-select-3-option-id-26',
            'fudis-select-3-option-id-27',
          ],
        },
        nonGroupedOptions: [
          'fudis-select-3-option-value-7',
          'fudis-select-3-option-value-8',
          'fudis-select-3-option-value-9',
        ],
      },
    },
    multiselect: {
      'fudis-multiselect-1': {
        id: 'fudis-multiselect-1',
        groups: {
          'fudis-multiselect-1-group-1': [
            'fudis-multiselect-1-option-id-28',
            'fudis-multiselect-1-option-id-29',
            'fudis-multiselect-1-option-id-30',
          ],
          'fudis-multiselect-1-custom-child-id': [
            'fudis-multiselect-1-option-id-31',
            'fudis-multiselect-1-option-id-32',
            'fudis-multiselect-1-option-id-33',
          ],
          'fudis-multiselect-1-group-3': [
            'fudis-multiselect-1-option-id-34',
            'fudis-multiselect-1-option-id-35',
            'fudis-multiselect-1-option-id-36',
          ],
        },
        nonGroupedOptions: [
          'fudis-multiselect-1-option-value-10',
          'fudis-multiselect-1-option-value-11',
          'fudis-multiselect-1-option-value-12',
        ],
      },
      'custom-id-for-multiselect': {
        id: 'custom-id-for-multiselect',
        groups: {
          'custom-id-for-multiselect-group-1': [
            'custom-id-for-multiselect-option-id-37',
            'custom-id-for-multiselect-option-id-38',
            'custom-id-for-multiselect-option-id-39',
          ],
          'fudis-multiselect-2-custom-child-id': [
            'custom-id-for-multiselect-option-id-40',
            'custom-id-for-multiselect-option-id-41',
            'custom-id-for-multiselect-option-id-42',
          ],
          'custom-id-for-multiselect-group-3': [
            'custom-id-for-multiselect-option-id-43',
            'custom-id-for-multiselect-option-id-44',
            'custom-id-for-multiselect-option-id-45',
          ],
        },
        nonGroupedOptions: [
          'custom-id-for-multiselect-option-value-13',
          'custom-id-for-multiselect-option-value-14',
          'custom-id-for-multiselect-option-value-15',
        ],
      },
      'fudis-multiselect-3': {
        id: 'fudis-multiselect-3',
        groups: {
          'fudis-multiselect-3-group-1': [
            'fudis-multiselect-3-option-id-46',
            'fudis-multiselect-3-option-id-47',
            'fudis-multiselect-3-option-id-48',
          ],
          'fudis-multiselect-3-custom-child-id': [
            'fudis-multiselect-3-option-id-49',
            'fudis-multiselect-3-option-id-50',
            'fudis-multiselect-3-option-id-51',
          ],
          'fudis-multiselect-3-group-3': [
            'fudis-multiselect-3-option-id-52',
            'fudis-multiselect-3-option-id-53',
            'fudis-multiselect-3-option-id-54',
          ],
        },
        nonGroupedOptions: [
          'fudis-multiselect-3-option-value-16',
          'fudis-multiselect-3-option-value-17',
          'fudis-multiselect-3-option-value-18',
        ],
      },
    },
  },
};
