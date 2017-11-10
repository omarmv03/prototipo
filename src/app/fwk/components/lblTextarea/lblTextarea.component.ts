import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { IControl } from '../../models/control';
import { FormBuilder, Validators, FormGroup, ValidatorFn } from '@angular/forms';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';

export const CUSTOM_LBLTEXTAREA_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LblTextareaComponent),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'lbl-textarea',
  templateUrl: 'lblTextarea.component.html',
  providers:[CUSTOM_LBLTEXTAREA_VALUE_ACCESSOR]
})
export class LblTextareaComponent extends AbstractValueAccessor implements OnInit, IControl {

    /**OUTPUT */
    @Output() onChangeComponent = new EventEmitter<any>();
    /**INPUT */
    @Input() parentGroup: FormGroup;

    @Input() labelText:string;
    @Input() placeholder:string;
    @Input() id:string;
    @Input() disabled:boolean;
    @Input() disableControl:boolean;
    @Input() required:boolean;
    @Input() validate:boolean;
    @Input() maxLength:number;
    @Input() style:Object;

    @Input() allData: any; // --> Cuando se crea este componente dinamicamente toda la info viene en esta property

    ngOnInit() {
        // --> this.allData viene siempre lleno cuando es un control dinamico
        if(this.allData !== undefined) {
            this.labelText = this.allData.descripcion;
            this.required = this.allData.requerido;
            this.id = this.allData.id;
            this.disabled = false;
            if(this.allData.longitudMaxima)  this.maxLength = this.allData.longitudMaxima;
        }
    }

    onChangeTextarea(value) {
        this.onChangeComponent.emit(value);
    }
}
