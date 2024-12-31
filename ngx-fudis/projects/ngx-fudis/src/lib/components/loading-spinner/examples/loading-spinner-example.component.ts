import { Component, signal, ViewChild } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner.component';
import { NgxFudisModule } from '../../../ngx-fudis.module';
import { HeadingComponent } from '../../typography/heading/heading.component';

@Component({
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, NgxFudisModule],
  selector: 'example-loading-spinner-demo',
  styleUrl: './loading-spinner-example.component.scss',
  templateUrl: './loading-spinner-example.component.html',
})
export class StorybookExampleLoadingSpinnerComponent {
  loadingState = signal<boolean>(false);

  @ViewChild('headingRef') public headingRef: HeadingComponent;

  public toggleLoading(): void {
    this.loadingState.set(true);

    setTimeout(() => {
      this.loadingState.set(false);

      setTimeout(() => {
        this.headingRef.headingRef.nativeElement.focus();
      }, 100);
    }, 3000);
  }
}
