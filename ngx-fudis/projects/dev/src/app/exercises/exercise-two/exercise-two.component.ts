import { Component } from '@angular/core';
import pkg from '../../../../../ngx-fudis/package.json';
import {
  BodyTextComponent,
  DescriptionListComponent,
  DescriptionListItemComponent,
  DescriptionListItemDetailsComponent,
  DescriptionListItemTermComponent,
  ExpandableComponent,
  ExpandableContentDirective,
  GridComponent,
  HeadingComponent,
  LinkDirective,
} from 'ngx-fudis';
import { TranslocoRootModule } from '../../transloco-root.module';

@Component({
  selector: 'app-exercise-two',
  templateUrl: 'exercise-two.component.html',
  imports: [
    GridComponent,
    BodyTextComponent,
    HeadingComponent,
    ExpandableComponent,
    ExpandableContentDirective,
    DescriptionListComponent,
    DescriptionListItemComponent,
    DescriptionListItemTermComponent,
    DescriptionListItemDetailsComponent,
    LinkDirective,
    TranslocoRootModule,
  ],
})
export class ExerciseTwoComponent {
  constructor() {}

  version = pkg.version;

  core = pkg.peerDependencies['@funidata/fudis-core'].replace(/^[\^=]+/, '');
}
