import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { NgxFudisModule } from '../../ngx-fudis.module';
import { FudisComponentChanges } from '../../types/miscellaneous';

@Component({
  selector: 'fudis-loading-spinner',
  standalone: true,
  imports: [CommonModule, NgxFudisModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
})
export class LoadingSpinnerComponent implements OnChanges {
  constructor(protected _translationService: FudisTranslationService) {}

  /**
   * Visible label text displayed under the spinner icon. If not provided, default text 'Loading' is used.
   */
  @Input() label: string;

  /**
   * Size variant. Variant 'sm' for smaller page sections and 'lg' for full page.
   */
  @Input() variant: 'sm' | 'lg' = 'sm';

  /**
   * Status message for screen reader users. Displayed only for 'lg' variant. Fudis provides default 'Page is loading' and 'Page load finished' texts.
   */
  @Input() statusMessage: string | null;

  /**
   * For variant 'lg' and better screen reader experience, instead of using *ngIf for displaying component, set this property true when loading is in progress and false, when loading is not in progress. This will trigger screen reader `statusMessage` properties accordingly.
   */
  @Input() enabled: boolean = true;

  ngOnChanges(changes: FudisComponentChanges<LoadingSpinnerComponent>): void {
    const enabled = changes.enabled;

    if (enabled && enabled.currentValue !== enabled.previousValue) {
      if (enabled.currentValue) {
        // From false to true
        console.log('From false to true');
      } else {
        // From true to false
        console.log('From true to false');
      }
    }
  }
}
