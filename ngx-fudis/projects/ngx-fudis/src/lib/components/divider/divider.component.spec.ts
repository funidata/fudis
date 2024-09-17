import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DividerComponent } from './divider.component';
import { getElement } from '../../utilities/tests/utilities';

describe('DividerComponent', () => {
  let fixture: ComponentFixture<DividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DividerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerComponent);
    fixture.detectChanges();
  });

  it('should contain a hr element with fudis-divider class that is hidden from screen reader', () => {
    const divider = getElement(fixture, 'hr');

    expect(divider.getAttribute('class')).toEqual('fudis-divider');
    expect(divider.getAttribute('aria-hidden')).toBeTruthy();
  });
});
