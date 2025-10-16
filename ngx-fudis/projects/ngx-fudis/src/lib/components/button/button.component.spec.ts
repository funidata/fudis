import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { ButtonBaseDirective } from '../../directives/button-base/button-base.directive';
import { IconComponent } from '../icon/icon.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent, ButtonBaseDirective, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HTML attributes', () => {
    it('should have CSS host class', () => {
      expect(component['_classes']).toEqual('fudis-button-host');
    });
  });
});
