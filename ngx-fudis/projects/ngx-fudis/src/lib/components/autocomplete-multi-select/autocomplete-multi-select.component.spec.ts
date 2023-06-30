import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';
import { AutocompleteMultiSelectComponent } from './autocomplete-multi-select.component';
import { FudisDropdownMenuItemService } from '../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { LabelComponent } from '../form/label/label.component';
import { ButtonComponent } from '../button/button.component';

describe('AutocompleteMultiSelectComponent', () => {
	let component: AutocompleteMultiSelectComponent;
	let fixture: ComponentFixture<AutocompleteMultiSelectComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AutocompleteMultiSelectComponent, MockComponent(LabelComponent), MockComponent(ButtonComponent)],
			providers: [FudisDropdownMenuItemService],
		});
		fixture = TestBed.createComponent(AutocompleteMultiSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
