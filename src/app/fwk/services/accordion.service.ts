import { Injectable }     from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { AccordionModel } from '../models/accordion.model';

@Injectable()
export class AccordionService {

    inicializado:boolean=false;
    acordeonesPorFuncionalidadMap:{};
    acordeonesIdMap:Array<any>=[];

    constructor () {
        if(this.inicializado === false) {
            this.inicializar();
        }
     }

     inicializar() {
        this.limpiar();
     }

     //Definicion de funcion
     limpiar() {
         this.acordeonesPorFuncionalidadMap = {emision:[{nombre:'datos_cliente',acordeones:[]},
                                                        {nombre:'datos_generales',acordeones:[]},
                                                        {nombre:'contratante_pago',acordeones:[]},
                                                        {nombre:'cuotificacion',acordeones:[]},
                                                        {nombre:'cobertura_obl',acordeones:[]},
                                                        {nombre:'cobertura_ad',acordeones:[]},
                                                        {nombre:'datos_del_automotor',acordeones:[]},
                                                        {nombre:'datos_del_inmueble',acordeones:[]},
                                                        {nombre:'asegurados',acordeones:[]},
                                                        {nombre:'beneficiarios',acordeones:[]},
                                                        {nombre:'datos_libres_por_producto',acordeones:[]},
                                                        {nombre:'bloques_libres',acordeones:[]},
                                                        {nombre:'notas',acordeones:[]}],

                                               prevpolizas:[{nombre:'datos_cliente',acordeones:[]},
                                                            {nombre:'datos_generales',acordeones:[]},
                                                            {nombre:'contratante_pago',acordeones:[]},
                                                            {nombre:'cuotificacion',acordeones:[]},
                                                            {nombre:'cobertura_obl',acordeones:[]},
                                                            {nombre:'cobertura_ad',acordeones:[]},
                                                            {nombre:'datos_del_automotor',acordeones:[]},
                                                            {nombre:'datos_del_inmueble',acordeones:[]},
                                                            {nombre:'asegurados',acordeones:[]},
                                                            {nombre:'beneficiarios',acordeones:[]},
                                                            {nombre:'bloques_libres',acordeones:[]},
                                                            {nombre:'notas',acordeones:[]}]
                                            };

        // this.acordeonesIdMap = new Object();
     }

     getSubfuncionalidad(funcionalidad,nombre) {
        var subfuncionalidad;
        if(funcionalidad) {
            var subfuncionalidades = this.acordeonesPorFuncionalidadMap[funcionalidad];
            var i = 0;

            while(i < subfuncionalidades.length && subfuncionalidad === undefined) {
                subfuncionalidad = subfuncionalidades[i];
                if( subfuncionalidad.nombre !== nombre) {
                    subfuncionalidad = undefined;
                }
                i++;
            }

            if(subfuncionalidad === undefined) {
                console.error('No se encontro una subfuncionalidad para la funcionalidad:' + funcionalidad);
            }
        }else {
            console.error('No se ingreso un nombre para identificar la subfuncionalidad.');
        }

        return subfuncionalidad;
    }

    getAcordeon(id,funcionalidad,subfuncionalidad,idAcordeon) {
        if(idAcordeon === undefined) {

            console.error('No se ingreso un id acordeon para identificar el acordeon de una funcionalidad.');
        }else {
            if(funcionalidad && subfuncionalidad) {

                var subfuncionalidad = this.getSubfuncionalidad(funcionalidad,subfuncionalidad);
                if(subfuncionalidad.acordeones === undefined || subfuncionalidad.acordeones.length === 0) {
                    console.error('No se cargaron acordeones para la funcionalidad:' + funcionalidad +
                                  'subfuncionalidad:' + subfuncionalidad);
                    return {};
                }
                return subfuncionalidad.acordeones[idAcordeon];
            }else if(id) {
                return this.acordeonesIdMap[id][idAcordeon];
            }else {
                console.error('No se ingreso un id o funcionalidad para identificar un acordeon');
            }
        }
    }

    agregarAcordeonAFuncionalidad(funcionalidad,nombre,abierto) {
        var acordeon;
        var subfuncionalidad = this.getSubfuncionalidad(funcionalidad,nombre);
        var fakeId = subfuncionalidad.acordeones.length;
        acordeon = {id:fakeId,abierto:abierto};
        subfuncionalidad.acordeones[fakeId] = acordeon;
        return acordeon;
    }

    abrir(id,funcionalidad,nombre,idAcordeon) {
        var acordeon;
        if(acordeon = this.getAcordeon(id,funcionalidad,nombre,idAcordeon)) {
            acordeon.abierto = true;
        }
    }

