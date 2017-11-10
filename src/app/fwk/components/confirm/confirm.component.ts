import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'confirm-component',
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.component.scss']
})

export class ConfirmComponent implements OnInit {

    /**OUTPUT */
    @Output() onConfirmar = new EventEmitter<any>();
    @Output() onVolver = new EventEmitter<any>();
    @Output() onGuardar = new EventEmitter<any>();
    /**INPUT */
    @Input() _textBack:string;
    @Input() _textConfirm:string;
    @Input() _textSave:string;
    @Input() _backDisabled:boolean;
    @Input() _confirmDisabled:boolean;
    @Input() _saveDisabled:boolean;

    init:boolean;

    constructor() {
        //
    }

    ngOnInit() {
        this.init = true;
    }

    confirmarPropuesta() {
        this.onConfirmar.emit();
    }

    volver() {
        this.onVolver.emit();
    }

    guardarPropuesta() {
        this.onGuardar.emit();
    }

    getClass() {
        if (!this._textBack && this._textConfirm && this._textSave) {
            return 'col-sm-2';
        }else {
            return 'col-sm-4';
        }
    }
}
