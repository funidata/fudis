import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SpacingDirective } from './spacing.directive';
import { FudisBreakpointService } from '../../services/breakpoint/breakpoint.service';
import { ButtonComponent } from '../../components/button/button.component';
import { LabelComponent } from '../../components/form/label/label.component';
import { FudisDropdownMenuItemService } from '../../components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';

@Component({
	selector: 'fudis-mock-component',
	template: `
		<fudis-button [label]="'Test1'" fudisSpacing [marginTop]="{ sm: 'md', lg: 'xxl' }" />
		<fudis-button [label]="'Test2'" fudisSpacing [marginBottom]="'xxs'" />
		<fudis-button [label]="'Test3'" fudisSpacing [marginLeft]="'xs'" [marginRight]="{ md: 'lg', lg: 'xl' }" />
		<fudis-button [label]="'Test4'" />
	`,
})
class HostComponent {}

describe('SpacingDirective', () => {
	let fixture: ComponentFixture<HostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SpacingDirective, HostComponent, ButtonComponent, LabelComponent],
			providers: [FudisBreakpointService, FudisDropdownMenuItemService],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	function getSpacingDirective() {
		return fixture.debugElement.queryAll(By.directive(SpacingDirective));
	}

	it('should find elements with spacing directive', () => {
		const elems = getSpacingDirective();
		const elemsWithNoDirective = fixture.debugElement.queryAll(By.css('fudis-button:not([fudisSpacing])'));

		expect(elems.length).toBe(3);
		expect(elemsWithNoDirective.length).toBe(1);
	});

	it('should convert given margin inputs to margin shorthand', () => {
		// Karma doesn't detect breakpoint changes so only the first given margin value inside the breakpoint object is tested
		const elems = getSpacingDirective();
		const first = elems[0].nativeElement.style.margin;
		const second = elems[1].nativeElement.style.margin;
		const third = elems[2].nativeElement.style.margin;

		expect(first).toBe('4rem 0px 0px');
		expect(second).toBe('0px 0px 0.25rem');
		expect(third).toBe('0px 2.5rem 0px 0.5rem');
	});
});
