import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sandbox-test-component',
  template: `
    <h1>alkaa</h1>
    <fudis-text-input [control]="control" [label]="label" />
    <h1>loppuu</h1>
  `,
})
export class SandboxTestComponent {
  @Input() control: FormControl;

  @Input() label: string;
}
