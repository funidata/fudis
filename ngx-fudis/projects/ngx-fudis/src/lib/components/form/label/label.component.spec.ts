import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LabelComponent } from './label.component';
import { ButtonComponent } from '../../button/button.component';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { IconComponent } from '../../icon/icon.component';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelComponent, ButtonComponent, IconComponent],
      providers: [FudisTranslationService, FudisIdService],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Contents', () => {
    it('should have text content according to the given text Input', () => {
      fixture.componentRef.setInput('text', 'This is test label');
      fixture.detectChanges();
      const elem = fixture.debugElement.query(By.css('.fudis-label__content__text'));

      expect(elem.nativeElement.innerHTML).toEqual(component.text);
    });

    it('should have required text visible if it is given', () => {
      fixture.componentRef.setInput('required', true);

      fixture.detectChanges();
      const elem = fixture.debugElement.query(By.css('.fudis-label__content__required'));

      expect(elem.nativeElement).toBeTruthy();
      expect(elem.nativeElement.innerHTML).toEqual('(Required)');
    });

    it('should have tooltip button visible if tooltip text is given', async () => {
      fixture.componentRef.setInput('tooltip', 'I give more info');
      fixture.detectChanges();
      const elem = fixture.debugElement.query(By.css('fudis-button'));
      expect(elem.nativeElement).toBeTruthy();
    });

    // TODO: Should have written tests for id and for attributes.
  });
});
