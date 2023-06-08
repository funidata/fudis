import { TestBed } from '@angular/core/testing';
import { GridApiDirective } from './grid-api.directive';
import { GridService } from './grid-service/grid.service';

const fakeGridService = jasmine.createSpyObj<GridService>('GridService', {
	getBreakpointState: null,
});

describe('GridApiDirective', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [],
			providers: [],
		});
	});

	it('should create an instance', () => {
		const directive = new GridApiDirective(fakeGridService);
		expect(directive).toBeTruthy();
	});
});
