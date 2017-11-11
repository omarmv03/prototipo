import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import {AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef} from "../../helpers/abstractvalue.accessor";


export const CUSTOM_CHECKBOX_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxOpControlComponent),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'checkboxOpControl-controller',
  templateUrl: 'checkboxOpControl.component.html'
})

export class CheckboxOpControlComponent extends AbstractValueAccessor implements OnInit{

    /**OUTPUT */
    @Output() onInit = new EventEmitter<any>();
    /**INPUT */
    @Input() id:number;
    @Input() deshabilitado:boolean;
    @Input() listaopciones:string[];

    valueCheck:boolean;

    constructor() {
        super();
    }

    ngOnInit() {
    }

    onInitEvent(){
        this.onInit.emit();
    }
    
    actualizarOpciones = function(posicion:number) {
        this.listaopciones.forEach(function(opcion:any, index:number) {
            if (posicion != index) {
                opcion.checked = false;
            }else{
                this.listaopciones[index].valor = opcion.valor;
            }
        });
    }
}