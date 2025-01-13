//import { TestBed } from '@angular/core/testing';

// TODO: add test for disabled states

import { joinInputValues, setVisibleOptionsList } from './selectUtilities';

const sortedOptionsOne = [
  {
    value: 'value-1-dog',
    label: 'Dog',
    sound: 'Wuf!',
  },
  {
    value: 'value-2-capybara',
    label: 'Capybara',
    sound: 'Squek!',
  },
  {
    value: 'value-3-platypys',
    label: 'Platypus',
    sound: 'Plat plat!',
  },
  {
    value: 'value-5-armadillo',
    label: 'Screaming hairy armadillo',
    sound: "Rollin' rollin' rollin'!",
  },
  {
    value: 'value-6-gecko',
    label: 'Southern Titiwangsa Bent-Toed Gecko',
    sound: 'Gec-koooo!',
  },
  {
    value: '4c08f813-45b6-4a32-99de-eee6a80a555a',
    label: 'Salmon pink bird eater tarantula',
    subLabel: 'Lasiodora parahybana',
  },
  {
    value: '80a3f1d5-8faa-4010-864b-22635742523b',
    label: 'Black-crowned crane',
    subLabel: 'Balearica pavonina',
  },
  {
    value: 'b245eab0-4fc2-4326-a410-5c73137e77ce',
    label: 'Skunk, western spotted',
    subLabel: 'Spilogale gracilis',
  },
  {
    value: '11e6ac61-5983-41d7-8a2f-884211068f21',
    label: 'White-cheeked pintail',
    subLabel: 'Anas bahamensis',
  },
  {
    value: 'ab53b639-c94d-4b6b-8b62-bdbfeae24138',
    label: 'Ringtail cat',
    subLabel: 'Bassariscus astutus',
  },
  {
    value: 'e0051452-f1e3-4aa0-b206-eee538d2fb41',
    label: 'Kangaroo, western grey',
    subLabel: 'Macropus fuliginosus',
  },
  {
    value: '925e74ab-9e00-49ff-a301-300bade8ff21',
    label: 'Pheasant, ring-necked',
    subLabel: 'Phasianus colchicus',
  },
  {
    value: '14679bf6-7e43-4897-8c83-82d267ebdb33',
    label: 'Weaver, lesser masked',
    subLabel: 'Ploceus intermedius',
  },
];

const sortedOptionsTwo = [
  {
    value: 'value-2-capybara',
    label: 'Capybara',
    sound: 'Squek!',
  },
  {
    value: 'value-5-armadillo',
    label: 'Screaming hairy armadillo',
    sound: "Rollin' rollin' rollin'!",
  },
  {
    value: '0cf7dff9-10e4-400b-b8e0-828b2e0baf30',
    label: 'Cat, european wild',
    subLabel: 'Felis silvestris lybica',
  },
  {
    value: 'c0cba653-c8eb-410d-bf65-32d2353e1fca',
    label: 'Falcon, prairie',
    subLabel: 'Falco mexicanus',
  },
  {
    value: '129ddb5c-0eb8-40f2-9b0b-79fe66646c8b',
    label: 'Porcupine, crested',
    subLabel: 'Hystrix cristata',
  },
  {
    value: '2b9f2bc3-2603-4842-932f-c935f765cf74',
    label: 'Dark-winged trumpeter',
    subLabel: 'Psophia viridis',
  },
  {
    value: '11e6ac61-5983-41d7-8a2f-884211068f21',
    label: 'White-cheeked pintail',
    subLabel: 'Anas bahamensis',
  },
  {
    value: 'ab53b639-c94d-4b6b-8b62-bdbfeae24138',
    label: 'Ringtail cat',
    subLabel: 'Bassariscus astutus',
  },
  {
    value: '60747b93-2f8e-40f6-8063-cc79d01d5205',
    label: 'Gecko, tokay',
    subLabel: 'Gekko gecko',
  },
  {
    value: '14679bf6-7e43-4897-8c83-82d267ebdb33',
    label: 'Weaver, lesser masked',
    subLabel: 'Ploceus intermedius',
  },
  {
    value: '8680e372-1f3c-48ff-a7c1-e466e249bb9a',
    label: 'Galapagos hawk',
    subLabel: 'Buteo galapagoensis',
  },
  {
    value: '4bbddf78-c926-476e-af39-8dcff511bac0',
    label: 'Common rhea',
    subLabel: 'Rhea americana',
  },
  {
    value: '3a2860af-88d1-4d9e-ba14-f290fce32a26',
    label: 'Alligator, mississippi',
    subLabel: 'Alligator mississippiensis',
  },
  {
    value: 'bbf08d11-88cf-4d3e-b411-5409db3cb57c',
    label: 'Goldeneye, barrows',
    subLabel: 'Bucephala clangula',
  },
  {
    value: 'f00849ca-38fd-4255-b833-ce23e8f17058',
    label: 'Macaw, scarlet',
    subLabel: 'Ara macao',
  },
];

