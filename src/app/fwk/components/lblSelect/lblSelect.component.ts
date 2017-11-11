import { Component, OnInit,Output,EventEmitter,Input  } from '@angular/core';
import { IControl } from '../../models/control';
import { FormBuilder, Validators, FormGroup , ValidatorFn, NG_VALIDATORS, Validator } from '@angular/forms';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';

export const CUSTOM_LBLSELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LblSelectComponent),
    multi: true
};

export const CUSTOM_LBLSELECT_VALIDATOR_ACCESSOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => LblSelectComponent),
    multi: true
  };

@Component({
  moduleId: module.id,
  selector: 'lbl-select',
  templateUrl: 'lblSelect.component.html',
  providers: [CUSTOM_LBLSELECT_VALUE_ACCESSOR] 
})
export class LblSelectComponent extends AbstractValueAccessor implements OnInit, IControl {

    /**OUTPUT */
    //@Output() onSelectChange = new EventEmitter<any>();
    @Output() onInit = new EventEmitter<any>();
    @Output() onChangeComponent = new EventEmitter<any>();
    /**INPUT */
    @Input() parentGroup: FormGroup;
    @Input() validators: ValidatorFn[];

    @Input() labelText:string;
    @Input() required:boolean;
    @Input() name:string;
    @Input() validate:boolean;
    @Input() selectText:string;
    @Input() id:number;
    @Input() disableControl:boolean;
    @Input() disabled:boolean;
    @Input() data:string[];
    @Input() defaultEnabled:boolean;

    @Input() allData: any; // --> Cuando se crea este componente dinamicamente toda la info viene en esta property
 
    constructor() {
        super();
    }

    ngOnInit() {
        // this.validate = false;

        if(this.allData !== undefined) {
            this.data = this.allData.datos;
            this.labelText = this.allData.descripcion;
            this.required = this.allData.requerido;
            this.selectText = 'Seleccionar';
            this.id = this.allData.id;
            // this.disableControl = false;
            this.defaultEnabled = false;
        }
    }

    onInitEvent() {
        this.onInit.emit();
    }

    private set selected(value: string) {
        this.onChangeComponent.emit(value);
    }

    onItemChange(ev) {
        this.onChangeComponent.emit(ev);
    }
}
