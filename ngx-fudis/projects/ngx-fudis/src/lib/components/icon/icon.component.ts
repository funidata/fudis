import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';

import { FudisIcon, FudisIconColor, FudisIconRotate } from '../../types/icons';

@Component({
  selector: 'fudis-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  /**
   * Binding fudis-icon-host class to component wrapper
   */
  @HostBinding('class') classes = 'fudis-icon-host';

  /**
   * Fudis icon
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
   * Icon CSS class list
   */
  protected _classList: string[] = [];

  /**
   * Determines icon size by its name. If icon name has suffix "-small", iconSize is set to sm, otherwise lg.
   */
  private _iconSize: string;

  ngOnChanges(): void {
    this._classList = this._getClasses();
  }

  private _getClasses(): string[] {
    this._iconSize = this.icon.includes('-small') ? 'sm' : 'lg';

    const cssClasses = [
      'fudis-icon',
      `fudis-icon-color__${this.color}`,
      `fudis-icon-rotate__${this.rotate}`,
      `fudis-icon__${this._iconSize}`,
    ];

    return cssClasses;
  }
}
