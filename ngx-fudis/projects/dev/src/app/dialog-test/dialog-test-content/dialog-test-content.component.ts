import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-test-content',
  template: `
  <h2 mat-dialog-title>Otsikko jee</h2>
    <p>
      dialog-test-content works!
    </p>
  `,
  styles: [
  ]
})
export class DialogTestContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