    cerrar(id,funcionalidad,nombre,idAcordeon) {
        var acordeon;
        if(acordeon = this.getAcordeon(id,funcionalidad,nombre,idAcordeon)) {
            acordeon.abierto = false;
        }
    }

    abrirCerrar(ctrlAcordeon) {
        if(ctrlAcordeon.estado.id === undefined) {

            console.error('No se ingreso un id acordeon para identificar el acordeon de una funcionalidad.');
        }else if(ctrlAcordeon.funcionalidad && ctrlAcordeon.subfuncionalidad) {
            var subfuncionalidades = this.acordeonesPorFuncionalidadMap[ctrlAcordeon.funcionalidad];
            var cerrarConsecutivos = false;

            //this.columnas.forEach((columna:any) => { // foreach statement
            subfuncionalidades.forEach((subfuncionalidad:any, i) => {
                if(cerrarConsecutivos && subfuncionalidad.acordeones && subfuncionalidad.acordeones.length > 0) {
                    subfuncionalidad.acordeones.forEach((acordeon, j) => {
                        acordeon.abierto = false;
                    });
                }else if( subfuncionalidad.nombre === ctrlAcordeon.subfuncionalidad) {
                    if(subfuncionalidad.acordeones[ctrlAcordeon.estado.id].abierto =
                         !subfuncionalidad.acordeones[ctrlAcordeon.estado.id].abierto) {
                        cerrarConsecutivos = true;
                        var restoAcordeones = subfuncionalidad.acordeones.slice(ctrlAcordeon.estado.id + 1);
                        for(var k = 0; k < restoAcordeones.length;k++) {
                            restoAcordeones[k].abierto = false;
                        }
                    }
                }
            });
        }else if(ctrlAcordeon.id) {

            this.acordeonesIdMap[ctrlAcordeon.id][ctrlAcordeon.estado.id].abierto =
            !this.acordeonesIdMap[ctrlAcordeon.id][ctrlAcordeon.estado.id].abierto;
        }else {
            console.error('No se ingreso un id o funcionalidad para identificar el acordeon.');
        }
    }

    estaAbierto(id,funcionalidad,nombre,idAcordeon) {
        return this.getAcordeon(id,funcionalidad,nombre,idAcordeon).abierto;
    }

    //Agrega el acordeon y dar un objeto control para el mismo.
    agregar(id, funcionalidad,nombre,abierto) {

        if(abierto === undefined) {
            abierto = false;
        }
        var acordeon;
        if(funcionalidad in this.acordeonesPorFuncionalidadMap && nombre) {
            acordeon = this.agregarAcordeonAFuncionalidad(funcionalidad,nombre,abierto);
        }else if(funcionalidad && nombre) {
            this.acordeonesPorFuncionalidadMap[funcionalidad] = [];
            acordeon = this.agregarAcordeonAFuncionalidad(funcionalidad,nombre,abierto);
        }else if(id) {
            var idNuevoAcordeon = 0;
            if(id in this.acordeonesIdMap) {
                idNuevoAcordeon = this.acordeonesIdMap[id].length;
            }else {
                this.acordeonesIdMap[id] = [];
            }
            acordeon = {id:idNuevoAcordeon,abierto:abierto};
            this.acordeonesIdMap[id][idNuevoAcordeon] = acordeon;
        }else {
            console.error('No se ingreso un id o nombre para identificar el acordeon.');
        }

        //De esta forma encapsulo el uso del acordeon, proveo un control para manejar el acordeon individualmente.
        var controlAcordeon = new AccordionModel();
        controlAcordeon.funcionalidad = funcionalidad;
        controlAcordeon.subfuncionalidad = nombre;
        controlAcordeon.estado = acordeon;
        controlAcordeon.id = id;
        /*controlAcordeon.abrirCerrarOtros(){
            this.abrirCerrar(controlAcordeon.id,controlAcordeon.funcionalidad,controlAcordeon.subfuncionalidad,controlAcordeon.estado.id);
        }
        controlAcordeon.abrir = function(){
            this.abrir(controlAcordeon.id,controlAcordeon.funcionalidad,controlAcordeon.subfuncionalidad,controlAcordeon.estado.id);
        }
        controlAcordeon.cerrar = function(){
            this.cerrar(controlAcordeon.id,controlAcordeon.funcionalidad,controlAcordeon.subfuncionalidad,controlAcordeon.estado.id);
        }*/
        return controlAcordeon;
    }
}
