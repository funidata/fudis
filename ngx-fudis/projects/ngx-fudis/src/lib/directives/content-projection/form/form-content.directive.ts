import { Directive, HostBinding, Input, OnInit } from "@angular/core";

@Directive({ selector: 'fudis-form-actions' })
export class FormActionsDirective implements OnInit {

    /**
     * If Form Actions are inside of dialog
     */
    @Input() dialogActions: boolean;
    /**
     * Binding CSS class to form actions wrapper
     */
    @HostBinding('class') public hostClass = 'fudis-form__header__actions';

    ngOnInit(): void {
        if(this.dialogActions){
            this.hostClass = 'fudis-form__header__actions__dialog';
        }
    }
}

@Directive({ selector: 'fudis-form-header' })
export class FormHeaderDirective {
    /**
     * Binding fudis-form__header__main__content CSS class to form header wrapper
     */
    @HostBinding('class') public hostClass = 'fudis-form__header__main__content';
}

@Directive({ selector: 'fudis-form-content' })
export class FormContentDirective {
}