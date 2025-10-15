import { Component, Input } from '@angular/core';
import { ButtonBaseDirective } from '../../directives/button-base/button-base.directive';
import { CommonModule } from '@angular/common';
import { NgxFudisModule } from 'ngx-fudis';
import { FudisIcon } from '../../types/icons';
import { FudisComponentChanges } from '../../types/miscellaneous';

@Component({
  selector: 'fudis-icon-button',
  imports: [CommonModule, NgxFudisModule],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent extends ButtonBaseDirective {
  /**
   * Aria-label for describing context
   */
  @Input({required: true}) ariaLabel: string;

  /**
   * Icon for button
   */
  @Input({required: true}) override icon: FudisIcon | undefined = undefined;

  /**
   * Button size options
   */
  @Input() size: 'medium' | 'small' | 'icon-only' = 'medium';

  override ngOnChanges(changes: FudisComponentChanges<IconButtonComponent>): void {
      const size = changes.size?.currentValue !== changes.size?.previousValue;
  
      if ( size ) {
        this._size = this.size;
      }

      super.ngOnChanges(changes);
  }
}
