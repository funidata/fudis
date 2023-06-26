import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionComponent } from './section.component';
import { HeadingComponent } from '../typography/heading/heading.component';

import { FudisGridService } from '../../directives/grid/grid-service/grid.service';

import { FudisIdService } from '../../utilities/id-service.service';
import { GridDirective } from '../../directives/grid/grid/grid.directive';

describe('FormSectionComponent', () => {
	let component: SectionComponent;
	let fixture: ComponentFixture<SectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SectionComponent, HeadingComponent, GridDirective],
			providers: [FudisGridService, FudisIdService],
		});
		fixture = TestBed.createComponent(SectionComponent);

		component = fixture.componentInstance;
		component.title = 'Mandatory title';
		component.ngOnInit();

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
