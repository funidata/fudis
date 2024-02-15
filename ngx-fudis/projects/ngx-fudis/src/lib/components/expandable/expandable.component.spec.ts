import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { ExpandableComponent } from './expandable.component';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { FudisExpandableType } from '../../types/miscellaneous';
import { FudisIdService } from '../../services/id/id.service';
import { FudisInternalErrorSummaryService } from '../../services/form/error-summary/internal-error-summary.service';

@Component({
  selector: 'fudis-mock-container',
  template: `<fudis-expandable
    [closed]="closed"
    [title]="'Test title'"
    [subTitle]="subTitle"
    [level]="3"
    [variant]="variant"
    [padding]="padding"
  >
    <ng-template fudisActions type="expandable">
      <fudis-button [label]="'Action button'"></fudis-button>
    </ng-template>
    <ng-template fudisContent type="expandable">
      <fudis-mock-component
        (initialized)="contentInitializationCount = contentInitializationCount + 1"
      ></fudis-mock-component>
    </ng-template>
  </fudis-expandable>`,
})
class MockContainerComponent {
  closed: boolean;

  variant: FudisExpandableType;

  padding: string;

  subTitle: string;

  contentInitializationCount = 0;
}

@Component({
  selector: 'fudis-mock-component',
  template: 'Mock!',
})
class MockContentComponent implements OnInit {
  @Output() initialized = new EventEmitter<void>();

  ngOnInit(): void {
    this.initialized.next();
  }
}

