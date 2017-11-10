import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from "../../helpers/abstractvalue.accessor";


export const CUSTOM_CHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxControlComponent),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'checkboxControl-controller',
  templateUrl: 'checkboxControl.component.html',
  //styles: ['checkboxControl.component.css'],
  styleUrls: ['checkboxControl.component.scss'],
  providers: [CUSTOM_CHECKBOX_VALUE_ACCESSOR],
})

export class CheckboxControlComponent  extends AbstractValueAccessor implements OnInit{
    /**OUTPUT */
    @Output() onInit = new EventEmitter<any>();
    /**INPUT */
    @Input() id:number;
    @Input() deshabilitado:boolean;

    constructor() {
        super();
        this.value = false;
    }

    ngOnInit() {
    }

    onInitEvent(){
        this.onInit.emit();
    }
}