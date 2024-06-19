import { FudisIdData } from '../../types/id';

export const testDataBefore: FudisIdData = {
  components: {
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
    datepicker: [
      'fudis-datepicker-1',
      'fudis-datepicker-2',
      'custom-id-for-datepicker',
      'fudis-datepicker-4',
    ],
    daterange: [
      'fudis-daterange-1',
      'fudis-daterange-2',
      'custom-id-for-daterange',
      'fudis-daterange-4',
    ],
    dialog: ['fudis-dialog-1', 'fudis-dialog-2', 'custom-id-for-dialog', 'fudis-dialog-4'],
    dropdown: [
      'fudis-dropdown-1',
      'fudis-dropdown-2',
      'custom-id-for-dropdown',
      'fudis-dropdown-4',
    ],
    'error-message': [
      'fudis-error-message-1',
      'fudis-error-message-2',
      'custom-id-for-error-message',
      'fudis-error-message-4',
    ],
    expandable: [
      'fudis-expandable-1',
      'fudis-expandable-2',
      'custom-id-for-expandable',
      'fudis-expandable-4',
    ],
    fieldset: [
      'fudis-fieldset-1',
      'fudis-fieldset-2',
      'custom-id-for-fieldset',
      'fudis-fieldset-4',
    ],
    form: ['fudis-form-1', 'fudis-form-2', 'custom-id-for-form', 'fudis-form-4'],
    guidance: [
      'fudis-guidance-1',
      'fudis-guidance-2',
      'custom-id-for-guidance',
      'fudis-guidance-4',
    ],
    heading: ['fudis-heading-1', 'fudis-heading-2', 'custom-id-for-heading', 'fudis-heading-4'],
    'input-with-language-options': [
      'fudis-input-with-language-options-1',
      'fudis-input-with-language-options-2',
      'custom-id-for-input-with-language-options',
      'fudis-input-with-language-options-4',
    ],
    link: ['fudis-link-1', 'fudis-link-2', 'custom-id-for-link', 'fudis-link-4'],
    section: ['fudis-section-1', 'fudis-section-2', 'custom-id-for-section', 'fudis-section-4'],
    'text-area': [
      'fudis-text-area-1',
      'fudis-text-area-2',
      'custom-id-for-text-area',
      'fudis-text-area-4',
    ],
    'text-input': [
      'fudis-text-input-1',
      'fudis-text-input-2',
      'custom-id-for-text-input',
      'fudis-text-input-4',
    ],
    'validator-error-message': [
      'fudis-validator-error-message-1',
      'fudis-validator-error-message-2',
      'custom-id-for-validator-error-message',
      'fudis-validator-error-message-4',
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
        'fudis-breadcrumbs-1-item-2',
        'breadcrumbs-1-custom-child-id',
        'fudis-breadcrumbs-1-item-4',
        'fudis-breadcrumbs-1-item-5',
      ],
      'breadcrumbs-some-custom-id': [
        'breadcrumbs-some-custom-id-item-1',
        'breadcrumbs-some-custom-id-item-2',
        'breadcrumbs-2-custom-child-id',
        'breadcrumbs-some-custom-id-item-4',
        'breadcrumbs-some-custom-id-item-5',
      ],
      'fudis-breadcrumbs-3': [
        'fudis-breadcrumbs-3-item-1',
        'fudis-breadcrumbs-3-item-2',
        'breadcrumbs-3-custom-child-id',
        'fudis-breadcrumbs-3-item-4',
        'fudis-breadcrumbs-3-item-5',
      ],
    },
    'checkbox-group': {
      'fudis-checkbox-group-1': [
        'fudis-checkbox-group-1-item-1',
        'fudis-checkbox-group-1-item-2',
        'checkbox-group-1-custom-child-id',
        'fudis-checkbox-group-1-item-4',
        'fudis-checkbox-group-1-item-5',
      ],
      'checkbox-group-some-custom-id': [
        'checkbox-group-some-custom-id-item-1',
        'checkbox-group-some-custom-id-item-2',
        'checkbox-group-2-custom-child-id',
        'checkbox-group-some-custom-id-item-4',
        'checkbox-group-some-custom-id-item-5',
      ],
      'fudis-checkbox-group-3': [
        'fudis-checkbox-group-3-item-1',
        'fudis-checkbox-group-3-item-2',
        'checkbox-group-3-custom-child-id',
        'fudis-checkbox-group-3-item-4',
        'fudis-checkbox-group-3-item-5',
      ],
    },
    'language-badge-group': {
      'fudis-language-badge-group-1': [
        'fudis-language-badge-group-1-item-1',
        'fudis-language-badge-group-1-item-2',
        'language-badge-group-1-custom-child-id',
        'fudis-language-badge-group-1-item-4',
        'fudis-language-badge-group-1-item-5',
      ],
      'language-badge-group-some-custom-id': [
        'language-badge-group-some-custom-id-item-1',
        'language-badge-group-some-custom-id-item-2',
        'language-badge-group-2-custom-child-id',
        'language-badge-group-some-custom-id-item-4',
        'language-badge-group-some-custom-id-item-5',
      ],
      'fudis-language-badge-group-3': [
        'fudis-language-badge-group-3-item-1',
        'fudis-language-badge-group-3-item-2',
        'language-badge-group-3-custom-child-id',
        'fudis-language-badge-group-3-item-4',
        'fudis-language-badge-group-3-item-5',
      ],
    },
    'radio-button-group': {
      'fudis-radio-button-group-1': [
        'fudis-radio-button-group-1-item-1',
        'fudis-radio-button-group-1-item-2',
        'radio-button-group-1-custom-child-id',
        'fudis-radio-button-group-1-item-4',
        'fudis-radio-button-group-1-item-5',
      ],
      'radio-button-group-some-custom-id': [
        'radio-button-group-some-custom-id-item-1',
        'radio-button-group-some-custom-id-item-2',
        'radio-button-group-2-custom-child-id',
        'radio-button-group-some-custom-id-item-4',
        'radio-button-group-some-custom-id-item-5',
      ],
      'fudis-radio-button-group-3': [
        'fudis-radio-button-group-3-item-1',
        'fudis-radio-button-group-3-item-2',
        'radio-button-group-3-custom-child-id',
        'fudis-radio-button-group-3-item-4',
        'fudis-radio-button-group-3-item-5',
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
          'fudis-description-list-1-item-2': {
            term: ['fudis-description-list-1-item-2-term-1'],
            details: [
              'fudis-description-list-1-item-2-details-1',
              'fudis-description-list-1-item-2-details-2',
              'fudis-description-list-1-item-2-details-3',
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
          'fudis-description-list-1-item-4': {
            term: ['fudis-description-list-1-item-4-term-1'],
            details: [
              'fudis-description-list-1-item-4-details-1',
              'fudis-description-list-1-item-4-details-2',
              'fudis-description-list-1-item-4-details-3',
            ],
          },
          'fudis-description-list-1-item-5': {
            term: ['fudis-description-list-1-item-5-term-1'],
            details: [
              'fudis-description-list-1-item-5-details-1',
              'fudis-description-list-1-item-5-details-2',
              'fudis-description-list-1-item-5-details-3',
            ],
          },
        },
      },
      'fudis-description-list-2': {
        id: 'fudis-description-list-2',
        items: {
          'fudis-description-list-2-item-1': {
            term: ['fudis-description-list-2-item-1-term-1'],
            details: [
              'fudis-description-list-2-item-1-details-1',
              'fudis-description-list-2-item-1-details-2',
              'fudis-description-list-2-item-1-details-3',
            ],
          },
          'fudis-description-list-2-item-2': {
            term: ['fudis-description-list-2-item-2-term-1'],
            details: [
              'fudis-description-list-2-item-2-details-1',
              'fudis-description-list-2-item-2-details-2',
              'fudis-description-list-2-item-2-details-3',
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
          'fudis-description-list-2-item-4': {
            term: ['fudis-description-list-2-item-4-term-1'],
            details: [
              'fudis-description-list-2-item-4-details-1',
              'fudis-description-list-2-item-4-details-2',
              'fudis-description-list-2-item-4-details-3',
            ],
          },
          'fudis-description-list-2-item-5': {
            term: ['fudis-description-list-2-item-5-term-1'],
            details: [
              'fudis-description-list-2-item-5-details-1',
              'fudis-description-list-2-item-5-details-2',
              'fudis-description-list-2-item-5-details-3',
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
          'custom-id-for-description-list-item-2': {
            term: ['custom-id-for-description-list-item-2-term-1'],
            details: [
              'custom-id-for-description-list-item-2-details-1',
              'custom-id-for-description-list-item-2-details-2',
              'custom-id-for-description-list-item-2-details-3',
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
          'custom-id-for-description-list-item-4': {
            term: ['custom-id-for-description-list-item-4-term-1'],
            details: [
              'custom-id-for-description-list-item-4-details-1',
              'custom-id-for-description-list-item-4-details-2',
              'custom-id-for-description-list-item-4-details-3',
            ],
          },
          'custom-id-for-description-list-item-5': {
            term: ['custom-id-for-description-list-item-5-term-1'],
            details: [
              'custom-id-for-description-list-item-5-details-1',
              'custom-id-for-description-list-item-5-details-2',
              'custom-id-for-description-list-item-5-details-3',
            ],
          },
        },
      },
      'fudis-description-list-4': {
        id: 'fudis-description-list-4',
        items: {
          'fudis-description-list-4-item-1': {
            term: ['fudis-description-list-4-item-1-term-1'],
            details: [
              'fudis-description-list-4-item-1-details-1',
              'fudis-description-list-4-item-1-details-2',
              'fudis-description-list-4-item-1-details-3',
            ],
          },
          'fudis-description-list-4-item-2': {
            term: ['fudis-description-list-4-item-2-term-1'],
            details: [
              'fudis-description-list-4-item-2-details-1',
              'fudis-description-list-4-item-2-details-2',
              'fudis-description-list-4-item-2-details-3',
            ],
          },
          'fudis-description-list-4-custom-child-id': {
            term: ['fudis-description-list-4-custom-child-id-term-1'],
            details: [
              'fudis-description-list-4-custom-child-id-details-1',
              'fudis-description-list-4-custom-child-id-details-2',
              'fudis-description-list-4-custom-child-id-details-3',
            ],
          },
          'fudis-description-list-4-item-4': {
            term: ['fudis-description-list-4-item-4-term-1'],
            details: [
              'fudis-description-list-4-item-4-details-1',
              'fudis-description-list-4-item-4-details-2',
              'fudis-description-list-4-item-4-details-3',
            ],
          },
          'fudis-description-list-4-item-5': {
            term: ['fudis-description-list-4-item-5-term-1'],
            details: [
              'fudis-description-list-4-item-5-details-1',
              'fudis-description-list-4-item-5-details-2',
              'fudis-description-list-4-item-5-details-3',
            ],
          },
        },
      },
      'fudis-description-list-5': {
        id: 'fudis-description-list-5',
        items: {
          'fudis-description-list-5-item-1': {
            term: ['fudis-description-list-5-item-1-term-1'],
            details: [
              'fudis-description-list-5-item-1-details-1',
              'fudis-description-list-5-item-1-details-2',
              'fudis-description-list-5-item-1-details-3',
            ],
          },
          'fudis-description-list-5-item-2': {
            term: ['fudis-description-list-5-item-2-term-1'],
            details: [
              'fudis-description-list-5-item-2-details-1',
              'fudis-description-list-5-item-2-details-2',
              'fudis-description-list-5-item-2-details-3',
            ],
          },
          'fudis-description-list-5-custom-child-id': {
            term: ['fudis-description-list-5-custom-child-id-term-1'],
            details: [
              'fudis-description-list-5-custom-child-id-details-1',
              'fudis-description-list-5-custom-child-id-details-2',
              'fudis-description-list-5-custom-child-id-details-3',
            ],
          },
          'fudis-description-list-5-item-4': {
            term: ['fudis-description-list-5-item-4-term-1'],
            details: [
              'fudis-description-list-5-item-4-details-1',
              'fudis-description-list-5-item-4-details-2',
              'fudis-description-list-5-item-4-details-3',
            ],
          },
          'fudis-description-list-5-item-5': {
            term: ['fudis-description-list-5-item-5-term-1'],
            details: [
              'fudis-description-list-5-item-5-details-1',
              'fudis-description-list-5-item-5-details-2',
              'fudis-description-list-5-item-5-details-3',
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
          'fudis-dropdown-menu-1-group-2': [
            'fudis-dropdown-menu-1-group-2-option-1',
            'fudis-dropdown-menu-1-group-2-option-2',
            'fudis-dropdown-menu-1-group-2-option-3',
          ],
          'dropdown-menu-1-custom-child-id': [
            'dropdown-menu-1-custom-child-id-option-1',
            'dropdown-menu-1-custom-child-id-option-2',
            'dropdown-menu-1-custom-child-id-option-3',
          ],
          'fudis-dropdown-menu-1-group-4': [
            'fudis-dropdown-menu-1-group-4-option-1',
            'fudis-dropdown-menu-1-group-4-option-2',
            'fudis-dropdown-menu-1-group-4-option-3',
          ],
          'fudis-dropdown-menu-1-group-5': [
            'fudis-dropdown-menu-1-group-5-option-1',
            'fudis-dropdown-menu-1-group-5-option-2',
            'fudis-dropdown-menu-1-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-dropdown-menu-1-option-1',
          'fudis-dropdown-menu-1-option-2',
          'fudis-dropdown-menu-1-option-3',
        ],
      },
      'fudis-dropdown-menu-2': {
        id: 'fudis-dropdown-menu-2',
        groups: {
          'fudis-dropdown-menu-2-group-1': [
            'fudis-dropdown-menu-2-group-1-option-1',
            'fudis-dropdown-menu-2-group-1-option-2',
            'fudis-dropdown-menu-2-group-1-option-3',
          ],
          'fudis-dropdown-menu-2-group-2': [
            'fudis-dropdown-menu-2-group-2-option-1',
            'fudis-dropdown-menu-2-group-2-option-2',
            'fudis-dropdown-menu-2-group-2-option-3',
          ],
          'dropdown-menu-2-custom-child-id': [
            'dropdown-menu-2-custom-child-id-option-1',
            'dropdown-menu-2-custom-child-id-option-2',
            'dropdown-menu-2-custom-child-id-option-3',
          ],
          'fudis-dropdown-menu-2-group-4': [
            'fudis-dropdown-menu-2-group-4-option-1',
            'fudis-dropdown-menu-2-group-4-option-2',
            'fudis-dropdown-menu-2-group-4-option-3',
          ],
          'fudis-dropdown-menu-2-group-5': [
            'fudis-dropdown-menu-2-group-5-option-1',
            'fudis-dropdown-menu-2-group-5-option-2',
            'fudis-dropdown-menu-2-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-dropdown-menu-2-option-1',
          'fudis-dropdown-menu-2-option-2',
          'fudis-dropdown-menu-2-option-3',
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
          'custom-id-for-dropdown-menu-group-2': [
            'custom-id-for-dropdown-menu-group-2-option-1',
            'custom-id-for-dropdown-menu-group-2-option-2',
            'custom-id-for-dropdown-menu-group-2-option-3',
          ],
          'fudis-dropdown-menu-3-custom-child-id': [
            'fudis-dropdown-menu-3-custom-child-id-option-1',
            'fudis-dropdown-menu-3-custom-child-id-option-2',
            'fudis-dropdown-menu-3-custom-child-id-option-3',
          ],
          'custom-id-for-dropdown-menu-group-4': [
            'custom-id-for-dropdown-menu-group-4-option-1',
            'custom-id-for-dropdown-menu-group-4-option-2',
            'custom-id-for-dropdown-menu-group-4-option-3',
          ],
          'custom-id-for-dropdown-menu-group-5': [
            'custom-id-for-dropdown-menu-group-5-option-1',
            'custom-id-for-dropdown-menu-group-5-option-2',
            'custom-id-for-dropdown-menu-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'custom-id-for-dropdown-menu-option-1',
          'custom-id-for-dropdown-menu-option-2',
          'custom-id-for-dropdown-menu-option-3',
        ],
      },
      'fudis-dropdown-menu-4': {
        id: 'fudis-dropdown-menu-4',
        groups: {
          'fudis-dropdown-menu-4-group-1': [
            'fudis-dropdown-menu-4-group-1-option-1',
            'fudis-dropdown-menu-4-group-1-option-2',
            'fudis-dropdown-menu-4-group-1-option-3',
          ],
          'fudis-dropdown-menu-4-group-2': [
            'fudis-dropdown-menu-4-group-2-option-1',
            'fudis-dropdown-menu-4-group-2-option-2',
            'fudis-dropdown-menu-4-group-2-option-3',
          ],
          'dropdown-menu-4-custom-child-id': [
            'dropdown-menu-4-custom-child-id-option-1',
            'dropdown-menu-4-custom-child-id-option-2',
            'dropdown-menu-4-custom-child-id-option-3',
          ],
          'fudis-dropdown-menu-4-group-4': [
            'fudis-dropdown-menu-4-group-4-option-1',
            'fudis-dropdown-menu-4-group-4-option-2',
            'fudis-dropdown-menu-4-group-4-option-3',
          ],
          'fudis-dropdown-menu-4-group-5': [
            'fudis-dropdown-menu-4-group-5-option-1',
            'fudis-dropdown-menu-4-group-5-option-2',
            'fudis-dropdown-menu-4-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-dropdown-menu-4-option-1',
          'fudis-dropdown-menu-4-option-2',
          'fudis-dropdown-menu-4-option-3',
        ],
      },
      'fudis-dropdown-menu-5': {
        id: 'fudis-dropdown-menu-5',
        groups: {
          'fudis-dropdown-menu-5-group-1': [
            'fudis-dropdown-menu-5-group-1-option-1',
            'fudis-dropdown-menu-5-group-1-option-2',
            'fudis-dropdown-menu-5-group-1-option-3',
          ],
          'fudis-dropdown-menu-5-group-2': [
            'fudis-dropdown-menu-5-group-2-option-1',
            'fudis-dropdown-menu-5-group-2-option-2',
            'fudis-dropdown-menu-5-group-2-option-3',
          ],
          'dropdown-menu-5-custom-child-id': [
            'dropdown-menu-5-custom-child-id-option-1',
            'dropdown-menu-5-custom-child-id-option-2',
            'dropdown-menu-5-custom-child-id-option-3',
          ],
          'fudis-dropdown-menu-5-group-4': [
            'fudis-dropdown-menu-5-group-4-option-1',
            'fudis-dropdown-menu-5-group-4-option-2',
            'fudis-dropdown-menu-5-group-4-option-3',
          ],
          'fudis-dropdown-menu-5-group-5': [
            'fudis-dropdown-menu-5-group-5-option-1',
            'fudis-dropdown-menu-5-group-5-option-2',
            'fudis-dropdown-menu-5-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-dropdown-menu-5-option-1',
          'fudis-dropdown-menu-5-option-2',
          'fudis-dropdown-menu-5-option-3',
        ],
      },
    },

    select: {
      'fudis-select-1': {
        id: 'fudis-select-1',
        groups: {
          'fudis-select-1-group-1': [
            'fudis-select-1-group-1-option-1',
            'fudis-select-1-group-1-option-2',
            'fudis-select-1-group-1-option-3',
          ],
          'fudis-select-1-group-2': [
            'fudis-select-1-group-2-option-1',
            'fudis-select-1-group-2-option-2',
            'fudis-select-1-group-2-option-3',
          ],
          'fudis-select-1-custom-child-id': [
            'fudis-select-1-custom-child-id-option-1',
            'fudis-select-1-custom-child-id-option-2',
            'fudis-select-1-custom-child-id-option-3',
          ],
          'fudis-select-1-group-4': [
            'fudis-select-1-group-4-option-1',
            'fudis-select-1-group-4-option-2',
            'fudis-select-1-group-4-option-3',
          ],
          'fudis-select-1-group-5': [
            'fudis-select-1-group-5-option-1',
            'fudis-select-1-group-5-option-2',
            'fudis-select-1-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-select-1-option-1',
          'fudis-select-1-option-2',
          'fudis-select-1-option-3',
        ],
      },
      'fudis-select-2': {
        id: 'fudis-select-2',
        groups: {
          'fudis-select-2-group-1': [
            'fudis-select-2-group-1-option-1',
            'fudis-select-2-group-1-option-2',
            'fudis-select-2-group-1-option-3',
          ],
          'fudis-select-2-group-2': [
            'fudis-select-2-group-2-option-1',
            'fudis-select-2-group-2-option-2',
            'fudis-select-2-group-2-option-3',
          ],
          'fudis-select-2-custom-child-id': [
            'fudis-select-2-custom-child-id-option-1',
            'fudis-select-2-custom-child-id-option-2',
            'fudis-select-2-custom-child-id-option-3',
          ],
          'fudis-select-2-group-4': [
            'fudis-select-2-group-4-option-1',
            'fudis-select-2-group-4-option-2',
            'fudis-select-2-group-4-option-3',
          ],
          'fudis-select-2-group-5': [
            'fudis-select-2-group-5-option-1',
            'fudis-select-2-group-5-option-2',
            'fudis-select-2-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-select-2-option-1',
          'fudis-select-2-option-2',
          'fudis-select-2-option-3',
        ],
      },
      'custom-id-for-select': {
        id: 'custom-id-for-select',
        groups: {
          'custom-id-for-select-group-1': [
            'custom-id-for-select-group-1-option-1',
            'custom-id-for-select-group-1-option-2',
            'custom-id-for-select-group-1-option-3',
          ],
          'custom-id-for-select-group-2': [
            'custom-id-for-select-group-2-option-1',
            'custom-id-for-select-group-2-option-2',
            'custom-id-for-select-group-2-option-3',
          ],
          'fudis-select-3-custom-child-id': [
            'fudis-select-3-custom-child-id-option-1',
            'fudis-select-3-custom-child-id-option-2',
            'fudis-select-3-custom-child-id-option-3',
          ],
          'custom-id-for-select-group-4': [
            'custom-id-for-select-group-4-option-1',
            'custom-id-for-select-group-4-option-2',
            'custom-id-for-select-group-4-option-3',
          ],
          'custom-id-for-select-group-5': [
            'custom-id-for-select-group-5-option-1',
            'custom-id-for-select-group-5-option-2',
            'custom-id-for-select-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'custom-id-for-select-option-1',
          'custom-id-for-select-option-2',
          'custom-id-for-select-option-3',
        ],
      },
      'fudis-select-4': {
        id: 'fudis-select-4',
        groups: {
          'fudis-select-4-group-1': [
            'fudis-select-4-group-1-option-1',
            'fudis-select-4-group-1-option-2',
            'fudis-select-4-group-1-option-3',
          ],
          'fudis-select-4-group-2': [
            'fudis-select-4-group-2-option-1',
            'fudis-select-4-group-2-option-2',
            'fudis-select-4-group-2-option-3',
          ],
          'fudis-select-4-custom-child-id': [
            'fudis-select-4-custom-child-id-option-1',
            'fudis-select-4-custom-child-id-option-2',
            'fudis-select-4-custom-child-id-option-3',
          ],
          'fudis-select-4-group-4': [
            'fudis-select-4-group-4-option-1',
            'fudis-select-4-group-4-option-2',
            'fudis-select-4-group-4-option-3',
          ],
          'fudis-select-4-group-5': [
            'fudis-select-4-group-5-option-1',
            'fudis-select-4-group-5-option-2',
            'fudis-select-4-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-select-4-option-1',
          'fudis-select-4-option-2',
          'fudis-select-4-option-3',
        ],
      },
      'fudis-select-5': {
        id: 'fudis-select-5',
        groups: {
          'fudis-select-5-group-1': [
            'fudis-select-5-group-1-option-1',
            'fudis-select-5-group-1-option-2',
            'fudis-select-5-group-1-option-3',
          ],
          'fudis-select-5-group-2': [
            'fudis-select-5-group-2-option-1',
            'fudis-select-5-group-2-option-2',
            'fudis-select-5-group-2-option-3',
          ],
          'fudis-select-5-custom-child-id': [
            'fudis-select-5-custom-child-id-option-1',
            'fudis-select-5-custom-child-id-option-2',
            'fudis-select-5-custom-child-id-option-3',
          ],
          'fudis-select-5-group-4': [
            'fudis-select-5-group-4-option-1',
            'fudis-select-5-group-4-option-2',
            'fudis-select-5-group-4-option-3',
          ],
          'fudis-select-5-group-5': [
            'fudis-select-5-group-5-option-1',
            'fudis-select-5-group-5-option-2',
            'fudis-select-5-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-select-5-option-1',
          'fudis-select-5-option-2',
          'fudis-select-5-option-3',
        ],
      },
    },
    multiselect: {
      'fudis-multiselect-1': {
        id: 'fudis-multiselect-1',
        groups: {
          'fudis-multiselect-1-group-1': [
            'fudis-multiselect-1-group-1-option-1',
            'fudis-multiselect-1-group-1-option-2',
            'fudis-multiselect-1-group-1-option-3',
          ],
          'fudis-multiselect-1-group-2': [
            'fudis-multiselect-1-group-2-option-1',
            'fudis-multiselect-1-group-2-option-2',
            'fudis-multiselect-1-group-2-option-3',
          ],
          'fudis-multiselect-1-custom-child-id': [
            'fudis-multiselect-1-custom-child-id-option-1',
            'fudis-multiselect-1-custom-child-id-option-2',
            'fudis-multiselect-1-custom-child-id-option-3',
          ],
          'fudis-multiselect-1-group-4': [
            'fudis-multiselect-1-group-4-option-1',
            'fudis-multiselect-1-group-4-option-2',
            'fudis-multiselect-1-group-4-option-3',
          ],
          'fudis-multiselect-1-group-5': [
            'fudis-multiselect-1-group-5-option-1',
            'fudis-multiselect-1-group-5-option-2',
            'fudis-multiselect-1-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-multiselect-1-option-1',
          'fudis-multiselect-1-option-2',
          'fudis-multiselect-1-option-3',
        ],
      },
      'fudis-multiselect-2': {
        id: 'fudis-multiselect-2',
        groups: {
          'fudis-multiselect-2-group-1': [
            'fudis-multiselect-2-group-1-option-1',
            'fudis-multiselect-2-group-1-option-2',
            'fudis-multiselect-2-group-1-option-3',
          ],
          'fudis-multiselect-2-group-2': [
            'fudis-multiselect-2-group-2-option-1',
            'fudis-multiselect-2-group-2-option-2',
            'fudis-multiselect-2-group-2-option-3',
          ],
          'fudis-multiselect-2-custom-child-id': [
            'fudis-multiselect-2-custom-child-id-option-1',
            'fudis-multiselect-2-custom-child-id-option-2',
            'fudis-multiselect-2-custom-child-id-option-3',
          ],
          'fudis-multiselect-2-group-4': [
            'fudis-multiselect-2-group-4-option-1',
            'fudis-multiselect-2-group-4-option-2',
            'fudis-multiselect-2-group-4-option-3',
          ],
          'fudis-multiselect-2-group-5': [
            'fudis-multiselect-2-group-5-option-1',
            'fudis-multiselect-2-group-5-option-2',
            'fudis-multiselect-2-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-multiselect-2-option-1',
          'fudis-multiselect-2-option-2',
          'fudis-multiselect-2-option-3',
        ],
      },
      'custom-id-for-multiselect': {
        id: 'custom-id-for-multiselect',
        groups: {
          'custom-id-for-multiselect-group-1': [
            'custom-id-for-multiselect-group-1-option-1',
            'custom-id-for-multiselect-group-1-option-2',
            'custom-id-for-multiselect-group-1-option-3',
          ],
          'custom-id-for-multiselect-group-2': [
            'custom-id-for-multiselect-group-2-option-1',
            'custom-id-for-multiselect-group-2-option-2',
            'custom-id-for-multiselect-group-2-option-3',
          ],
          'fudis-multiselect-3-custom-child-id': [
            'fudis-multiselect-3-custom-child-id-option-1',
            'fudis-multiselect-3-custom-child-id-option-2',
            'fudis-multiselect-3-custom-child-id-option-3',
          ],
          'custom-id-for-multiselect-group-4': [
            'custom-id-for-multiselect-group-4-option-1',
            'custom-id-for-multiselect-group-4-option-2',
            'custom-id-for-multiselect-group-4-option-3',
          ],
          'custom-id-for-multiselect-group-5': [
            'custom-id-for-multiselect-group-5-option-1',
            'custom-id-for-multiselect-group-5-option-2',
            'custom-id-for-multiselect-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'custom-id-for-multiselect-option-1',
          'custom-id-for-multiselect-option-2',
          'custom-id-for-multiselect-option-3',
        ],
      },
      'fudis-multiselect-4': {
        id: 'fudis-multiselect-4',
        groups: {
          'fudis-multiselect-4-group-1': [
            'fudis-multiselect-4-group-1-option-1',
            'fudis-multiselect-4-group-1-option-2',
            'fudis-multiselect-4-group-1-option-3',
          ],
          'fudis-multiselect-4-group-2': [
            'fudis-multiselect-4-group-2-option-1',
            'fudis-multiselect-4-group-2-option-2',
            'fudis-multiselect-4-group-2-option-3',
          ],
          'fudis-multiselect-4-custom-child-id': [
            'fudis-multiselect-4-custom-child-id-option-1',
            'fudis-multiselect-4-custom-child-id-option-2',
            'fudis-multiselect-4-custom-child-id-option-3',
          ],
          'fudis-multiselect-4-group-4': [
            'fudis-multiselect-4-group-4-option-1',
            'fudis-multiselect-4-group-4-option-2',
            'fudis-multiselect-4-group-4-option-3',
          ],
          'fudis-multiselect-4-group-5': [
            'fudis-multiselect-4-group-5-option-1',
            'fudis-multiselect-4-group-5-option-2',
            'fudis-multiselect-4-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-multiselect-4-option-1',
          'fudis-multiselect-4-option-2',
          'fudis-multiselect-4-option-3',
        ],
      },
      'fudis-multiselect-5': {
        id: 'fudis-multiselect-5',
        groups: {
          'fudis-multiselect-5-group-1': [
            'fudis-multiselect-5-group-1-option-1',
            'fudis-multiselect-5-group-1-option-2',
            'fudis-multiselect-5-group-1-option-3',
          ],
          'fudis-multiselect-5-group-2': [
            'fudis-multiselect-5-group-2-option-1',
            'fudis-multiselect-5-group-2-option-2',
            'fudis-multiselect-5-group-2-option-3',
          ],
          'fudis-multiselect-5-custom-child-id': [
            'fudis-multiselect-5-custom-child-id-option-1',
            'fudis-multiselect-5-custom-child-id-option-2',
            'fudis-multiselect-5-custom-child-id-option-3',
          ],
          'fudis-multiselect-5-group-4': [
            'fudis-multiselect-5-group-4-option-1',
            'fudis-multiselect-5-group-4-option-2',
            'fudis-multiselect-5-group-4-option-3',
          ],
          'fudis-multiselect-5-group-5': [
            'fudis-multiselect-5-group-5-option-1',
            'fudis-multiselect-5-group-5-option-2',
            'fudis-multiselect-5-group-5-option-3',
          ],
        },
        nonGroupedOptions: [
          'fudis-multiselect-5-option-1',
          'fudis-multiselect-5-option-2',
          'fudis-multiselect-5-option-3',
        ],
      },
    },
  },
};
