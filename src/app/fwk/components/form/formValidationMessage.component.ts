import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';


export const CUSTOM_FORM_VALIDATION_MESSAGE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormValidationMessageComponent),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'form-validation-message',
  templateUrl: 'formValidationMessage.component.html',
  providers: [CUSTOM_FORM_VALIDATION_MESSAGE_ACCESSOR],
})

export class FormValidationMessageComponent  extends AbstractValueAccessor{
    /**INPUT */
    @Input() parentGroup: FormGroup;
    constructor() {
        super();
    }

    mostrarMensaje() {
        return this.parentGroup.invalid;
    }
    mostrarMensajeGeneral() {
        let mostrarMensajeGeneral = true;
        if(this.mostrarMensaje()) {
            Object.keys(this.parentGroup.controls).forEach(key => {
                if(this.parentGroup.get(key).errors) {
                    if(!this.parentGroup.get(key).errors.required) {
                        mostrarMensajeGeneral = false;
                    }
                }else {
                    mostrarMensajeGeneral = false;
                }
            });
        }else {
            mostrarMensajeGeneral = false;
        }
        return mostrarMensajeGeneral;
    }

    mostrarDatosRequeridos() {
        let mostrarMensaje = false;
        if(this.mostrarMensajeGeneral()) {
            mostrarMensaje = false;
        }else if(this.mostrarMensaje()) {
            let countErrorsRequired = 0;
            Object.keys(this.parentGroup.controls).forEach(key => {
                if(this.parentGroup.get(key).errors) {
                    if(this.parentGroup.get(key).errors.required) {
                        countErrorsRequired++;
                    }
                }
            });

            mostrarMensaje = countErrorsRequired > 1;
        }
        return mostrarMensaje;
    }

    mostrarDatoRequerido() {
        let mostrarMensaje = false;
        if(this.mostrarMensaje() && !this.mostrarMensajeGeneral() && !this.mostrarDatosRequeridos()) {
            Object.keys(this.parentGroup.controls).forEach(key => {
                if(this.parentGroup.get(key).errors) {
                    if(this.parentGroup.get(key).errors.required) {
                        mostrarMensaje = true;
                    }
                }
            });
        }
        return mostrarMensaje;
    }
}
