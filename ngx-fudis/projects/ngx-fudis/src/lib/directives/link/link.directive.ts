import { OnInit, AfterViewInit, Directive, ElementRef, OnChanges, Input } from '@angular/core';
import { LinkApiDirective } from './link-api/link-api.directive';
import { FudisComponentChanges } from '../../types/miscellaneous';
import { FudisFocusService } from '../../services/focus/focus.service';
import { FudisIdService } from '../../services/id/id.service';

@Directive({
  selector: '[fudisLink]',
})
export class LinkDirective extends LinkApiDirective implements OnInit, OnChanges, AfterViewInit {
  constructor(
    protected _bindedElement: ElementRef<HTMLAnchorElement>,
    private _focusService: FudisFocusService,
    private _idService: FudisIdService,
  ) {
    super();
  }

  /**
   * Additional CSS classes for the Link anchor element
   */
  @Input() classes: string[] = [];

  ngAfterViewInit(): void {
    if (this.initialFocus) {
      this._focusToAnchorElement();
    }
  }

  ngOnInit(): void {
    this._setCssClasses();

    if (this.id) {
      this._idService.addNewId('link', this.id);
    } else {
      this.id = this._idService.getNewId('link');
    }

    this._bindedElement.nativeElement.setAttribute('id', this.id);
  }

  ngOnChanges(changes: FudisComponentChanges<LinkDirective>): void {
    if (changes.color || changes.size || changes.classes) {
      this._setCssClasses();
    }
  }

  /**
   * Set CSS classes
   */
  private _setCssClasses(): void {
    const classList = [
      'fudis-link',
      `fudis-link__size__${this.size}`,
      `fudis-link__color__${this.color}`,
    ];

    const arrayToString = this.classes
      .concat(classList)
      .filter((item) => {
        return !!item;
      })
      .sort()
      .join(' ');

    (this._bindedElement.nativeElement as HTMLElement).classList.value = arrayToString;
  }

  private _focusToAnchorElement(): void {
    if (this._bindedElement?.nativeElement && !this._focusService.isIgnored(this.id)) {
      (this._bindedElement.nativeElement as HTMLAnchorElement).focus();
    }
  }
}
