import { Component } from '@angular/core';
import {
  FooterComponent,
  GridComponent,
  GridItemDirective,
  HorizontalRuleComponent,
  LinkDirective,
} from 'ngx-fudis';
import { TranslocoRootModule } from './transloco-root.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    FooterComponent,
    GridComponent,
    GridItemDirective,
    HorizontalRuleComponent,
    LinkDirective,
    RouterOutlet,
    TranslocoRootModule,
  ],
})
export class AppComponent {}
