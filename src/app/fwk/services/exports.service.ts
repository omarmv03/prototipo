import { ServerService } from './server.service';
import { ServiceBase } from './service.base';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ExportModel } from '../models/export.model';

@Injectable()
export class ExportService extends ServiceBase {
    constructor(private httpService: ServerService) {
        super();
    }

    exportXLSProducts(self: ExportModel) {
        var model = new ExportModel();
        var result;

        model.titulo = self.titulo;
        model.columnasVisibles= self.columnasVisibles;
        model.filtros = self.filtros;
        model.orden = self.orden;
        //model.nombreArchivo = self.nombreArchivo;

        this.httpService._post('/Productos.svc/rest/ExportarProductosXLS' , model)
        .subscribe(data => {

            var fileName = data;

            this.httpService._postFiles('/Genericos.svc/rest/ObtenerArchivoVisor' , {'nombre':fileName})
            .subscribe(data => {
                var ieEDGE = navigator.userAgent.match(/Edge/g);
                var ie = navigator.userAgent.match(/.NET/g); // IE 11+
                var oldIE = navigator.userAgent.match(/MSIE/g);
                var name = 'file';
                var blob = new window.Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

                if (ie || oldIE || ieEDGE) {
                    //var fileName = model.nombreArchivo +'.xlsx';
                    window.navigator.msSaveBlob(blob, fileName);
                } else {
                    var file = new Blob([ data ], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                    var fileURL = URL.createObjectURL(file);
                    var a         = document.createElement('a');
                    a.href        = fileURL;
                    a.target      = '_blank';
                    //a.download    = model.nombreArchivo +'.xlsx';
                    a.download    = fileName;
                    document.body.appendChild(a);
                    a.click();
                }
            });
           // return result;
        });

        }
}
