import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuComponent } from './dropdown-menu.component';
import { DropdownMenuItemService } from './dropdown-menu-item/dropdown-menu-item.service';

describe('DropdownMenuComponent', () => {
	let component: DropdownMenuComponent;
	let fixture: ComponentFixture<DropdownMenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DropdownMenuComponent],
			providers: [DropdownMenuItemService],
		}).compileComponents();

		fixture = TestBed.createComponent(DropdownMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
