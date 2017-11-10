import { Component, OnInit,Output,EventEmitter,Input,AfterViewInit } from '@angular/core';
import { GridColumnsConfig } from '../../models/grilla.model';

@Component({
  moduleId: module.id,
  selector: 'drop-down',
  templateUrl: 'dropDown.component.html',
  styleUrls: ['dropDown.component.scss']
})

export class DropDownComponent  implements OnInit {
    /**OUTPUT */
    @Output() onCambioSelect = new EventEmitter<any>();
    /**INPUT */
    @Input() iconClass:string;
    @Input() options:Array<GridColumnsConfig>;
    @Input('items') items:Array<any>;

    open:boolean = false;

    constructor() {
        //
    }

    ngOnInit() {
        if(!this.iconClass) {
            this.iconClass = 'caret';
        }
        if(!this.items) {
            this.items = [];
        }
    }

    openDropdown() {
        this.open = !this.open;
    }

    selectAll() {
        this.items = [];
        this.options.forEach((item: GridColumnsConfig) => { // foreach statement
            this.items.push(item.name);
        });
        this.onCambioSelect.emit(this.items);
    }

    deselectAll() {
        this.items = [];
        this.onCambioSelect.emit(this.items);
    }

    getClassName (option: GridColumnsConfig) {
        var varClassName = 'fa fa-times';
        this.items.forEach((item:any) => { // foreach statement
            if (item === option.name) {
                varClassName = 'fa fa-check';
            }
        });
        return (varClassName);
    }

    toggleSelectItem(option: GridColumnsConfig) {
        var intIndex = -1;

        this.items.forEach((item:any, index) => { // foreach statement
            if (item === option.name) {
                intIndex = index;
            }
        });

        if (intIndex >= 0) {
            this.items.splice(intIndex, 1);
        } else {
            this.items.push(option.name);
        }

        this.onCambioSelect.emit(this.items);
    }
}
