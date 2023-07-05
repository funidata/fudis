import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageBadgeGroupComponent } from './language-badge-group.component';

describe('LanguageBadgeGroupComponent', () => {
	let component: LanguageBadgeGroupComponent;
	let fixture: ComponentFixture<LanguageBadgeGroupComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LanguageBadgeGroupComponent],
		});
		fixture = TestBed.createComponent(LanguageBadgeGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
