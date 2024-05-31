import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIconsComponent } from './select-icons.component';
import { ButtonComponent } from '../../../../button/button.component';
import { IconComponent } from '../../../../icon/icon.component';

// TODO write tests

describe('SelectIconsComponent', () => {
  let component: SelectIconsComponent;
  let fixture: ComponentFixture<SelectIconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectIconsComponent, ButtonComponent, IconComponent],
    });
    fixture = TestBed.createComponent(SelectIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
