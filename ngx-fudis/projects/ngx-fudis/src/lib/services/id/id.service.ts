import { Injectable } from '@angular/core';
import {
  FudisIdComponent,
  FudisIdData,
  FudisIdDlFamily,
  FudisIdDlItem,
  FudisIdFamily,
  FudisIdParent,
  FudisIdSelectFamily,
} from '../../types/id';

@Injectable({
  providedIn: 'root',
})
export class FudisIdService {
  private _idData: FudisIdData = {
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
      section: [],
      'text-area': [],
      'text-input': [],
      'validator-error-message': [],
    },
    parents: {
      breadcrumbs: [],
      'checkbox-group': [],
      'dropdown-menu': [],
      'radio-button-group': [],
    },
    grandParents: {
      'description-list': [],
      select: [],
      multiselect: [],
    },
  };

  /**
   * Get collected ID data
   */
  public getIdData(): FudisIdData {
    return this._idData;
  }

  /* ------------------
   * Basic Id for single leveled components. E. g. Button
   * ------------------
   * /

  /**
   * Generate and get a new id for a single component. E.g. 'fudis-button-1'
   */
  public getNewId(componentType: FudisIdComponent): string {
    const orderNumber = this._idData.components[componentType].length + 1;

    const newId = `fudis-${componentType}-${orderNumber}`;

    this._idData.components[componentType].push(newId);

    return newId;
  }

  /**
   * To add custom id for a single component
   */
  public addCustomId(componentType: FudisIdComponent, customId: string): void {
    this._idData.components[componentType].push(customId);
  }

  /* ------------------
   * Ids' for two leveled components. E. g. Breadcrumbs and Breadcrumbs Item
   * ------------------
   */

  /**
   * Generate and get a new parent id in family. E.g. 'fudis-breadcrumbs-1'
   */
  public getNewParentId(componentType: FudisIdParent): string {
    const orderNumber = this._idData.parents[componentType].length + 1;

    const newId = `fudis-${componentType}-${orderNumber}`;

    this.addCustomParentId(componentType, newId);

    return newId;
  }

  /**
   * To add custom id for a parent which has child components
   */
  public addCustomParentId(componentType: FudisIdParent, id: string) {
    const newItem: FudisIdFamily = {
      id: id,
      children: [],
    };

    this._idData.parents[componentType].push(newItem);
  }

  /**
   * Generate and get a new child id in family. E.g. 'fudis-breadcrumbs-1-item-1'
   */
  public getNewChildId(parentType: FudisIdParent, parentId: string): string {
    let newId = '';

    for (const parent of this._idData.parents[parentType]) {
      if (parent.id === parentId) {
        const orderNumber = parent.children.length + 1;
        newId = `${parentId}-item-${orderNumber}`;
        parent.children.push(newId);
        break;
      }
    }

    return newId;
  }

  /**
   * To add custom id for a child with a parent
   */
  public addCustomChildId(parentType: FudisIdParent, parentId: string, newId: string) {
    for (const parent of this._idData.parents[parentType]) {
      if (parent.id === parentId) {
        parent.children.push(newId);
        break;
      }
    }
  }

  /* ------------------
   * Ids' for three leveled components. E. g. Select, SelectGroup and Select Option and DL, DL Item, DL Term & Details
   * ------------------
   */

  /**
   * Gets a new ID for grand parent type components
   */
  public getNewGrandParentId(componentType: 'select' | 'multiselect' | 'description-list'): string {
    let newId = '';

    const orderNumber = this._idData.grandParents[componentType].length + 1;

    newId = `fudis-${componentType}-${orderNumber}`;

    this.addCustomGrandParentId(componentType, newId);

    return newId;
  }

  /**
   * Add custom grand parent id
   */
  public addCustomGrandParentId(
    componentType: 'select' | 'multiselect' | 'description-list',
    newId: string,
  ): void {
    if (componentType === 'description-list') {
      const newGrandParent: FudisIdDlFamily = {
        id: newId,
        children: [],
      };
      this._idData.grandParents[componentType].push(newGrandParent);
    } else {
      const newGrandParent: FudisIdSelectFamily = {
        id: newId,
        groups: [],
        nonGroupedOptions: [],
      };
      this._idData.grandParents[componentType].push(newGrandParent);
    }
  }

  /* ------------------
   * Ids' for three leveled components. E. g. Select, SelectGroup and Select Option and DL, DL Item, DL Term & Details
   * ------------------
   */

  public getNewGroupId(
    parentId: string,
    componentType: 'select' | 'multiselect' | 'description-list',
  ): string {
    let newId = '';

    for (const parent of this._idData.grandParents[componentType]) {
      if (parent.id === parentId) {
        if (componentType === 'description-list') {
          const orderNumber = (parent as FudisIdDlFamily).children.length + 1;
          newId = `${parentId}-item-${orderNumber}`;
          const newDlItem: FudisIdDlItem = {
            id: newId,
            children: {
              term: null,
              details: [],
            },
          };
          (parent as FudisIdDlFamily).children.push(newDlItem);
        } else {
          const orderNumber = (parent as FudisIdSelectFamily).groups.length + 1;

          newId = `${parentId}-group-${orderNumber}`;

          const newGroup: FudisIdFamily = {
            id: newId,
            children: [],
          };

          (parent as FudisIdSelectFamily).groups.push(newGroup);
        }
        break;
      }
    }

    return newId;
  }

  /**
   * Generate id for select options --> fudis-select-4-group-2-option-1
   */
  public getNewSelectOptionid(
    selectType: 'select' | 'multiselect',
    selectParentId: string,
    groupParentId?: string,
  ): string {
    let newId = '';

    for (const parent of this._idData.grandParents[selectType]) {
      if (parent.id === selectParentId) {
        if (groupParentId) {
          for (const groupParent of parent.groups) {
            if (groupParent.id === groupParentId) {
              const orderNumber = groupParent.children.length + 1;

              newId = `${selectParentId}-${groupParentId}-option-${orderNumber}`;
              break;
            }
          }
        } else {
          const orderNumber = parent.nonGroupedOptions.length;
          newId = `${selectParentId}-option-${orderNumber}`;
        }
        break;
      }
    }
    return newId;
  }

  public getNewDlGrandChilId(
    childType: 'term' | 'details',
    parentDlId: string,
    parentItemId: string,
  ): string {
    let newId = '';
    for (const parentDl of this._idData.grandParents['description-list']) {
      if (parentDl.id === parentDlId) {
        for (const parentDlItem of parentDl.children) {
          if (parentDlItem.id === parentItemId) {
            if (childType === 'term') {
              if (parentDlItem.children.term) {
                throw new Error(
                  `Description List component with id: '${parentDlId}' has an item with id:'${parentDlItem}' and it has multiple term components! Description List Item component can have only one Term component!`,
                );
              }

              newId = `${parentItemId}-term`;

              parentDlItem.children.term = newId;
            } else {
              const orderNumber = parentDlItem.children.details.length + 1;

              newId = `${parentItemId}-details-${orderNumber}`;

              parentDlItem.children.details.push(newId);
            }
            break;
          }
        }
        break;
      }
    }

    return newId;
  }
}
