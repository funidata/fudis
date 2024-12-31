import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerComponent } from './loading-spinner.component';
import { BodyTextComponent } from '../typography/body-text/body-text.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent, BodyTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct HTML elements and classes', () => {
    
  });

  describe('visual properties', () => {
    describe('small (default) variant', () => {
      it('should have default Loading text if label is not provided', () => {});

      it('should have app provided label', () => {});

      it('should have correct svg icon', () => {});

      it('should not have visible elements, if visible is false', () => {});
    });

    describe('large variant', () => {
      it('should have default Loading text if label is not provided', () => {});

      it('should have app provided label', () => {});

      it('should have correct svg icon', () => {});

      it('should not have visible elements, if visible is false', () => {});
    });
  });
  describe('screen reader elements', () => {
    it('should not be present with small variant', () => {});

    it('should have correct status message when visible is true', () => {});

    it('should have correct status message when visible is false', () => {});
  });
});
