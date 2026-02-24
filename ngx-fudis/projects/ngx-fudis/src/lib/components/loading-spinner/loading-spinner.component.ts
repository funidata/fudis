
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { BodyTextComponent } from '../typography/body-text/body-text.component';

/**
 * Indicates a loading or processing state.
 *
 * Use this component to inform users of ongoing activity or process.
 */
@Component({
  selector: 'fudis-loading-spinner',
  imports: [NgxFudisModule],
  templateUrl: './loading-spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingSpinnerComponent {
  constructor(protected _translationService: FudisTranslationService) {}

  /**
   * Visible label text displayed under the spinner icon. If not provided, default text 'Loading' is
   * used.
   */
  @Input() label: string;

  /**
   * Size variant. Variant 'sm' for smaller page sections and 'lg' for full page.
   */
  @Input() variant: 'sm' | 'lg' = 'sm';

  /**
   * Status message for screen reader users. Displayed only for 'lg' variant. Fudis provides default
   * 'Page is loading' and 'Page load finished' texts.
   */
  @Input() statusMessage: string | null;

  /**
   * For variant 'lg' and better screen reader experience, instead of using `@if` for displaying
   * component, set this property true when loading is in progress and false, when loading is not in
   * progress. This will trigger screen reader `statusMessage` properties accordingly.
   */
  @Input() visible: boolean = true;
}
