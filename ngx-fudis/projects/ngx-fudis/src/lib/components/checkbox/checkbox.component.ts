import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fudis-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})

export class CheckboxComponent {


	@Input() name : string;
	/**
	 * Checbok modifiers
	 */
	 @Input() disabled : boolean;

	 @Input() checked = false;

	 @Output() checkedChange = new EventEmitter<Boolean>();

	 public get classes(): string[] {
		return [`fudis-checkbox__`];
	}
	
}
