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

    if (changes.title?.currentValue !== changes.title?.previousValue) {
      this._setTitle();
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

  private _setTitle(): void {
    this._bindedElement.nativeElement.innerText = this.title;
  }

  /**
   * Handle Link Component focus event
   */
  protected _handleFocus(event: FocusEvent): void {
    this.handleFocus.emit(event);
  }

  /**
   * Handle Link Component blur event
   */
  protected _handleBlur(event: FocusEvent): void {
    this.handleBlur.emit(event);
  }

  /**
   * Handle Link Component click event
   */
  protected _handleClick(event: Event): void {
    this.handleClick.emit(event);
  }

  //   /**
  //  * For external links with a title. Used to split the last word of the title to be paired with the Icon, so that on line break, the icon sticks with the last word of the title.
  //  */
  //   private _parseExternalLinkTitle(): void {
  //     if (this.external) {
  //       if (this.title) {
  //         const toArray = this.title.split(' ');

  //         if (toArray.length > 1) {
  //           const lastWord: string = toArray[toArray.length - 1];

  //           const titleStart: string = toArray.slice(0, -1).join(' ');

  //           this._externalLinkTitleParsed.next([titleStart, lastWord]);
  //         } else {
  //           this._externalLinkTitleParsed.next(toArray);
  //         }
  //       } else {
  //         this._externalLinkTitleParsed.next([this.title]);
  //       }
  //     }
  //   }
}

// <!--
// <ng-container *ngIf="!title">
//   <span class="fudis-link__external__icon-wrapper"
//     >{{ external
//     }}<span class="fudis-link__external__icon">
//       <fudis-icon [icon]="'new-tab'" [color]="'primary-dark'" />
//     </span>
//   </span>
// </ng-container>
// <ng-container *ngIf="_externalLinkTitleParsed | async as parsedTitle">
//   <ng-container *ngIf="title">
//     <ng-container *ngIf="parsedTitle.length > 1"
//       >{{ parsedTitle[0] }}
//       <span class="fudis-link__external__icon-wrapper"
//         >{{ parsedTitle[1]
//         }}<span class="fudis-link__external__icon">
//           <fudis-icon [icon]="'new-tab'" [color]="'primary-dark'" />
//         </span>
//       </span>
//     </ng-container>
//     <ng-container *ngIf="parsedTitle.length === 1">
//       <span class="fudis-link__external__icon-wrapper"
//         >{{ parsedTitle[0]
//         }}<span class="fudis-link__external__icon">
//           <fudis-icon [icon]="'new-tab'" [color]="'primary-dark'" />
//         </span>
//       </span>
//     </ng-container>
//   </ng-container>
// </ng-container> -->
