import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionComponent } from './section.component';
import { HeadingComponent } from '../typography/heading/heading.component';

import { GridService } from '../../directives/grid/grid-service/grid.service';

import { IdService } from '../../utilities/id-service.service';
import { GridDirective } from '../../directives/grid/grid/grid.directive';

describe('FormSectionComponent', () => {
	let component: SectionComponent;
	let fixture: ComponentFixture<SectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SectionComponent, HeadingComponent, GridDirective],
			providers: [GridService, IdService],
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
