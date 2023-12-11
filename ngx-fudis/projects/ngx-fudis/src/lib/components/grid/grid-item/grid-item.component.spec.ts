import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';
import { GridItemComponent } from './grid-item.component';
import { FudisGridService } from '../../../services/grid/grid.service';
import { FudisBreakpointService } from '../../../services/breakpoint/breakpoint.service';
import { FudisBreakpointStyleResponsive } from '../../../types/breakpoints';
import { FudisGridItemAlignment } from '../../../types/grid';
import { GridComponent } from '../grid/grid.component';
import { HeadingComponent } from '../../typography/heading/heading.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
	selector: 'fudis-mock-grid-item-component',
	template: `<fudis-grid [columns]="6">
		<fudis-heading [level]="2">I am test heading</fudis-heading>
		<fudis-grid-item [columns]="columns">
			<fudis-body-text> Paragraph text for testing grid item functionalities. This is so much fun! </fudis-body-text>
		</fudis-grid-item>
		<fudis-grid-item [alignY]="alignY" [alignX]="alignX">
			<fudis-button [label]="'Test button'" />
		</fudis-grid-item>
	</fudis-grid>`,
})
class HostComponent {
	columns: string | FudisBreakpointStyleResponsive = '1';

	alignY: FudisGridItemAlignment = 'stretch';

	alignX: FudisGridItemAlignment = 'stretch';
}

describe('GridItemComponent', () => {
	let component: HostComponent;
	let fixture: ComponentFixture<HostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				HostComponent,
				GridItemComponent,
				GridComponent,
				MockComponent(HeadingComponent),
				MockComponent(BodyTextComponent),
				MockComponent(ButtonComponent),
			],
			providers: [FudisGridService, FudisBreakpointService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HostComponent);
		component = fixture.componentInstance;
	});

	function getGridItemComponent() {
		return fixture.debugElement.queryAll(By.css('fudis-grid-item'));
	}

	// eslint-disable-next-line consistent-return
	function getAttribute(index: number, attr: string) {
		switch (attr) {
			case 'justify-self':
				return getGridItemComponent()[index].nativeElement.style.justifySelf;
			case 'align-self':
				return getGridItemComponent()[index].nativeElement.style.alignSelf;
			case 'grid-column':
				return getGridItemComponent()[index].nativeElement.style.gridColumn;
			default:
				break;
		}
	}

	describe('Component creation', () => {
		it('should create mock component', () => {
			expect(component).toBeTruthy();
		});

		it('should find fudis-grid-item elements', () => {
			expect(getGridItemComponent().length).toBe(2);
		});
	});

	describe('Style properties', () => {
		// FIXME: Use visual regression tests instead of testing style attribute values directly.
		it.skip('should convert given alingX and alignY attributes to style properties', () => {
			fixture.detectChanges();

			expect(getAttribute(1, 'justify-self')).toBe('stretch');
			expect(getAttribute(1, 'align-self')).toBe('stretch');

			component.alignY = 'end';
			component.alignX = 'end';
			fixture.detectChanges();

			expect(getAttribute(1, 'justify-self')).toBe('end');
			expect(getAttribute(1, 'align-self')).toBe('end');

			component.alignY = 'start';
			component.alignX = 'start';
			fixture.detectChanges();

			expect(getAttribute(1, 'justify-self')).toBe('start');
			expect(getAttribute(1, 'align-self')).toBe('start');

			component.alignY = 'center';
			component.alignX = 'center';
			fixture.detectChanges();

			expect(getAttribute(1, 'justify-self')).toBe('center');
			expect(getAttribute(1, 'align-self')).toBe('center');
		});

		// FIXME: Use visual regression tests instead of testing style attribute values directly.
		it.skip('should convert columns attribute to grid-column properties', () => {
			fixture.detectChanges();

			const columnsBeforeValid =
				(getAttribute(0, 'grid-column') === '1' || getAttribute(0, 'grid-column') === '1 / auto') ?? true;

			expect(columnsBeforeValid).toEqual(true);

			component.columns = '3';
			fixture.detectChanges();

			const columnsAfterValid =
				(getAttribute(0, 'grid-column') === '3' || getAttribute(0, 'grid-column') === '3 / auto') ?? true;

			expect(columnsAfterValid).toEqual(true);
		});
	});
});
