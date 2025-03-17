import {
  AfterViewInit,
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { TooltipApiDirective } from '../tooltip/tooltip-api.directive';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PopoverComponent } from '../../components/popover/popover.component';
import { FudisPopoverPosition } from '../../types/miscellaneous';
import { FudisIdService } from '../../services/id/id.service';
import { fromEvent, Subscription, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type PopoverPosition = {
  [key in FudisPopoverPosition]: ConnectedPosition;
};

@Directive({
  selector: '[fudisPopover]',
  standalone: true,
})
export class PopoverDirective extends TooltipApiDirective implements OnInit, AfterViewInit {
  constructor(
    private _fudisIdService: FudisIdService,
    private _boundElement: ElementRef<HTMLAnchorElement>,
    private _overlay: Overlay,
  ) {
    super();
  }

  private _destroyRef = inject(DestroyRef);

  private readonly _offset: number = 8;
  private clickSubscription: Subscription;
  private keydownSubscription: Subscription;
  private _overlayRef: OverlayRef | null = null;
  private _popoverElementId: string;
  private _isPopoverOpen: boolean = false;
  private _positions: PopoverPosition = {
    above: {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetY: -this._offset,
    },
    left: {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -this._offset,
    },
    right: {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: this._offset,
    },
    below: {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetY: this._offset,
    },
  };

  ngOnInit() {
    this._popoverElementId = this._fudisIdService.getNewId('popover');
    this._boundElement?.nativeElement?.setAttribute('aria-controls', this._popoverElementId);
  }

  ngAfterViewInit(): void {
    this._boundElement?.nativeElement?.addEventListener('click', this._clickHandler.bind(this));
    this._boundElement?.nativeElement?.addEventListener('keydown', this._onEscPress.bind(this));

    this._setAriaForBoundedElement('false');
  }

  private _clickHandler() {
    if (!this._isPopoverOpen) {
      this._openPopover();
    } else {
      this._closePopover();
    }
  }

  private _onEscPress(event: KeyboardEvent): void {
    if (event.key === 'Escape') this._closePopover();
  }

  private _openPopover() {
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._boundElement)
      .withPositions(this._getPositionStrategy())
      .withPush(false)
      .withScrollableContainers([]);

    this._overlayRef = this._overlay.create({
      positionStrategy,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
    });

    this.clickSubscription = fromEvent(document, 'click')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((event: Event) => this._focusOutHandler(event));

    this.keydownSubscription = fromEvent(document, 'keyup')
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((event: Event) => this._focusOutHandler(event));

    const popoverPortal = new ComponentPortal(PopoverComponent);

    const componentRef: ComponentRef<PopoverComponent> = this._overlayRef.attach(popoverPortal);
    componentRef.instance.popoverText = this.popoverText;
    componentRef.instance.id = this._popoverElementId;

    this._isPopoverOpen = true;
    this._setAriaForBoundedElement('true');
  }

  private _focusOutHandler(event: Event): void {
    if (
      this._overlayRef &&
      !this._boundElement?.nativeElement?.contains(event?.target as Node) &&
      !document.getElementById(this._popoverElementId)?.contains(event?.target as Node)
    ) {
      this._closePopover();
    }
  }

  private _closePopover() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
    this.keydownSubscription?.unsubscribe();
    this.clickSubscription?.unsubscribe();
    this._isPopoverOpen = false;
    this._setAriaForBoundedElement('false');
  }

  private _getPositionStrategy(): ConnectedPosition[] {
    const positions: ConnectedPosition[] = [];
    positions.push(this._positions[this.popoverPosition]);

    for (const positionsKey in this._positions) {
      if (positionsKey !== this.popoverPosition)
        positions.push(this._positions[positionsKey as FudisPopoverPosition]);
    }

    return positions;
  }

  private _setAriaForBoundedElement(expanded: 'true' | 'false') {
    this._boundElement?.nativeElement?.setAttribute('aria-expanded', expanded);
    if (expanded === 'true') {
      this._boundElement.nativeElement.setAttribute('aria-describedby', this._popoverElementId);
    } else {
      this._boundElement.nativeElement.removeAttribute('aria-describedby');
    }
  }
}