const joinedOptionsOne =
  "Dog, Capybara, Platypus, Screaming hairy armadillo, Southern Titiwangsa Bent-Toed Gecko, Salmon pink bird eater tarantula, Black-crowned crane, 'Skunk, western spotted', White-cheeked pintail, Ringtail cat, 'Kangaroo, western grey', 'Pheasant, ring-necked', 'Weaver, lesser masked'";

const joinedOptionsTwo =
  "Capybara, Screaming hairy armadillo, 'Cat, european wild', 'Falcon, prairie', 'Porcupine, crested', Dark-winged trumpeter, White-cheeked pintail, Ringtail cat, 'Gecko, tokay', 'Weaver, lesser masked', Galapagos hawk, Common rhea, 'Alligator, mississippi', 'Goldeneye, barrows', 'Macaw, scarlet'";

const visibleOptionsOneBefore = [
  'fudis-multiselect-4-option-4',
  'fudis-multiselect-4-group-1-option-3',
  'fudis-multiselect-4-group-6-option-1',
  'fudis-multiselect-4-group-7-option-2',
];

const visibleOptionsOneAfterAdd = [
  'fudis-multiselect-4-option-4',
  'fudis-multiselect-4-group-1-option-3',
  'fudis-multiselect-4-group-6-option-1',
  'fudis-multiselect-4-group-7-option-2',
  'new-added-value-123',
  'second-new-value-abc',
];

const visibleOptionsOneAfterRemove = [
  'fudis-multiselect-4-group-1-option-3',
  'fudis-multiselect-4-group-7-option-2',
];

const visibleOptionsTwoBefore = [
  'fudis-multiselect-4-option-4',
  'fudis-multiselect-4-group-1-option-3',
  'fudis-multiselect-4-group-6-option-1',
  'fudis-multiselect-4-group-7-option-2',
  'fudis-multiselect-4-option-2',
  'fudis-multiselect-4-group-1-option-1',
  'fudis-multiselect-4-group-2-option-2',
  'fudis-multiselect-4-group-3-option-2',
  'fudis-multiselect-4-group-3-option-4',
  'fudis-multiselect-4-group-4-option-2',
  'fudis-multiselect-4-group-5-option-4',
  'fudis-multiselect-4-group-8-option-3',
  'fudis-multiselect-4-group-8-option-5',
  'fudis-multiselect-4-group-9-option-1',
  'fudis-multiselect-4-group-9-option-3',
  'fudis-multiselect-4-group-9-option-4',
  'fudis-multiselect-4-group-10-option-4',
  'fudis-multiselect-4-group-10-option-5',
];

