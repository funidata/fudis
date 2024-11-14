import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorizontalRuleComponent } from './horizontal-rule.component';
import { getElement } from '../../utilities/tests/utilities';

describe('HorizontalRuleComponent', () => {
  let fixture: ComponentFixture<HorizontalRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorizontalRuleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalRuleComponent);
    fixture.detectChanges();
  });

  it('should contain a hr element with fudis-hr class that is hidden from screen reader', () => {
    const horizontalRule = getElement(fixture, 'hr');

    expect(horizontalRule.getAttribute('class')).toEqual('fudis-hr');
    expect(horizontalRule.getAttribute('aria-hidden')).toBeTruthy();
  });
});
