import { Component, OnInit,Output,EventEmitter,Input,forwardRef } from '@angular/core';
import { IControl } from '../../models/control';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'lbl-checkbox',
  templateUrl: 'lblCheckbox.component.html'
})
export class LblCheckboxComponent implements OnInit, IControl {

    /**OUTPUT */
    //@Output() onSelectedChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() onChangeComponent: EventEmitter<any> = new EventEmitter<any>();
    /**INPUT */
    @Input() parentGroup: FormGroup;
    @Input() validators: Array<Validators>;

    @Input() id:number;
    @Input() disabled:boolean;
    @Input() required:boolean;
    @Input() labelText:string;
    @Input() list:any;

    @Input() allData: any; // --> Cuando se crea este componente dinamicamente toda la info viene en esta property

    constructor() {}

    ngOnInit() {
        if(this.allData != undefined){
            this.labelText = this.allData.descripcion;
            this.required = this.allData.requerido;
            this.id = this.allData.id;
            this.disabled = false;
        }
    }

    private set selected(value: boolean) {
        console.log('selected');
        this.onChangeComponent.emit({
            selected: value
        });
    }
}
