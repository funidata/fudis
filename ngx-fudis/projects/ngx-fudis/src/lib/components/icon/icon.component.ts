import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';

import { FudisIcon, FudisIconColor, FudisIconRotate } from '../../types/icons';
import { FudisComponentChanges } from '../../types/miscellaneous';

@Component({
  selector: 'fudis-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  /**
   * Binding host CSS class to component wrapper
   */
  @HostBinding('class') private _classes = 'fudis-icon-host';

  /**
   * Displayed SVG icon
   */
  @Input({ required: true }) icon: FudisIcon;

  /**
   * Icon color
   */
  @Input() color: FudisIconColor = 'gray-dark';

  /**
   * Icon rotation
   */
  @Input() rotate: FudisIconRotate = 'none';

  /**
   * CSS class list
   */
  protected _classList: string[] = [];

  /**
   * Determines icon size by its name. If icon name has suffix "-small", iconSize is set to sm, otherwise lg.
   */
  private _iconSize: string;

  ngOnChanges(changes: FudisComponentChanges<IconComponent>): void {
    if (changes.icon || changes.color || changes.rotate) {
      this._classList = this._getClasses();
    }
  }

  /**
   * Get CSS classes with correct color, rotate and size suffixes
   */
  private _getClasses(): string[] {
    this._iconSize = this.icon.includes('-small') ? 'sm' : 'lg';

    const cssClasses = [
      'fudis-icon',
      `fudis-icon__color__${this.color}`,
      `fudis-icon__rotate__${this.rotate}`,
      `fudis-icon__${this._iconSize}`,
    ];

    return cssClasses;
  }
}
