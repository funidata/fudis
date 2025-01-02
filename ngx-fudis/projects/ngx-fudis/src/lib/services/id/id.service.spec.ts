import { TestBed } from '@angular/core/testing';

import { FudisIdService } from './id.service';
import {
  fudisIdComponents,
  fudisIdParents,
  FudisIdParent,
  fudisIdGrandParents,
  FudisIdGrandParent,
} from '../../types/id';
import {
  testComponentDataAfter,
  testDataBefore,
  testGrandParentDataAfter,
  testParentDataAfter,
} from './testData';

describe('FudisIdServiceService', () => {
  let idService: FudisIdService;

  const createBasicComponentIds = () => {
    fudisIdComponents.forEach((componentType) => {
      for (let index = 1; index <= 3; index += 1) {
        if (index !== 2) {
          const newId = idService.getNewId(componentType);

          expect(newId).toEqual(`fudis-${componentType}-${index}`);
        } else {
          idService.addNewId(componentType, `custom-id-for-${componentType}`);
        }
      }
    });
  };

  const createChildComponents = (
    componentType: FudisIdParent,
    parentIndex: number,
    parentId: string,
  ) => {
    for (let index = 1; index <= 3; index += 1) {
      if (index !== 2) {
        const childId = idService.getNewChildId(componentType, parentId);

        expect(childId).toEqual(`${parentId}-item-${index}`);
      } else {
        const customChildId = `${componentType}-${parentIndex}-custom-child-id`;

        idService.addNewChildId(componentType, parentId, customChildId);
      }
    }
  };

  const createParentIds = () => {
    fudisIdParents.forEach((componentType) => {
      for (let index = 1; index <= 3; index += 1) {
        let newId = '';

        let expectedId = '';

        if (index !== 2) {
          newId = idService.getNewParentId(componentType);

          expectedId = `fudis-${componentType}-${index}`;

          createChildComponents(componentType, index, expectedId);
        } else {
          const customId = `${componentType}-some-custom-id`;

          idService.addNewParentId(componentType, customId);

          createChildComponents(componentType, index, customId);
        }

        expect(newId).toEqual(expectedId);
      }
    });
  };

  let dataValueIdCounter = 1;

  const createGrandChildrenIds = (
    parentType: FudisIdGrandParent,
    parentId: string,
    groupId: string,
  ) => {
    for (let index = 1; index <= 3; index += 1) {
      if (parentType === 'description-list') {
        if (index === 1) {
          const termId = idService.getNewDlGrandChilId('term', parentId, groupId);

          expect(termId).toEqual(`${groupId}-term-1`);
        }

        const detailsId = idService.getNewDlGrandChilId('details', parentId, groupId);

        expect(detailsId).toEqual(`${groupId}-details-${index}`);
      } else if (parentType === 'dropdown-menu') {
        const optionId = idService.getNewDropdownMenuId(parentId, groupId);

        expect(optionId).toEqual(`${groupId}-option-${index}`);
      } else {
        const optionId = idService.getNewSelectOptionId(
          parentType,
          parentId,
          `id-${dataValueIdCounter}`,
          groupId,
        );

        expect(optionId).toEqual(`${parentId}-option-id-${dataValueIdCounter}`);

        dataValueIdCounter = dataValueIdCounter + 1;
      }
    }
  };

  const createGroupIds = (
    parentType: FudisIdGrandParent,
    parentIndex: number,
    parentId: string,
  ) => {
    for (let index = 1; index <= 3; index += 1) {
      if (index !== 2) {
        const groupId = idService.getNewGroupId(parentType, parentId);

        if (parentType === 'description-list') {
          expect(groupId).toEqual(`${parentId}-item-${index}`);
        } else {
          expect(groupId).toEqual(`${parentId}-group-${index}`);
        }

        createGrandChildrenIds(parentType, parentId, groupId);
      } else {
        const customGroupId = `fudis-${parentType}-${parentIndex}-custom-child-id`;

        idService.addNewGroupId(parentType, parentId, customGroupId);
        createGrandChildrenIds(parentType, parentId, customGroupId);
      }
    }
  };

  let nonGroupedIdCounter = 1;

  const createGrandParentIds = () => {
    fudisIdGrandParents.forEach((grandParentType) => {
      for (let index = 1; index <= 3; index += 1) {
        let newId = '';

        if (index !== 2) {
          newId = idService.getNewGrandParentId(grandParentType);

          expect(newId).toEqual(`fudis-${grandParentType}-${index}`);

          createGroupIds(grandParentType, index, newId);
        } else {
          newId = `custom-id-for-${grandParentType}`;

          idService.addNewGrandParentId(grandParentType, newId);

          createGroupIds(grandParentType, index, newId);
        }

        if (grandParentType === 'dropdown-menu') {
          for (let index = 1; index <= 3; index += 1) {
            const nonGroupedOptionId = idService.getNewDropdownMenuId(newId);
            expect(nonGroupedOptionId).toEqual(`${newId}-option-${index}`);
          }
        } else if (grandParentType === 'select' || grandParentType === 'multiselect') {
          for (let index = 1; index <= 3; index += 1) {
            const nonGroupedOptionId = idService.getNewSelectOptionId(
              grandParentType,
              newId,
              `value-${nonGroupedIdCounter}`,
            );
            expect(nonGroupedOptionId).toEqual(`${newId}-option-value-${nonGroupedIdCounter}`);
            nonGroupedIdCounter = nonGroupedIdCounter + 1;
          }
        }
      }
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    idService = TestBed.inject(FudisIdService);
  });

  it('should be created', () => {
    expect(idService).toBeTruthy();
  });

  it('should return correct initial state', () => {
    expect(idService.getIdData()).toEqual(testDataBefore);
  });

  it('shoudl create basic component ids', () => {
    createBasicComponentIds();

    expect(idService.getIdData()).toEqual(testComponentDataAfter);
  });

  it('should create ids for parent and children', () => {
    createParentIds();

    expect(idService.getIdData()).toEqual(testParentDataAfter);
  });

  it('should create ids for grand parents, groups and grand children ', () => {
    createGrandParentIds();

    expect(idService.getIdData()).toEqual(testGrandParentDataAfter);
  });
});