describe('ExpandableComponent', () => {
  let errorService: FudisInternalErrorSummaryService;
  let component: ExpandableComponent;
  let containerComponent: MockContainerComponent;
  let fixture: ComponentFixture<MockContainerComponent> | ComponentFixture<ExpandableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContentDirective,
        ActionsDirective,
        ExpandableComponent,
        MockContainerComponent,
        MockContentComponent,
        MockComponent(ButtonComponent),
        MockComponent(IconComponent),
      ],
      providers: [FudisIdService, FudisInternalErrorSummaryService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockContainerComponent);
    containerComponent = fixture.componentInstance;
  });

  function toggleExpandableState(): void {
    fixture.nativeElement
      .querySelector('fudis-expandable button.fudis-expandable__header__heading__button')
      .click();
  }

  function getExpandable(): ExpandableComponent {
    return fixture.debugElement.query(By.directive(ExpandableComponent)).componentInstance;
  }

  function hasSubTitle(): boolean {
    return !!fixture.nativeElement.querySelector(
      'span.fudis-expandable__header__heading__button__sub-heading',
    );
  }

  function headerHasButtons(): boolean {
    return !!fixture.nativeElement.querySelector(
      'fudis-expandable div.fudis-expandable__header__buttons fudis-button',
    );
  }

  function isContentVisible(): boolean {
    return !!fixture.nativeElement.querySelector(
      'fudis-expandable .fudis-expandable__content:not([hidden])',
    );
  }

  function assertExpandableIsExpanded(): void {
    expect(getExpandable().getClosedStatus()).toEqual(false);
    expect(isContentVisible()).toEqual(true);
  }

  function assertExpandableIsClosed(): void {
    expect(getExpandable().getClosedStatus()).toEqual(true);
    expect(isContentVisible()).toEqual(false);
  }

  function assertExpandableClassHasVariant(variant: FudisExpandableType): void {
    containerComponent.variant = variant;
    fixture.detectChanges();

    expect(
      !!fixture.nativeElement.querySelector(`section.fudis-expandable__${variant}`),
    ).toBeTruthy();
  }

  function assertExpandableIconUpdatesByVariant(variant: FudisExpandableType): void {
    containerComponent.variant = variant;
    fixture.detectChanges();

    const elem = fixture.nativeElement.querySelector(
      'fudis-icon.fudis-expandable__header__heading__button__icon',
    ) as HTMLElement;

    if (variant === 'regular') {
      expect(elem.getAttribute('ng-reflect-icon')).toEqual('chevron-ring-fill');
      expect(elem.getAttribute('ng-reflect-color')).toEqual('default');
    }

    if (variant === 'lite') {
      expect(elem.getAttribute('ng-reflect-icon')).toEqual('chevron');
      expect(elem.getAttribute('ng-reflect-color')).toEqual('primary');
    }
  }

  function assertExpandableContentHasPadding(padding: string): void {
    fixture.detectChanges();
    containerComponent.padding = padding;

    toggleExpandableState();
    fixture.detectChanges();

    expect(
      !!fixture.nativeElement.querySelector(`div.fudis-expandable__content__padding-${padding}`),
    ).toBeTruthy();
  }

  describe('expandable variant features', () => {
    it('should change the expandable class according to the given expandable variant', () => {
      assertExpandableClassHasVariant('regular');
      assertExpandableClassHasVariant('lite');
    });

    it('should change the expandable header fudis-icon icon and color inputs according to the given expandable variant', () => {
      assertExpandableIconUpdatesByVariant('regular');
      assertExpandableIconUpdatesByVariant('lite');
    });

    it('should render given subTitle input for regular, but not for lite variant', () => {
      containerComponent.variant = 'regular';
      fixture.detectChanges();

      expect(hasSubTitle()).toBeFalsy();

      containerComponent.subTitle = 'Test sub title';
      fixture.detectChanges();

      expect(hasSubTitle()).toBeTruthy();

      containerComponent.variant = 'lite';
      fixture.detectChanges();

      expect(hasSubTitle()).toBeFalsy();
    });
  });

  describe('CSS classes', () => {
    it('should change the expandable content class according to the given padding', () => {
      assertExpandableContentHasPadding('default');
      assertExpandableContentHasPadding('small');
    });
  });

  describe('header buttons', () => {
    it('should render fudis-button when one is given through a fudisExpandableHeaderButtons template', () => {
      fixture.detectChanges();

      expect(headerHasButtons()).toBeTruthy();
    });
  });

  describe('lazy loading', () => {
    it('should not initialize content when rendering expandable with default settings', () => {
      fixture.detectChanges();

      assertExpandableIsClosed();

      expect(containerComponent.contentInitializationCount).toBe(0);
    });

    it('should initialize the content when rendering expandable as initially expanded', () => {
      containerComponent.closed = false;
      fixture.detectChanges();

      assertExpandableIsExpanded();

      expect(containerComponent.contentInitializationCount).toBe(1);
    });

    it('should initialize content when opening the expandable for the first time', () => {
      fixture.detectChanges();

      toggleExpandableState();
      fixture.detectChanges();

      assertExpandableIsExpanded();

      expect(containerComponent.contentInitializationCount).toBe(1);
    });

    it('should not initialize content more than once when toggling the expandable state', () => {
      fixture.detectChanges();

      toggleExpandableState();
      fixture.detectChanges();
      assertExpandableIsExpanded();

      toggleExpandableState();
      fixture.detectChanges();
      assertExpandableIsClosed();

      toggleExpandableState();
      fixture.detectChanges();
      assertExpandableIsExpanded();

      expect(containerComponent.contentInitializationCount).toBe(1);
    });

    it('should not remove the projected content from the DOM when collapsing the expandable', () => {
      containerComponent.closed = false;
      fixture.detectChanges();
      assertExpandableIsExpanded();

      toggleExpandableState();
      fixture.detectChanges();
      assertExpandableIsClosed();

      expect(
        fixture.nativeElement.querySelector(
          'fudis-expandable .fudis-expandable__content[hidden] fudis-mock-component',
        ),
      ).not.toEqual(null);
    });
  });

  describe('error summary', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ExpandableComponent);
      component = fixture.componentInstance;
      component.title = 'Test title';
      errorService = TestBed.inject(FudisInternalErrorSummaryService);
      jest.spyOn(errorService, 'addSection').mockImplementation(() => {});
      jest.spyOn(errorService, 'removeSection').mockImplementation(() => {});
      fixture.detectChanges();
    });

    it('onInit, should add section to error summary if errorSummaryBreadcrumb is true', () => {
      component.ngOnInit();

      expect(errorService.addSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;
      fixture.detectChanges();

      component.ngOnInit();

      expect(errorService.addSection).toHaveBeenCalledWith({
        id: 'fudis-expandable-2',
        title: 'Test title',
      });
    });

    it('onChanges, should add section to error summary if errorSummaryBreadcrumb is true and title is updated', () => {
      component.ngOnChanges();

      expect(errorService.addSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;
      component.title = 'New test title';
      fixture.detectChanges();

      component.ngOnChanges();

      expect(errorService.addSection).toHaveBeenCalledWith({
        id: 'fudis-expandable-2',
        title: 'New test title',
      });
    });

    it('onDestroy, should remove section from error summary if error summary info is sent', () => {
      component.ngOnDestroy();

      expect(errorService.removeSection).not.toHaveBeenCalled();

      component.errorSummaryBreadcrumb = true;
      fixture.detectChanges();
      component.addToErrorSummary();

      component.ngOnDestroy();

      expect(errorService.removeSection).toHaveBeenCalledWith({
        id: 'fudis-expandable-2',
        title: 'Test title',
      });
    });
  });
});

// TODO: add tests for title existing, heading level, closed input, closedChange output
