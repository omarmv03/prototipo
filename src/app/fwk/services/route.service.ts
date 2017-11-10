import { Injectable }     from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { SharedService } from './shared.service';

@Injectable()
export class RouteService {

    translations:any;
    path:string='';
    rutaActual:string='';
    mapeoRutas= [   {path:'/altapropuestas',
                        key:'blTablero_lblRutaPersistencia',
                        defaultLeyenda:'Propuestas / Alta de Propuestas',
                        angular4:false},
                    {path:'/consultapropuestas',
                        key:'blConsultaPropuesta_lblRutaPersistencia',
                        defaultLeyenda:'Propuestas / Consultas',
                        angular4:false},
                    {path:'/prevpolizas',
                        key:'blVisualizarPolizas_lblRutaPersistencia',
                        defaultLeyenda:'Propuestas / Consultas',
                        angular4:false},
                    {path:'/consultaplanes',
                        key:'blConsultaPlanes_lblRutaPersistencia',
                        defaultLeyenda:'Taller de Productos / Planes',
                        angular4:false},
                    {path:'/planes',
                        key:'blPlanes_lblRutaPersistencia',
                        defaultLeyenda:'Taller de Productos / Planes',
                        angular4:false},
                    {path:'/consultapropuestasptes',
                        key:'blConsultaPropuesta_lblRutaPersistencia',
                        defaultLeyenda:'Propuestas / Propuestas Pendientes',
                        angular4:false},
                    {path:'/emision',
                        key:'blEmision_lblRutaPersistencia',
                        defaultLeyenda:'Propuestas / Alta de propuestas',
                        angular4:false},
                    {path:'#/altaproducto',
                        key:'blAltaProducto_lblRutaPersistencia',
                        defaultLeyenda:'Taller de Productos / Producto',
                        angular4:true},
                    {path:'#/consultaproductos',
                        key:'blConsultaProductos_lblRutaPersistencia',
                        defaultLeyenda:'Taller de Productos / Productos',
                        angular4:true},
                    {path:'/consultapropuestasautorizar',
                        key:'blAutorizarPolizas_lblRutaPersistencia',
                        defaultLeyenda:'Propuestas / Autorización',
                        angular4:false}
                    ];

    constructor (public _SharedService: SharedService) {
        //
    }

    getMapeoPorPath(path,mapeoRutas) {
        var mapping = undefined;
        var submapping = undefined;
        var i = 0;
        while(mapping === undefined && i < mapeoRutas.length) {
            submapping = mapeoRutas[i++];
            if(submapping.path === path) {
                mapping = submapping;
            }
        }
        return mapping;
    }

    getRutaActual() {
        var pathActual = window.location.hash;
        //this._SharedService.setSubheader(false);
        if(this.path === pathActual) {
            return this.rutaActual;
        }
        this.path = pathActual;
        var mapeo = this.getMapeoPorPath(this.path,this.mapeoRutas);
        if(mapeo === undefined) {
            this.rutaActual = '';
            this._SharedService.setSubheader(false);
        }else {
            var value =  this.translations.instant(mapeo.key);
            if (value === mapeo.key) {
                this.rutaActual = mapeo.defaultLeyenda;
                this._SharedService.setSubheader(mapeo.angular4);
            }else {
                this.rutaActual = value;
                this._SharedService.setSubheader(mapeo.angular4);
            }
        }
        return this.rutaActual;
    }
}
