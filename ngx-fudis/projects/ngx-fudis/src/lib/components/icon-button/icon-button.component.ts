import { Component, Input } from '@angular/core';
import { ButtonBaseDirective } from '../../directives/button-base/button-base.directive';
import { CommonModule } from '@angular/common';
import { NgxFudisModule } from 'ngx-fudis';

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
   * Button size options
   */
  @Input() size: 'medium' | 'small' | 'icon-only' = 'medium';

  override ngOnInit(): void {
      this._size = this.size;
  }
}
