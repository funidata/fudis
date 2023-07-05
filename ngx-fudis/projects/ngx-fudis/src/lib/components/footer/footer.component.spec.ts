import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { GridComponent } from '../grid/grid/grid.component';
import { FudisGridService } from '../../directives/grid/grid-service/grid.service';

describe('FooterComponent', () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [FooterComponent, GridComponent],
			providers: [FudisGridService],
		});
		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
