import { FormService } from '../../services/form.service';
import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';


export const FIELD_ERROR_VALIDATION_MESSAGE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FieldErrorMessageComponent),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'field-error-message',
  templateUrl: 'fieldErrorMessage.component.html',
  providers: [FIELD_ERROR_VALIDATION_MESSAGE_ACCESSOR],
})

export class FieldErrorMessageComponent  extends AbstractValueAccessor {
    /**INPUT */
    @Input() visible: boolean;
    @Input() leyenda: string;
    constructor(private formService: FormService) {
        super();
    }

    isVisible() {
        return this.visible && this.formService.presentarErrores;
    }
}
