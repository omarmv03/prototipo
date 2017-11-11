import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { IControl } from '../../models/control';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';

export const CUSTOM_LBLINPUTSTRING_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LabelInputStringControlComponent),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'lbl-input-string',
  templateUrl: './lblInput.string.control.html',
  providers: [CUSTOM_LBLINPUTSTRING_VALUE_ACCESSOR]
})
export class LabelInputStringControlComponent extends AbstractValueAccessor implements OnInit, IControl {
    // --> Inputs
    @Input() parentGroup: FormGroup;

    @Input() id: string;
    @Input() required: boolean;
    @Input() disabled: boolean;
    @Input() disableControl: boolean;
    @Input() maxLength: number;
    @Input() labelText: string;
    @Input() directives: string;
    @Input() leyend: string;
    @Input() hasLeyend: boolean;
    @Input() customValidationCondition: boolean;
    @Input() customValidationMessage: string;
    @Input() validate: boolean;

    @Input() placeholder: string;

    @Input() allData: any; // --> Cuando se crea este componente dinamicamente toda la info viene en esta property

    // --> Outputs
    @Output() onBlur = new EventEmitter<any>();
    @Output() onEnter = new EventEmitter<any>();
    @Output() onChangeComponent = new EventEmitter<any>();

    constructor() {
        super();
    }

    ngOnInit() {
        this.validate = false;

        // --> this.allData viene siempre lleno cuando es un control dinamico
        if(this.allData !== undefined) {
            this.labelText = this.allData.descripcion;
            this.required = this.allData.requerido;
            this.id = this.allData.id;
            this.disabled = false;
            if(this.allData.longitudMaxima)  this.maxLength = this.allData.longitudMaxima;
        }


    }

    onBlurEvent (value: string) {
        this.onBlur.emit({value: value});
    }

    onEnterEvent (value: string) {
        this.onEnter.emit({value: value});
    }

    onChangeInput(value) {
        this.onChangeComponent.emit(value);
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