const visibleOptionsTwoAfterAdd = [
  'fudis-multiselect-4-option-4',
  'fudis-multiselect-4-group-1-option-3',
  'fudis-multiselect-4-group-6-option-1',
  'fudis-multiselect-4-group-7-option-2',
  'fudis-multiselect-4-option-2',
  'fudis-multiselect-4-group-1-option-1',
  'fudis-multiselect-4-group-2-option-2',
  'fudis-multiselect-4-group-3-option-2',
  'fudis-multiselect-4-group-3-option-4',
  'fudis-multiselect-4-group-4-option-2',
  'fudis-multiselect-4-group-5-option-4',
  'fudis-multiselect-4-group-8-option-3',
  'fudis-multiselect-4-group-8-option-5',
  'fudis-multiselect-4-group-9-option-1',
  'fudis-multiselect-4-group-9-option-3',
  'fudis-multiselect-4-group-9-option-4',
  'fudis-multiselect-4-group-10-option-4',
  'fudis-multiselect-4-group-10-option-5',
  'more-new-values',
  'and-one-more-new-values-123',
];

const visibleOptionsTwoAfterRemove = [
  'fudis-multiselect-4-option-4',
  'fudis-multiselect-4-group-1-option-3',
  'fudis-multiselect-4-group-6-option-1',
  'fudis-multiselect-4-group-7-option-2',
  'fudis-multiselect-4-option-2',
  'fudis-multiselect-4-group-2-option-2',
  'fudis-multiselect-4-group-3-option-2',
  'fudis-multiselect-4-group-3-option-4',
  'fudis-multiselect-4-group-4-option-2',
  'fudis-multiselect-4-group-5-option-4',
  'fudis-multiselect-4-group-8-option-5',
  'fudis-multiselect-4-group-9-option-1',
  'fudis-multiselect-4-group-9-option-3',
  'fudis-multiselect-4-group-9-option-4',
  'fudis-multiselect-4-group-10-option-4',
  'fudis-multiselect-4-group-10-option-5',
];

describe('Select utilities', () => {
  describe('joinInputValues', () => {
    it('should join options to a single string', () => {
      const resultOne = joinInputValues(sortedOptionsOne);

      expect(resultOne).toEqual(joinedOptionsOne);

      const resultTwo = joinInputValues(sortedOptionsTwo);

      expect(resultTwo).toEqual(joinedOptionsTwo);
    });
  });

  describe('setVisibleOptionsList', () => {
    it('should add options correctly', () => {
      const tempOne = setVisibleOptionsList(visibleOptionsOneBefore, 'new-added-value-123', true);

      const addResultsOne = setVisibleOptionsList(tempOne, 'second-new-value-abc', true);

      expect(addResultsOne).toEqual(visibleOptionsOneAfterAdd);

      const tempTwo = setVisibleOptionsList(visibleOptionsTwoBefore, 'more-new-values', true);

      const addResultsTwo = setVisibleOptionsList(tempTwo, 'and-one-more-new-values-123', true);

      expect(addResultsTwo).toEqual(visibleOptionsTwoAfterAdd);
    });

    it('should remove options correctly', () => {
      const tempOne = setVisibleOptionsList(
        visibleOptionsOneBefore,
        'fudis-multiselect-4-option-4',
        false,
      );

      const removeResultsOne = setVisibleOptionsList(
        tempOne,
        'fudis-multiselect-4-group-6-option-1',
        false,
      );

      expect(removeResultsOne).toEqual(visibleOptionsOneAfterRemove);

      const tempTwo = setVisibleOptionsList(
        visibleOptionsTwoBefore,
        'fudis-multiselect-4-group-1-option-1',
        false,
      );

      const removeResultsTwo = setVisibleOptionsList(
        tempTwo,
        'fudis-multiselect-4-group-8-option-3',
        false,
      );
      expect(removeResultsTwo).toEqual(visibleOptionsTwoAfterRemove);
    });

    it('should return original array, if removable id does not exist', () => {
      const results = setVisibleOptionsList(
        visibleOptionsTwoBefore,
        'fudis-multiselect-4-group-8-option-6',
        false,
      );

      expect(results).toEqual(visibleOptionsTwoBefore);
    });
  });
});
