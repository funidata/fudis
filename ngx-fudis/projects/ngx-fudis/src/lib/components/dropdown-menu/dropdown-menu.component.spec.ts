// TODO: write tests

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuComponent } from './dropdown-menu.component';
import { ButtonComponent } from '../button/button.component';

describe.skip('DropdownMenuComponent', () => {
  //let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownMenuComponent, ButtonComponent],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownMenuComponent);
    //component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
