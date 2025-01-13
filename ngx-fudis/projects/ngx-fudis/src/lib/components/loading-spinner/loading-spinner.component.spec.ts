import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { getElement } from '../../utilities/tests/utilities';
import { NgxFudisModule } from '../../ngx-fudis.module';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent, NgxFudisModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const getParagraphLabel = (variant: string): HTMLParagraphElement => {
    return getElement(
      fixture,
      `.fudis-loading-spinner .fudis-loading-spinner__ui-content .fudis-body-text__${variant}-regular`,
    ) as HTMLParagraphElement;
  };

  const getSvgIcon = (variant: string): HTMLOrSVGElement => {
    return getElement(
      fixture,
      `svg.fudis-loading-spinner__svg.fudis-loading-spinner__variant__${variant}[aria-hidden="true"]`,
    ) as HTMLOrSVGElement;
  };

  const getStatusMessage = (): string | null => {
    return (
      getElement(
        fixture,
        '.fudis-loading-spinner__status.fudis-visually-hidden[role="status"]',
      ) as HTMLParagraphElement
    )?.textContent;
  };

  describe('visual properties', () => {
    const variants = [
      {
        variant: 'sm',
        name: 'small (default)',
        bodyTextVariant: 'md',
      },
      {
        variant: 'lg',
        name: 'large',
        bodyTextVariant: 'lg',
      },
    ];

    variants.forEach((variant) => {
      describe(`${variant.name} variant`, () => {
        beforeEach(() => {
          fixture.componentRef.setInput('variant', variant.variant);
          fixture.detectChanges();
        });

        it('should have default Loading text if label is not provided', () => {
          const labelText = getParagraphLabel(variant.bodyTextVariant);

          expect(labelText.textContent).toEqual('Loading');
        });

        it('should have app provided label', async () => {
          const appLabel = 'App provided label';

          fixture.componentRef.setInput('label', appLabel);

          fixture.detectChanges();

          const labelText = getParagraphLabel(variant.bodyTextVariant);

          expect(labelText.textContent).toEqual(appLabel);
        });

        it('should have correct svg icon', () => {
          const svgElement = getSvgIcon(variant.variant);

          expect(svgElement).toBeTruthy();
        });

        it('should not have visible elements, if visible is false', () => {
          fixture.componentRef.setInput('visible', false);

          fixture.detectChanges();

          const uiContent = getElement(fixture, '.fudis-loading-spinner__ui-content');

          expect(uiContent).toBeNull();
        });
      });
    });
  });

  describe('screen reader elements', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'lg');
      fixture.detectChanges();
    });

    it('should not be present with small variant', () => {
      fixture.componentRef.setInput('variant', 'sm');
      fixture.detectChanges();

      const statusElement = getElement(fixture, '.fudis-loading-spinner__status');

      expect(statusElement).toBeNull();
    });

    it('should be present with large variant', () => {
      const statusElement = getElement(
        fixture,
        '.fudis-loading-spinner__status.fudis-visually-hidden[role="status"]',
      );

      expect(statusElement).toBeTruthy();
    });

    it('should have correct DEFAULT status message when visible is TRUE', () => {
      expect(getStatusMessage()).toEqual('Page is loading');
    });

    it('should have correct DEFAULT status message when visible is FALSE', () => {
      fixture.componentRef.setInput('visible', false);
      fixture.detectChanges();
      expect(getStatusMessage()).toEqual('Page load finished');
    });

    it('should have correct APP PROVIDED status message when visible is TRUE', async () => {
      const appMessage = 'We need more loading!';

      fixture.componentRef.setInput('statusMessage', appMessage);
      fixture.detectChanges();

      await fixture.whenStable();

      fixture.detectChanges();

      expect(getStatusMessage()).toEqual(appMessage);
    });

    it('should have correct APP PROVIDED status message when visible is FALSE', () => {
      const appMessage = 'Enough is enough!';

      fixture.componentRef.setInput('statusMessage', appMessage);
      fixture.componentRef.setInput('visible', false);
      fixture.detectChanges();
      expect(getStatusMessage()).toEqual(appMessage);
    });
  });
});
