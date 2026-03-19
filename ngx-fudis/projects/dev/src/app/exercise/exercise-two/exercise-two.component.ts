import { Component } from '@angular/core';
import pkg from '../../../../../ngx-fudis/package.json';

@Component({
  selector: 'app-exercise-two',
  templateUrl: 'exercise-two.component.html',
  standalone: false,
})
export class ExerciseTwoComponent {
  constructor() {}

  version = pkg.version;

  core = pkg.peerDependencies['@funidata/fudis-core'].replace(/^[\^=]+/, '');
}
