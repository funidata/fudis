import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-test-content',
  template: `
    <h2 fudis-dialog-title>Otsikko jee</h2>
    <mat-dialog-content>
      <p>dialog-test-content works!</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>
        OK
      </button>
    </mat-dialog-actions>
  `,
  styles: [],
})
export class DialogTestContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
