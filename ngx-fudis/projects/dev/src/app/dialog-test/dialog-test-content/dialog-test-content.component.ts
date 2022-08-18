import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-test-content',
  template: `
    <h2 fudis-dialog-title>Otsikko jee</h2>
    <fudis-dialog-content>
      <p>dialog-test-content works!</p>
    </fudis-dialog-content>
    <fudis-dialog-actions>
      <button mat-button fudis-dialog-close>Cancel</button>
      <button mat-button cdkFocusInitial>OK</button>
    </fudis-dialog-actions>
  `,
  styles: [],
})
export class DialogTestContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
