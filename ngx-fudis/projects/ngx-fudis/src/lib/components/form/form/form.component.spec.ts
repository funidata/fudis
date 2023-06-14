import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { HeadingComponent } from '../../typography/heading/heading.component';
import { BodyTextComponent } from '../../typography/body-text/body-text.component';
import { GridDirective } from '../../../directives/grid/grid/grid.directive';
import { IdService } from '../../../utilities/id-service.service';
import { GridService } from '../../../directives/grid/grid-service/grid.service';

describe('FormComponent', () => {
	let component: FormComponent;
	let fixture: ComponentFixture<FormComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FormComponent, HeadingComponent, BodyTextComponent, GridDirective],
			providers: [IdService, GridService],
		});
		fixture = TestBed.createComponent(FormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
