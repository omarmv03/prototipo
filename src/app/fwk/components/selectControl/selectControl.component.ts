import { Component, OnInit,Output,EventEmitter,Input, ChangeDetectorRef, AfterContentInit, OnChanges } from '@angular/core';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';

export const CUSTOM_SELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectControlComponent),
    multi: true
};

@Component({
    moduleId: module.id,
    selector: 'selects-control',
    templateUrl: 'selectControl.component.html',
    styleUrls: ['selectControl.component.scss'],
    providers: [CUSTOM_SELECT_VALUE_ACCESSOR]
})

export class SelectControlComponent extends AbstractValueAccessor implements OnInit, OnChanges {

    /**OUTPUT */
    @Output() onInit = new EventEmitter<any>();
    @Output() onItemChange = new EventEmitter<any>();
    @Output() onBlur = new EventEmitter<any>();


    /**INPUT */
    @Input() parentGroup: FormGroup;
    @Input() validators: ValidatorFn[];

    @Input() id: string;
    @Input() required:boolean;
    @Input() name:string;
    @Input() validate:boolean;
    @Input() placeholder:string;
    @Input() disableControl:boolean;
    @Input() selectText:string;
    @Input() data:string[];
    @Input() defaultEnabled:boolean;

    requiredControl: Boolean; 

    constructor() {
        super();
    }

    ngOnInit() {
        if(!this.selectText) {
            this.selectText =  'Seleccione una opción';
        }

        var isNotValid = !this.data;
        if(!isNotValid &&
            this.data.length === 1 &&
            !this.defaultEnabled) {
                this.value = this.data[0];
            }
    }

    ngOnChanges(changes) {
        if(changes && changes.required && changes.required.currentValue !== undefined) {
            this.requiredControl = changes.required.currentValue;
        }
    }

    onInitEvent() {
        this.onInit.emit();
    }

    onItemChanges(val) {
        this.onItemChange.emit(val);
    } 

    onTouched(){
        this.onBlur.emit();
        this._onTouchedCallback(null);
    }
}
