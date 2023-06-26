// eslint-disable-next-line max-classes-per-file
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

import { ExpandableComponent } from './expandable.component';
import { ActionsDirective } from '../../directives/content-projection/actions/actions.directive';
import { ContentDirective } from '../../directives/content-projection/content/content.directive';
import { FudisIdService } from '../../utilities/id-service.service';

@Component({
	selector: 'fudis-mock-container',
	template: `<fudis-expandable [collapsed]="collapsed" [title]="'Test title'">
		<ng-template fudisActions type="expandable">
			<fudis-button [label]="'Action button'"></fudis-button>
		</ng-template>
		<ng-template fudisContent type="expandable">
			<fudis-mock-component
				(initialized)="contentInitializationCount = contentInitializationCount + 1"></fudis-mock-component>
		</ng-template>
	</fudis-expandable>`,
})
class MockContainerComponent {
	collapsed: boolean;

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
	let containerComponent: MockContainerComponent;
	let fixture: ComponentFixture<MockContainerComponent>;

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
			providers: [FudisIdService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MockContainerComponent);
		containerComponent = fixture.componentInstance;
	});

	function toggleExpandableState(): void {
		fixture.nativeElement.querySelector('fudis-expandable button.fudis-expandable__header__heading__button').click();
	}

	function getExpandable(): ExpandableComponent {
		return fixture.debugElement.query(By.directive(ExpandableComponent)).componentInstance;
	}

	function headerHasButtons(): boolean {
		return !!fixture.nativeElement.querySelector('fudis-expandable div.fudis-expandable__header__buttons fudis-button');
	}

	function isContentVisible(): boolean {
		return !!fixture.nativeElement.querySelector('fudis-expandable .fudis-expandable__content:not([hidden])');
	}

	function assertExpandableIsExpanded(): void {
		expect(getExpandable().getCollapsedStatus()).withContext('Expected the expandable to be expanded').toEqual(false);
		expect(isContentVisible()).withContext('Expected the content component to be visible').toEqual(true);
	}

	function assertExpandableIsCollapsed(): void {
		expect(getExpandable().getCollapsedStatus()).withContext('Expected the expandable to be collapsed').toEqual(true);
		expect(isContentVisible()).withContext('Expected the content component not to be visible').toEqual(false);
	}

	describe('header buttons', () => {
		it('should render fudis-button when one is given through a fudisExpandableHeaderButtons template', () => {
			fixture.detectChanges();
			expect(headerHasButtons()).toBeTruthy();
		});
	});

	describe('lazy loading', () => {
		it('should not initialize content when rendering expandable with default settings', () => {
			fixture.detectChanges();

			assertExpandableIsCollapsed();
			expect(containerComponent.contentInitializationCount).toBe(0);
		});

		it('should initialize the content when rendering expandable as initially expanded', () => {
			containerComponent.collapsed = false;
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
			assertExpandableIsCollapsed();

			toggleExpandableState();
			fixture.detectChanges();
			assertExpandableIsExpanded();

			expect(containerComponent.contentInitializationCount).toBe(1);
		});

		it('should not remove the projected content from the DOM when collapsing the expandable', () => {
			containerComponent.collapsed = false;
			fixture.detectChanges();
			assertExpandableIsExpanded();

			toggleExpandableState();
			fixture.detectChanges();
			assertExpandableIsCollapsed();

			expect(
				fixture.nativeElement.querySelector('fudis-expandable .fudis-expandable__content[hidden] fudis-mock-component')
			)
				.withContext('Expected the projected component to remain in the DOM, hidden')
				.not.toEqual(null);
		});
	});
});
