import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionListItemTermComponent } from './description-list-item-term.component';

describe('DescriptionListItemTermComponent', () => {
	let component: DescriptionListItemTermComponent;
	let fixture: ComponentFixture<DescriptionListItemTermComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DescriptionListItemTermComponent],
		});
		fixture = TestBed.createComponent(DescriptionListItemTermComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
