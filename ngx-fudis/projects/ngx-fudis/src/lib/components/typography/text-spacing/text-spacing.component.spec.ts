import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSpacingComponent } from './text-spacing.component';

describe('TextSpacingComponent', () => {
	let component: TextSpacingComponent;
	let fixture: ComponentFixture<TextSpacingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TextSpacingComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TextSpacingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
