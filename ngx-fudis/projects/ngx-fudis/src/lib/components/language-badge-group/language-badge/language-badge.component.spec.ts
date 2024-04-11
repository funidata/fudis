import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { LanguageBadgeComponent } from './language-badge.component';
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';
import { getElement } from '../../../utilities/tests/utilities';

describe('LanguageBadgeComponent', () => {
  let component: LanguageBadgeComponent;
  let fixture: ComponentFixture<LanguageBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageBadgeComponent, TooltipDirective],
      imports: [MatTooltipModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageBadgeComponent);
    component = fixture.componentInstance;
    component.language = 'en';
    component.variant = 'standard';
    component.label = 'This is test label';
    component.ngOnChanges({
      label: { firstChange: true, currentValue: 'This is test label', previousValue: '' },
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Contents', () => {
    it('should always have class name missing if language badge variant is a type missing', () => {
      component.variant = 'missing';
      component.ngOnChanges({
        variant: { firstChange: false, currentValue: 'missing', previousValue: 'standard' },
      });
      fixture.detectChanges();

      const classes = getElement(fixture, '.fudis-language-badge__content').className;

      expect(classes).toEqual('fudis-language-badge__content fudis-language-badge__missing');
    });

    it('should always have class name selected if language badge is selected', () => {
      component.selected = true;
      component.ngOnChanges({
        selected: { firstChange: false, currentValue: true, previousValue: false },
      });
      fixture.detectChanges();

      const classes = getElement(fixture, '.fudis-language-badge__content').className;

      expect(classes).toEqual(
        'fudis-language-badge__content fudis-language-badge__standard fudis-language-badge--selected',
      );
    });

    it('should have given label matching to aria-label', () => {
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.fudis-language-badge'));

      expect(label.nativeElement.getAttribute('aria-label')).toEqual('This is test label');
    });

    it('should have given label and selected text matching to aria-label', () => {
      component.selected = true;
      component.ngOnChanges({
        selected: { firstChange: false, currentValue: true, previousValue: false },
      });
      fixture.detectChanges();
      const LanguageBadgeLabel = fixture.debugElement.query(By.css('.fudis-language-badge'));

      expect(LanguageBadgeLabel.nativeElement.getAttribute('aria-label')).toEqual(
        'This is test label (Selected)',
      );
    });

    it('should have given label and missing text matching to aria-label', () => {
      component.variant = 'missing';
      component.ngOnChanges({
        variant: { firstChange: false, currentValue: 'missing', previousValue: 'standard' },
      });
      fixture.detectChanges();
      const LanguageBadgeLabel = fixture.debugElement.query(By.css('.fudis-language-badge'));

      expect(LanguageBadgeLabel.nativeElement.getAttribute('aria-label')).toEqual(
        'This is test label (Missing translation)',
      );
    });
  });

  describe('Interaction', () => {
    it('should emit output when clicked', () => {
      jest.spyOn(component.handleClick, 'emit');

      const button = getElement(fixture, '.fudis-language-badge') as HTMLButtonElement;

      button.click();

      expect(component.handleClick.emit).toHaveBeenCalledWith(component.language);
    });
  });
});
