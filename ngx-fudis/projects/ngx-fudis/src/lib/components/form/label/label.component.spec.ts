import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { MockComponent } from 'ng-mocks';
import { LabelComponent } from './label.component';
import { ButtonComponent } from '../../button/button.component';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelComponent, MockComponent(ButtonComponent)],
    })
      .overrideComponent(LabelComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Contents', () => {
    it('should have text content according to the given text Input', () => {
      component.text = 'This is test label';
      fixture.detectChanges();
      const elem = fixture.debugElement.query(By.css('.fudis-label__content__text'));

      expect(elem.nativeElement.innerHTML).toEqual(component.text);
    });

    it('should have required text visible if it is given', () => {
      component.required = true;
      fixture.detectChanges();

      const elem = fixture.debugElement.query(By.css('.fudis-label__content__required'));

      expect(elem.nativeElement).toBeTruthy();
      expect(elem.nativeElement.innerHTML).toEqual('(Required)');
    });

    it('should have tooltip button visible if tooltip text is given', () => {
      component.tooltip = 'I give more info';
      fixture.detectChanges();
      const elem = fixture.debugElement.query(By.css('fudis-button'));

      expect(elem.nativeElement).toBeTruthy();
    });

    // TODO: Should have written tests for id and for attributes.
  });
});
