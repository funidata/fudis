import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge.component';
import { FudisBadgeVariant } from '../../types/miscellaneous';

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponent);
    fixture.detectChanges();
  });

  function assertBadgeHasClasses(classes: string): void {
    const childSpan = fixture.nativeElement.childNodes;
    const componentClasses = childSpan[0].className.split(' ').sort();

    expect(componentClasses).toEqual(classes.split(' ').sort());
  }

  function badgeVariantCheck(variant: FudisBadgeVariant): void {
    fixture.componentRef.setInput('variant', variant);
    fixture.detectChanges();
    assertBadgeHasClasses(`fudis-badge fudis-badge__${variant}`);
  }

  describe('CSS classes', () => {
    it('should change the class according to the given variant Input', () => {
      badgeVariantCheck('accent');
      badgeVariantCheck('danger');
      badgeVariantCheck('primary');
      badgeVariantCheck('secondary');
      badgeVariantCheck('success');
    });
  });

  describe('Content', () => {
    it('should have text content according to the given content Input', () => {
      fixture.componentRef.setInput('content', 'Badge text');
      fixture.detectChanges();
      const elem = fixture.debugElement.query(By.css('.fudis-badge'));

      const badgeContent = elem.nativeElement;

      expect(badgeContent.textContent).toEqual('Badge text');
    });
  });
});
