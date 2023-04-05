import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TooltipDirective } from './tooltip.directive';

@Component({
	selector: 'fudis-mock-tooltip',
	template: ` <button fudisTooltip [tooltip]="'You should see me!'" [tooltipToggle]="false">
			On focus and hover tooltip should appear</button
		><button fudisTooltip [tooltip]="'I am toggle button!'" [tooltipToggle]="true" [tooltipPosition]="'left'">
			Tooltip should appear on toggle
		</button>`,
})
class HostComponent {}

describe('TooltipDirective', () => {
	let fixture: ComponentFixture<HostComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TooltipDirective, HostComponent],
			imports: [MatTooltipModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	function getTooltipDirective() {
		return fixture.debugElement.queryAll(By.directive(TooltipDirective));
	}

	it('tooltipToggle should be set correctly', () => {
		const all = getTooltipDirective();

		const button1 = all[0].injector.get<TooltipDirective>(TooltipDirective);
		const button2 = all[1].injector.get<TooltipDirective>(TooltipDirective);

		expect(button1.tooltipToggle).toBe(false);
		expect(button2.tooltipToggle).toBe(true);
	});

	it('should find 2 directives with correct tooltip text', () => {
		const all = getTooltipDirective();
		expect(all.length).toEqual(2);

		const button1 = all[0].injector.get<TooltipDirective>(TooltipDirective);
		const button2 = all[1].injector.get<TooltipDirective>(TooltipDirective);
		expect(button1.tooltip).toEqual('You should see me!');
		expect(button2.tooltip).toEqual('I am toggle button!');
	});

	it('buttons should return correct tooltipPositions', () => {
		const all = getTooltipDirective();

		const button1 = all[0].injector.get<TooltipDirective>(TooltipDirective);
		const button2 = all[1].injector.get<TooltipDirective>(TooltipDirective);
		expect(button1.tooltipPosition).toEqual('below');
		expect(button2.tooltipPosition).toEqual('left');
	});
});
