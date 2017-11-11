import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { IControl } from '../../models/control';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';

export const CUSTOM_LBLINPUTDECIMAL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LabelInputDecimalControl),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'lbl-input-decimal',
  templateUrl: './lblInput.decimal.control.html',
  providers: [CUSTOM_LBLINPUTDECIMAL_VALUE_ACCESSOR]
})
export class LabelInputDecimalControl extends AbstractValueAccessor implements OnInit, IControl{     
    // --> Inputs
    @Input() parentGroup: FormGroup;
    @Input() validators: Array<Validators>;

    @Input() allData: any; // --> Cuando se crea este componente dinamicamente toda la info viene en esta property

    @Input() id: boolean;
    @Input() required: boolean;
    @Input() disabled: boolean;
    @Input() labelText: string;
    @Input() max: number;
    @Input() min: number;
    @Input() directives: string;
    @Input() leyend: string;
    @Input() hasLeyend: boolean;
    @Input() customValidationCondition: boolean;
    @Input() customValidationMessage: string;
    @Input() validate: boolean;
    @Input() initialInputValue: boolean;

    // --> Outputs
    @Output() onBlur = new EventEmitter<any>();
    @Output() onEnter = new EventEmitter<any>();
    @Output() onChangeComponent = new EventEmitter<string>();
    
    constructor() {
        super()
    }
    
    ngOnInit() {
        this.validate = false;

        // --> this.allData viene siempre lleno cuando es un control dinamico
        if(this.allData != undefined){
            this.labelText = this.allData.descripcion;
            this.required = this.allData.requerido;
            this.id = this.allData.id;
            this.disabled = false;
            if(this.allData.maximo)  this.max = this.allData.maximo;
            if(this.allData.minimo)  this.min = this.allData.minimo;
        }
    }

    onBlurEvent (value: string){
        this.onBlur.emit({value: value});
    }

    onEnterEvent (value: string){
        this.onEnter.emit({value: value});
    }
}

// // import { AboutComponent } from './about.component';
// // import  * as angular from 'angular';
// import { downgradeComponent } from '@angular/upgrade/static';

// export default angular.module('isolApp.directives')
//   .directive(
//     'sdAbout',
//     downgradeComponent({ component: AboutComponent }) as angular.IDirectiveFactory
//   );


  
   
  