import {
  OnInit,
  AfterViewInit,
  Directive,
  ElementRef,
  OnChanges,
  effect,
  Input,
  inject,
  ViewContainerRef,
  Inject,
  ComponentRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FudisComponentChanges } from '../../types/miscellaneous';
import { FudisFocusService } from '../../services/focus/focus.service';
import { FudisIdService } from '../../services/id/id.service';
import { BehaviorSubject } from 'rxjs';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { IconComponent } from '../../components/icon/icon.component';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[fudisLink]',
})
export class LinkDirective implements OnInit, OnChanges, AfterViewInit {
  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _bindedElement: ElementRef<HTMLAnchorElement>,
    private _focusService: FudisFocusService,
    private _idService: FudisIdService,
    private _translationService: FudisTranslationService,
    private _cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      this._externalLinkAriaLabel.next(
        this._translationService.getTranslations()().LINK.EXTERNAL_LINK,
      );
    });
  }

  /**
   * Link size. By default link will inherit its parent's font-size. If link is not inside e.g. <fudis-heading> or <fudis-body-text> its size can be defined either 'md' (14px) or 'lg' (16px).
   */
  @Input() size: 'inherit' | 'md' | 'lg' = 'inherit';

  /**
   * Set browser focus to link on the first load.
   */
  @Input() initialFocus: boolean = false;

  /**
   * Id for the anchor element. By default generated with FudisIdService
   */
  @Input() id: string;

  /**
   * External link URL
   */
  @Input() external: boolean = false;

  /**
   * Title for the link, if not defined title will be the same as link URL
   */
  @Input({ required: true }) title: string;

  private _sizeCssClass: string = `fudis-link__size__inherit`;

  private _viewContainerRef = inject(ViewContainerRef);

  private _iconComponentRef: ComponentRef<IconComponent>;

  private _parsedTitle: string[] = [];

  /**
   * Aria-label for the external link
   */
  private _externalLinkAriaLabel = new BehaviorSubject<string>(
    this._translationService.getTranslations()().LINK.EXTERNAL_LINK,
  );

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      (this._bindedElement.nativeElement as HTMLAnchorElement).focus();
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this._idService.addNewId('link', this.id);
    } else {
      this.id = this._idService.getNewId('link');
    }

    this._setSizeClass();
    this._bindedElement.nativeElement.classList.add('fudis-link');
    this._bindedElement.nativeElement.setAttribute('id', this.id);
  }

  ngOnChanges(changes: FudisComponentChanges<LinkDirective>): void {
    if (changes.size?.previousValue !== changes.size?.currentValue) {
      this._setSizeClass();
    }

    const titleChanged = changes.title?.currentValue !== changes.title?.previousValue;

    const externalChanged = changes.external?.currentValue !== changes.title?.previousValue;

    if (titleChanged || externalChanged) {
      this._setHtmlAttributes();

      if (titleChanged) {
        this._parseTitle();

        if (!changes.title?.isFirstChange() && this.external) {
          this._updateTitleHtml();
        }
      }

      if (externalChanged) {
        this._setExternalHtml();
      }

      this._cdr.detectChanges();
    }
  }

  private _updateTitleHtml(): void {
    // Remove texts from parent
    this._bindedElement.nativeElement.childNodes.forEach(
      (node) => node.nodeType === Node.TEXT_NODE && node.remove(),
    );

    const iconWrapper = this._bindedElement.nativeElement.querySelector(
      '.fudis-link__external__icon-wrapper',
    ) as HTMLSpanElement;

    if (iconWrapper) {
      // Remove texts from icon wrapper
      iconWrapper.childNodes.forEach((node) => node.nodeType === Node.TEXT_NODE && node.remove());

      if (this._parsedTitle.length === 1) {
        const text = this._document.createTextNode(this._parsedTitle[0]);
        iconWrapper.prepend(text);
      } else {
        const textStart = this._document.createTextNode(`${this._parsedTitle[0]} `);
        const textEnd = this._document.createTextNode(this._parsedTitle[1]);
        this._bindedElement.nativeElement.prepend(textStart);
        iconWrapper.prepend(textEnd);
      }
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

  /**
   * Add to remove relevant HTML attributes from binded element.
   */
  private _setHtmlAttributes(): void {
    if (this.external) {
      this._bindedElement.nativeElement.setAttribute('target', '_blank');
      this._bindedElement.nativeElement.setAttribute('rel', 'noopener noreferrer');
      this._bindedElement.nativeElement.setAttribute(
        'aria-label',
        `${this.title}, ${this._externalLinkAriaLabel.value}`,
      );
    } else {
      this._bindedElement.nativeElement.removeAttribute('target');
      this._bindedElement.nativeElement.removeAttribute('rel');
      this._bindedElement.nativeElement.setAttribute('aria-label', this.title);

      const titleNode = this._document.createTextNode(this.title);

      this._bindedElement.nativeElement.replaceChildren(titleNode);
    }
  }

  private _setExternalHtml(): void {
    if (this.external) {
      // Create Icon Component and define properties
      this._iconComponentRef = this._viewContainerRef.createComponent(IconComponent);
      this._iconComponentRef.setInput('icon', 'new-tab');
      this._iconComponentRef.setInput('color', 'primary-dark');

      // Create HTML semantics
      const html = String.raw;
      if (this._parsedTitle.length === 1) {
        this._bindedElement.nativeElement.innerHTML = html`<span
          class="fudis-link__external__icon-wrapper"
          >${this._parsedTitle[0]}<span class="fudis-link__external__icon"></span>
        </span>`;
      } else {
        this._bindedElement.nativeElement.innerHTML = html`${this._parsedTitle[0]}
          <span class="fudis-link__external__icon-wrapper"
            >${this._parsedTitle[1]}<span class="fudis-link__external__icon"></span>
          </span>`;
      }

      // Append Icon Component to right place in the HTML
      this._bindedElement.nativeElement
        .querySelector('.fudis-link__external__icon')
        ?.append(this._iconComponentRef.instance.elementRef.nativeElement);
    } else {
      // If not External, detach Icon Component instance

      this._viewContainerRef.detach();
    }
  }

  /**
   * Used with external links to split the last word of the title to be paired with the Icon, so that on line break, the icon sticks with the last word of the title.
   */
  private _parseTitle(): void {
    const toArray = this.title.split(' ').filter((n) => n);

    if (toArray.length > 1) {
      const lastWord: string = toArray[toArray.length - 1];

      const titleStart: string = toArray.slice(0, -1).join(' ');

      this._parsedTitle = [titleStart, lastWord];
    } else {
      this._parsedTitle = [toArray[0]];
    }
  }
}
