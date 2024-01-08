import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';

import { FudisIdService } from '../../services/id/id.service';
import { DropdownBaseDirective } from '../../directives/form/dropdown-base/dropdown-base.directive';

@Component({
  selector: 'fudis-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent extends DropdownBaseDirective implements AfterContentInit {
  constructor(private _idService: FudisIdService) {
    super();
    this.id = _idService.getNewParentId('dropdown-menu');
  }

  /**
   * Dropdown-menu is aligned to open left side of the button by default but can be aligned to open right side if necessary
   */
  @Input() align: 'left' | 'right' | 'center' = 'left';

  @HostListener('window:click', ['$event'])
  getMaxWidth(): void {
    const elementInViewWidth = this.dropdownElement?.nativeElement?.getBoundingClientRect()?.width;

    const elementInViewX = this.dropdownElement?.nativeElement?.getBoundingClientRect()?.x;

    if (elementInViewX && elementInViewWidth && elementInViewWidth !== 0 && this.align === 'left') {
      this._maxWidth = `${elementInViewWidth + elementInViewX}px`;
    } else if (window?.innerWidth && elementInViewX) {
      this._maxWidth = `${window.innerWidth - elementInViewX}px`;
    } else {
      this._maxWidth = 'initial';
    }
  }

  ngAfterContentInit(): void {
    this.getMaxWidth();
  }
}
