import { Component, OnInit,Output,EventEmitter,Input  } from '@angular/core';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';

export const CUSTOM_TEXTAREA_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextAreaControlComponent),
    multi: true
  };

@Component({
  moduleId: module.id,
  selector: 'txtarea-control',
  templateUrl: './textareaControl.component.html',
  providers: [CUSTOM_TEXTAREA_VALUE_ACCESSOR],
})

export class TextAreaControlComponent extends AbstractValueAccessor {

    /**INPUT */
    @Input() parentGroup: FormGroup;

    @Input() validate:boolean;
    @Input() placeholder:string;
    @Input() id:string;
    @Input() disabled:boolean;
    @Input() maxLength:number;
    @Input() style:Object;
    @Input() required:boolean;

    /**OUTPUT */
    @Output() onChangeComponent = new EventEmitter<any>();

    requiredControl: Boolean;
}
