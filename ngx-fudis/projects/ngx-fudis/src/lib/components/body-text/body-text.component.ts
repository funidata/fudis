import { Component, Input } from '@angular/core';

type Size = 'l-regular' | 'm-regular' | 's-regular' | 'l-light' | 'm-light' ;


@Component({
  selector: 'fudis-body-text',
  templateUrl: './body-text.component.html',
  styleUrls: ['./body-text.component.scss'],
})
export class BodyTextComponent {

  @Input() size: Size;

}
