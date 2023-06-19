import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionListItemDetailsComponent } from './description-list-item-details.component';

describe('DescriptionListItemDetailsComponent', () => {
	let component: DescriptionListItemDetailsComponent;
	let fixture: ComponentFixture<DescriptionListItemDetailsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DescriptionListItemDetailsComponent],
		});
		fixture = TestBed.createComponent(DescriptionListItemDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
