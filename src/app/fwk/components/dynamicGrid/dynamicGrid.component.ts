import { Component, OnInit,Output,EventEmitter,Input, Renderer2, ElementRef } from '@angular/core';
import { GrillaModel, GridColumnsConfig } from '../../models/grilla.model';
import { ToastModel } from '../../models/toast.model';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
declare var $;

@Component({
  moduleId: module.id,
  selector: 'dynamic-grid',
  templateUrl: 'dynamicGrid.component.html',
  styleUrls: ['dynamicGrid.component.scss']
})

export class DinamicGridComponent  implements OnInit {
    /**OUTPUT */
    @Output() onCellClick = new EventEmitter<any>();
    @Output() onCambioFiltro = new EventEmitter<any>();
    @Output() onCambioOrden = new EventEmitter<any>();
    @Output() onCambioRegistrosPorPagina = new EventEmitter<any>();
    @Output() onCambioPaginacion = new EventEmitter<any>();
    @Output() onGridChange = new EventEmitter<any>();
    @Output() onSelectRow = new EventEmitter<any>();
    /**INPUT */
    @Input() filas:string[];
    @Input() validar:boolean;
    @Input() config: GrillaModel;
    @Input() headerVisible:boolean;

    registroHasta:number;
    selectForm: FormGroup;

    // -----> Resize columns
    start:any;
    pressed:any;
    startX:any;
    startWidth:any;
    disableDrag: Boolean = false;
    // ----------------------

    constructor(private fb: FormBuilder, public renderer: Renderer2, private elem: ElementRef) {
        //
    }

    ngOnInit() {
        this.setearRegistrosHasta();

        $('.grilla-dinamica').on('scroll', function() {
            $('.grilla-dinamica > *').width($('.grilla-dinamica').width() + $('.grilla-dinamica').scrollLeft());
          });
        this.headerVisible = false;
        this.config.columns.forEach((element:any) => {
            if(element.visible) {
                this.headerVisible = true;
            }
        });

        if (this.config.dataConfig.paging && this.config.dataConfig.paging.cantidadAMostrar) {
            this.selectForm = this.fb.group({
                selectControl: [this.config.dataConfig.paging.cantidadAMostrar]
            });
        }
    }

    onCambioFiltroEvent(pValue: GridColumnsConfig) {

        if(pValue.name && pValue.filter.value) {
            this.config.dataConfig.filter[pValue.name]= pValue.filter.value;
        }else {
            var nombre = pValue.name;
            delete this.config.dataConfig.filter[nombre];
        }

        this.onGridChange.emit(this.config.dataConfig);
        this.onCambioFiltro.emit();
    }

    onCambioOrdenEvent(ev, pValue) {
        var count = 0;
        if (this.config.dataConfig.order) {
            this.config.dataConfig.order.forEach((element:any) => { // foreach statement
                if (element.columna === pValue) {
                    element.asc=!element.asc;

                    if (element.asc) {
                        let index: number = this.config.dataConfig.order.indexOf(element);
                        this.config.dataConfig.order.splice(index, 1);
                    }
                    count++;
                }
            });

            if  (count === 0 && pValue !== undefined) this.config.dataConfig.order.push({columna:pValue,asc:true, posicion: 1});

            this.onGridChange.emit(this.config.dataConfig);
            this.onCambioOrden.emit();
        }
    }

    cambioRegistrosPorPagina() {
        this.config.dataConfig.paging.cantidadAMostrar = this.selectForm.controls.selectControl.value;
        this.config.dataConfig.paging.paginaActual = 1;
        this.setearRegistrosHasta();
        this.onGridChange.emit(this.config.dataConfig);
        this.onCambioRegistrosPorPagina.emit();
    }

    cambioPaginacion(ev) {
        this.setearRegistrosHasta();
        this.onGridChange.emit(this.config.dataConfig);
        this.onCambioPaginacion.emit(ev);
    }

    onCambioColumnasVisibles(columnasHabilitadas) {
        this.headerVisible = false;
        this.config.columns.forEach((columna:any) => { // foreach statement
            columna.visible = false;
            columnasHabilitadas.forEach((columaHabilitada:any) => { // foreach statement
                if(columna.name === columaHabilitada) {
                    columna.visible = true;
                    this.headerVisible = true;
                }
            });
        });
    }

    setearRegistrosHasta() {
        if (this.config.dataConfig.paging) {
            this.registroHasta = this.config.dataConfig.paging.cantidadAMostrar > this.config.dataConfig.paging.totalRegistros
                                ? this.config.dataConfig.paging.totalRegistros: this.config.dataConfig.paging.cantidadAMostrar
                                * this.config.dataConfig.paging.paginaActual ;
        }
    }

    selectRow(row) {
        this.onSelectRow.emit(row);
    }

    onColumnSortChange(data: any) {
        this.config.columns = this.swapColumns(this.config.columns, data.from.colIndex, data.to.colIndex);
    }

    swapColumns(columns:any, indexCol1:any, indexCol2:any) : any {
        var temp = columns[indexCol1];
        columns[indexCol1] = columns[indexCol2];
        columns[indexCol2] = temp;
        return columns;
    }

    onMouseDown(event) {
        if (this.config.resize) {
            event.preventDefault();
            this.disableDrag = true;
            this.start = event.target;
            this.pressed = true;
            this.startX = event.clientX;
            this.startWidth = $(this.start).parent().outerWidth();
            window.getSelection().removeAllRanges();
            this.initResizableColumns();
        }
    }

    initResizableColumns() {
        this.renderer.listen('body', 'mousemove', (event) => {
           if(this.pressed) {
                event.preventDefault();
                let width = this.startWidth + (event.clientX - this.startX);
                $(this.start).parent().css({'min-width': width, 'max-   width': width});
                let index = $(this.start).parent().index() + 1;
                $('.grilla-dinamica tbody tr td:nth-child(' + index + ')').css({'width': width,'min-width': width});
                $('.grilla-dinamica thead tr th:nth-child(' + index + ')').css({'width': width,'max-width': width});
                $('.grilla-dinamica .filtros:nth-child(' + index + ')').css({'width': width,'min-width': width,'max-width': width});
           }
        });
        this.renderer.listen('body', 'mouseup', (event) => {
        if(this.pressed) {
            let index = $(this.start).parent().index();
            let width = this.startWidth + (event.clientX - this.startX);
            this.pressed = false;
            this.disableDrag = false;
            this.config.columns[index].css = {'width': width+'px','min-width': width+'px','max-width': width+'px'};
        }
      });
   }
}
