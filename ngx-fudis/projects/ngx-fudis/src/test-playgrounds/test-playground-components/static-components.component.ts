import { Component } from '@angular/core';

import { fudisIconArray } from '../../lib/types/icons';
import { LoadingSpinnerComponent } from '../../lib/components/loading-spinner/loading-spinner.component';
import { NgxFudisModule } from '../../lib/ngx-fudis.module';

@Component({
  imports: [LoadingSpinnerComponent, NgxFudisModule],
  selector: 'example-static-components',
  templateUrl: './static-components.component.html',
})
export class StorybookExampleStaticComponentsComponent {
  loadingText = 'Longer spinner loading text to see that alignment and linebreaks work.';

  iconArray = fudisIconArray;

  breadcrumbLinks = [
    { label: 'My Legos', url: '/my-legos' },
    { label: 'Genre', url: '/my-legos/genre' },
    { label: 'Star Wars\u{2122}', url: '/my-legos/genre/star-wars' },
    { label: 'UCS Imperial Star Destroyer\u{2122}', url: '/my-legos/genre/star-wars/set-75252' },
  ];
}
