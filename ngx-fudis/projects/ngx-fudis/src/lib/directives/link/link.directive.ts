import { OnInit, AfterViewInit, Directive, ElementRef, OnChanges, effect } from '@angular/core';
import { LinkApiDirective } from './link-api/link-api.directive';
import { FudisComponentChanges } from '../../types/miscellaneous';
import { FudisFocusService } from '../../services/focus/focus.service';
import { FudisIdService } from '../../services/id/id.service';
import { BehaviorSubject } from 'rxjs';
import { FudisTranslationService } from '../../services/translation/translation.service';

@Directive({
  selector: '[fudisLink]',
})
export class LinkDirective extends LinkApiDirective implements OnInit, OnChanges, AfterViewInit {
  constructor(
    private _bindedElement: ElementRef<HTMLAnchorElement>,
    private _focusService: FudisFocusService,
    private _idService: FudisIdService,
    private _translationService: FudisTranslationService,
  ) {
    super();

    effect(() => {
      this._externalLinkAriaLabel.next(
        this._translationService.getTranslations()().LINK.EXTERNAL_LINK,
      );
    });
  }

  private _sizeCssClass: string = `fudis-link__size__inherit`;

  /**
   * Aria-label for the external link
   */
  private _externalLinkAriaLabel = new BehaviorSubject<string>(
    this._translationService.getTranslations()().LINK.EXTERNAL_LINK,
  );

  ngAfterViewInit(): void {
    this._bindedElement.nativeElement.classList.add('fudis-link');
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this._focusToAnchorElement();
    }
  }

  ngOnInit(): void {
    //this._setCssClasses();

    if (this.id) {
      this._idService.addNewId('link', this.id);
    } else {
      this.id = this._idService.getNewId('link');
    }

    this._bindedElement.nativeElement.setAttribute('id', this.id);
  }

  ngOnChanges(changes: FudisComponentChanges<LinkDirective>): void {
    if (changes.size?.previousValue !== changes.size?.currentValue) {
      this._setSizeClass();
    }

    if (changes.external?.currentValue !== changes.external?.previousValue) {
      this._setExternalAttributes();
    }
  }

  /**
   * Set size CSS class
   */
  private _setSizeClass(): void {
    const currentSize = this._sizeCssClass;
    this._bindedElement.nativeElement.classList.remove(currentSize);

    this._sizeCssClass = `fudis-link__size__${this.size}`;

    this._bindedElement.nativeElement.classList.add(this._sizeCssClass);
  }

  private _setExternalAttributes(): void {
    if (this.external) {
      this._bindedElement.nativeElement.setAttribute('target', '_blank');
      this._bindedElement.nativeElement.setAttribute('rel', 'noopener noreferrer');
      this._bindedElement.nativeElement.setAttribute(
        'aria-label',
        `${this.title}, ${this._externalLinkAriaLabel}`,
      );
    } else {
      this._bindedElement.nativeElement.removeAttribute('target');
      this._bindedElement.nativeElement.removeAttribute('rel');
      this._bindedElement.nativeElement.setAttribute('aria-label', this.title);
    }
  }

  private _focusToAnchorElement(): void {
    if (this._bindedElement?.nativeElement && !this._focusService.isIgnored(this.id)) {
      (this._bindedElement.nativeElement as HTMLAnchorElement).focus();
    }
  }
}
