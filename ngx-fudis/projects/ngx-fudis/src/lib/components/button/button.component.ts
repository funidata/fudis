import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'fudis-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /**
   * Button variant options
   */
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'text-only' = 'primary';

  /**
   * Button size and type options
   */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Input() type: 'button' | 'submit' = 'button';

  /**
   * Button contents
   */
  @Input() label: string = 'Meidän nappi';

  @Input() ariaLabel: string;

  /**
   * Button modifiers
   */
  @Input() disabled = false;

  /**
   * Optional click handler
   */
  @Output()
  handleClick = new EventEmitter<Event>();

  public get classes(): string[] {
    return ['fudis-button', `fudis-button--${this.size}`, `fudis-button--${this.variant}`];
  }
}
