import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FudisTranslationService } from '../../services/translation/translation.service';
import { NgxFudisModule } from '../../ngx-fudis.module';

@Component({
  selector: 'fudis-loading-spinner',
  standalone: true,
  imports: [CommonModule, NgxFudisModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
})
export class LoadingSpinnerComponent {
  constructor(protected _translationService: FudisTranslationService) {}

  /**
   * Visible label text displayed under the spinner icon. If not provided, default text 'Loading' is used
   */
  @Input() label: string;

  /**
   * Size variant
   */
  @Input() variant: 'sm' | 'lg' = 'sm';
}
