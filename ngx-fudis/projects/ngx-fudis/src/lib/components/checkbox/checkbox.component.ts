import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fudis-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})

export class CheckboxComponent {


	@Input() name : string;
	@Input() color: 'primary';
	/**
	 * Checbok modifiers
	 */
	 @Input() disabled = false;

	 @Input() checked = false;

	@Input() disableRipple = true;
	

	 @Output() checkedChange = new EventEmitter<Boolean>();


}
