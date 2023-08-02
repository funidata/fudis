import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IconComponent } from './icon.component';
import { FudisIconColor, FudisIconRotate } from '../../types/icons';

describe('IconComponent', () => {
	let component: IconComponent;
	let fixture: ComponentFixture<IconComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [IconComponent],
		})
			.overrideComponent(IconComponent, {
				set: { changeDetection: ChangeDetectionStrategy.Default },
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(IconComponent);
		component = fixture.componentInstance;
		component.icon = 'clock';
		component.ngOnChanges();
		fixture.detectChanges();
	});

	function assertIconHasClasses(classes: string[]): void {
		const svgElem = fixture.debugElement.query(By.css('svg'));
		const elem = svgElem.nativeElement as HTMLElement;
		const componentClasses = elem.getAttribute('class');

		expect(componentClasses?.split(' ').sort()).toEqual(classes.sort());
	}

	function iconColorCheck(color: FudisIconColor): void {
		component.color = color;
		component.ngOnChanges();
		fixture.detectChanges();
		assertIconHasClasses(['fudis-icon', `fudis-icon-color__${color}`, 'fudis-icon-rotate__none', 'fudis-icon__lg']);
	}

	function iconRotateCheck(rotate: FudisIconRotate): void {
		component.rotate = rotate;
		component.ngOnChanges();
		fixture.detectChanges();
		assertIconHasClasses(['fudis-icon', 'fudis-icon-color__default', `fudis-icon-rotate__${rotate}`, 'fudis-icon__lg']);
	}

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('CSS classes', () => {
		it('should have default classes when icon is set', () => {
			assertIconHasClasses(['fudis-icon', 'fudis-icon-color__default', 'fudis-icon-rotate__none', 'fudis-icon__lg']);
		});

		it('should change color class according to given color Input value', () => {
			iconColorCheck('attention');
			iconColorCheck('danger');
			iconColorCheck('default');
			iconColorCheck('light');
			iconColorCheck('primary');
			iconColorCheck('success');
			iconColorCheck('white');
		});

		it('should change rotate class according to given rotate Input value', () => {
			iconRotateCheck('flip-180');
			iconRotateCheck('cw-90');
			iconRotateCheck('ccw-90');
			iconRotateCheck('none');
		});
	});

	describe('Icon', () => {
		it('should be displayed according to given icon Input value', () => {
			component.icon = 'alert';
			component.ngOnChanges();
			fixture.detectChanges();
			const svgElem = fixture.debugElement.query(By.css('svg'));
			const useElem = svgElem.nativeElement.querySelector('use');

			expect(useElem.getAttribute('href')).toBeTruthy();
			expect(useElem.getAttribute('href')).toEqual('alert.svg#alert');
		});
	});
});
