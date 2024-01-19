import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Host,
  HostListener,
  Input,
  OnInit,
  Optional,
  ViewEncapsulation,
} from '@angular/core';

import { FudisIdService } from '../../services/id/id.service';
import { DropdownBaseDirective } from '../../directives/form/dropdown-base/dropdown-base.directive';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'fudis-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent
  extends DropdownBaseDirective
  implements OnInit, AfterContentInit
{
  constructor(
    private _idService: FudisIdService,
    @Host() @Optional() private _button: ButtonComponent,
  ) {
    super();
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

  ngOnInit(): void {
    if (this.parentId) {
      this.id = this.parentId + '-dropdown';
      this._idService.addNewParentId('dropdown-menu', this.id);
    } else {
      this.id = this._idService.getNewParentId('dropdown-menu');
      if (this._button) {
        this._button.dropdownMenuId = this.id;
      }
    }
  }

  ngAfterContentInit(): void {
    this.getMaxWidth();
  }
}
