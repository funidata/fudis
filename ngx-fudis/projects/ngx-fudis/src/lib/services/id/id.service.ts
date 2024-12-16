import { Injectable } from '@angular/core';
import {
  FudisIdComponent,
  FudisIdData,
  FudisIdDlFamily,
  FudisIdGrandParent,
  FudisIdParent,
  FudisIdSelectFamily,
  FudisIdDropdownMenuFamily,
} from '../../types/id';

@Injectable({ providedIn: 'root' })
export class FudisIdService {
  private _idData: FudisIdData = {
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
   * Get an id and add it to collection for a single component. E.g. 'fudis-button-1'
   */
  public getNewId(componentType: FudisIdComponent): string {
    const orderNumber = this._idData.components[componentType].length + 1;

    const newId = `fudis-${componentType}-${orderNumber}`;

    this.addNewId(componentType, newId);

    return newId;
  }

  /**
   * Add an id to collection of single components
   */
  public addNewId(componentType: FudisIdComponent, newId: string): void {
    this._idData.components[componentType].push(newId);
  }

  /* ------------------
   * Ids' for two leveled components. E. g. Breadcrumbs and Breadcrumbs Item
   * ------------------
   */

  /**
   * Get an id and add it to collection for a parent component. E.g. 'fudis-breadcrumbs-1'
   */
  public getNewParentId(componentType: FudisIdParent): string {
    const orderNumber = Object.keys(this._idData.parents[componentType]).length + 1;

    const newId = `fudis-${componentType}-${orderNumber}`;

    this.addNewParentId(componentType, newId);

    return newId;
  }

  /**
   * Add id to collection of parents
   */
  public addNewParentId(componentType: FudisIdParent, newId: string): void {
    this._idData.parents[componentType][newId] = [];
  }

  /**
   * Get an id and add it to collection for a child component. E.g. 'fudis-breadcrumbs-1-item-1'
   */
  public getNewChildId(parentType: FudisIdParent, parentId: string): string {
    let newId = '';

    const orderNumber = Object.keys(this._idData.parents[parentType]?.[parentId]).length + 1;

    if (orderNumber) {
      newId = `${parentId}-item-${orderNumber}`;

      this._idData.parents[parentType][parentId].push(newId);
    }

    return newId;
  }

  /**
   * Add id to collection of parents children
   */

  public addNewChildId(parentType: FudisIdParent, parentId: string, customId: string): void {
    this._idData.parents[parentType]?.[parentId].push(customId);
  }

  /* ------------------
   * Ids' for three leveled components. E. g. Select, SelectGroup and Select Option and DL, DL Item, DL Term & Details
   * ------------------
   */

  /**
   * Get an id and add it to collection for a grand parent type components
   */
  public getNewGrandParentId(componentType: FudisIdGrandParent): string {
    let newId = '';

    const orderNumber = Object.keys(this._idData.grandParents[componentType]).length + 1;

    newId = `fudis-${componentType}-${orderNumber}`;

    this.addNewGrandParentId(componentType, newId);

    return newId;
  }

  /**
   * Add grand parent id to data collection
   */
  public addNewGrandParentId(
    componentType: 'select' | 'multiselect' | 'description-list' | 'dropdown-menu',
    newId: string,
  ): void {
    if (componentType === 'description-list') {
      const newGrandParent: FudisIdDlFamily = {
        id: newId,
        items: {},
      };
      this._idData.grandParents[componentType][newId] = newGrandParent;
    } else if (componentType === 'dropdown-menu') {
      const newGrandParent: FudisIdDropdownMenuFamily = {
        id: newId,
        groups: {},
        nonGroupedOptions: [],
      };
      this._idData.grandParents[componentType][newId] = newGrandParent;
    } else {
      const newGrandParent: FudisIdSelectFamily = {
        id: newId,
        groups: {},
        nonGroupedOptions: [],
      };
      this._idData.grandParents[componentType][newId] = newGrandParent;
    }
  }

  /**
   * Get an id and add it to collection for first child of grandparent. E.g. Select Group or Description List Item
   */
  public getNewGroupId(
    componentType: 'select' | 'multiselect' | 'description-list' | 'dropdown-menu',
    parentId: string,
  ): string {
    let newId = '';

    if (this._idData.grandParents[componentType]?.[parentId]) {
      if (componentType === 'description-list') {
        const orderNumber =
          Object.keys(this._idData.grandParents[componentType][parentId].items).length + 1;

        newId = `${parentId}-item-${orderNumber}`;
        this._idData.grandParents[componentType][parentId].items[newId] = {
          term: [],
          details: [],
        };
      } else {
        const orderNumber =
          Object.keys(this._idData.grandParents[componentType][parentId].groups).length + 1;

        newId = `${parentId}-group-${orderNumber}`;
        this._idData.grandParents[componentType][parentId].groups[newId] = [];
      }
    }

    return newId;
  }

  /**
   * Add group id of grand parent to data collection
   */
  public addNewGroupId(
    componentType: 'select' | 'multiselect' | 'description-list' | 'dropdown-menu',
    parentId: string,
    newId: string,
  ): void {
    if (this._idData.grandParents[componentType]?.[parentId]) {
      if (componentType === 'description-list') {
        this._idData.grandParents[componentType][parentId].items[newId] = {
          term: [],
          details: [],
        };
      } else {
        this._idData.grandParents[componentType][parentId].groups[newId] = [];
      }
    }
  }

  /**
   * Get an id and add it to collection for Select Options --> fudis-select-4-group-2-option-1
   */
  public getNewSelectOptionId(
    selectType: 'select' | 'multiselect' | 'dropdown-menu',
    selectParentId: string,
    groupParentId?: string,
    dataValue?: string,
  ): string {
    let newId = '';

    if (groupParentId) {
      if (dataValue) {
        newId = `${groupParentId}-option-${dataValue}`;
      } else {
        const orderNumber =
          this._idData.grandParents[selectType][selectParentId].groups[groupParentId].length + 1;

        newId = `${groupParentId}-option-${orderNumber}`;
      }

      this._idData.grandParents[selectType][selectParentId].groups[groupParentId].push(newId);
    } else {
      if (dataValue) {
        newId = `${selectParentId}-option-${dataValue}`;
      } else {
        const orderNumber =
          this._idData.grandParents[selectType][selectParentId].nonGroupedOptions.length + 1;
        newId = `${selectParentId}-option-${orderNumber}`;
      }

      this._idData.grandParents[selectType][selectParentId].nonGroupedOptions.push(newId);
    }
    return newId;
  }

  /**
   * Get an id and add it to collection for Descrition List Term & Details --> fudis-description-list-1-item-1-term & fudis-description-list-1-item-1-details-1
   */
  public getNewDlGrandChilId(
    childType: 'term' | 'details',
    parentDlId: string,
    parentItemId: string,
  ): string {
    let newId = '';

    if (this._idData.grandParents['description-list']?.[parentDlId]?.items[parentItemId]) {
      const orderNumber =
        this._idData.grandParents['description-list'][parentDlId].items[parentItemId][childType]
          .length + 1;

      newId = `${parentItemId}-${childType}-${orderNumber}`;

      this._idData.grandParents['description-list'][parentDlId].items[parentItemId][childType].push(
        newId,
      );
    }

    return newId;
  }
}
