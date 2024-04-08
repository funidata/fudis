import { Injectable } from '@angular/core';
import {
  FudisIdComponentData,
  FudisIdComponent,
  FudisIdFamily,
  FudisIdFamilyData,
  FudisIdParent,
} from '../../types/id';

@Injectable({
  providedIn: 'root',
})
export class FudisIdService {
  /**
   * TODO: refactor to store exact id: both generated and customs
   */
  private _componentList: FudisIdComponentData = {
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

  /**
   * To store family id data
   */
  private _familyData: FudisIdFamilyData = {
    breadcrumbs: [],
    'checkbox-group': [],
    'description-list': [],
    'dropdown-menu': [],
    'radio-button-group': [],
    select: [],
    multiselect: [],
  };

  /**
   * Generate and get a new id for a single component
   */
  public getNewId(componentType: FudisIdComponent): string {
    const orderNumber = this._componentList[componentType].length + 1;

    const newId = `fudis-${componentType}-${orderNumber}`;

    this._componentList[componentType].push(newId);

    return newId;
  }

  /**
   * Generate and get a new parent id in family
   */
  public getNewParentId(componentType: FudisIdParent): string {
    const orderNumber = this._familyData[componentType].length + 1;

    const newId = `fudis-${componentType}-${orderNumber}`;

    const newItem: FudisIdFamily = {
      parent: newId,
      children: [],
    };

    this._familyData[componentType].push(newItem);

    return newId;
  }

  /**
   * Generate and get a new child id in family
   */
  public getNewChildId(
    parentType: FudisIdParent,
    parentId: string,
    groupType?: 'group' | 'item' | null,
  ): string {
    let newId = '';
    this._familyData[parentType].forEach((item, index) => {
      if (item.parent === parentId) {
        if (groupType) {
          if (!item.childrenGroups) {
            newId = `${parentId}-${groupType}-1`;

            this._familyData[parentType][index] = {
              ...item,
              childrenGroups: [{ parent: newId, children: [] }],
            };
          } else {
            const orderNumber = item.childrenGroups!.length;

            newId = `${parentId}-${groupType}-${orderNumber + 1}`;

            this._familyData[parentType][index].childrenGroups?.push({
              parent: `${parentId}-${groupType}-${orderNumber + 1}`,
              children: [],
            });
          }
        } else {
          const orderNumber = item.children.length + 1;

          newId = `${parentId}-item-${orderNumber}`;
          item.children.push(newId);
        }
      }
    });
    return newId;
  }

  /**
   * Generate grandchild id. E.g. for select-options under select-group --> fudis-select-4-group-2-option-1
   */
  public getNewGrandChildId(
    grandParentType: FudisIdParent,
    grandParentId: string,
    parentId: string,
    grandchildName: 'option' | 'term' | 'details',
  ): string {
    let newId = '';

    this._familyData[grandParentType].findIndex((grandParent, index) => {
      if (grandParent.parent === grandParentId) {
        this._familyData[grandParentType][index].childrenGroups?.forEach((parent) => {
          if (parent.parent === parentId) {
            const orderNumber = parent.children.length + 1;

            if (grandchildName === 'term') {
              newId = `${parentId}-${grandchildName}`;
            } else if (grandchildName === 'details') {
              newId = `${parentId}-${grandchildName}-${orderNumber - 1}`;
            } else {
              newId = `${parentId}-${grandchildName}-${orderNumber}`;
            }

            parent.children.push(newId);
          }
        });
      }
    });

    return newId;
  }

  /**
   * To add custom id for a parent in a family. E. g. used with DropdownMenu where parent is AutocompleteMultiselect
   */
  public addNewParentId(componentType: FudisIdParent, id: string) {
    const newItem: FudisIdFamily = {
      parent: id,
      children: [],
    };

    this._familyData[componentType].push(newItem);
  }

  /**
   * To add custom id for a child in family
   */
  public addNewChildId(parentType: FudisIdParent, parentId: string, newId: string) {
    this._familyData[parentType].forEach((item) => {
      if (item.parent === parentId) {
        item.children.push(newId);
      }
    });
  }

  /**
   * To add custom id for a single component
   */
  public addNewId(componentType: FudisIdComponent, customId: string): void {
    this._componentList[componentType].push(customId);
  }

  /**
   * Get list of component amounts
   */
  public getComponentIdList(): FudisIdComponentData {
    return this._componentList;
  }

  /**
   * Get family data
   */
  public getFamilyIdData(): FudisIdFamilyData {
    return this._familyData;
  }
}
