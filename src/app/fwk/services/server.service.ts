import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Login } from '../models/login.model';
import { ToastModel } from '../models/toast.model';
import { ToastService } from './toaster.service';
import { ResponseContentType } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ServerService {
     // Resolve HTTP using the constructor
     private _login:Login = new Login();
     private _param: ToastModel= new ToastModel();

     constructor (private _http: Http,
                private toasterService: ToastService) { }


     _post(metodo:string, array:any) {
        let headers = new Headers();
        let body = JSON.stringify(array);

        const result$ = this._http.post(metodo,body,{headers:headers})
        .map((res:Response) => this.catchResponse(res, res.json()))
        .catch(this.handleError);

        return result$;
     }

     _postFiles(metodo:string, array:any) {
        let headers = new Headers();
        let body = JSON.stringify(array);

        return this._http.post(metodo, body,{
            headers: headers,
            responseType: ResponseContentType.Blob
        }).map((res:Response) => this.catchResponse(res, res,'excel'))
        .catch(this.handleError);
    }

    public handleError(error: Response) {
        return Observable.throw('Server error');
    }

    catchResponse(response,data, type?) {
        if (response.status === 202 ) {
            if(type === 'excel') {
                var decodedString = String.fromCharCode.apply(null, new Uint8Array(data));
                data = JSON.parse(decodedString);
            }
            console.error('Error Capturado api 1: '+response.status);
            if (data.id !== undefined) {
                this._param.title = 'Codigo '+data.tipoError+' ID: '+data.id;
            }
            console.log(data);
            this._param.msg = data.mensaje;
            this._param.type = data.tipoError.toLowerCase();
            this.toasterService._show(this._param,false);
            return data;
        }else if (response.status !== 200) {
            console.error('Error Capturado api 2: '+response.status);
            this._param.title = 'Error General';
            this._param.msg = 'Error al conectar con Servicio. Código:' +response.status;
            this._param.type = 'error';
            this.toasterService._show(this._param,true);
            return data;
        }else {
            if(type === 'excel') {
               data = new Blob([data._body],{ type: 'application/vnd.ms-excel' });
            }
            return data;
        }
     }

     _getLogin(metodo:string) {

        let _self = new URLSearchParams();
        _self.set('ip', '10.0.0.2');

        let options = new RequestOptions({method: 'GET', withCredentials: true, params:_self });

        const auth$ = this._http.get(metodo, options)
            .map((res:Response) => res.json());

        auth$.subscribe(data => this._saveJwt(data), () => {
            //
        });

        return auth$;
     }

     _saveJwt(user:any) {
        this._login=user;
        let token = localStorage.setItem('token',user.token);
     }

    getToken():any {
        return this._login.token;
    }
    getAutenticado():any {
        return this._login.autenticado;
    }

    getParameters(querystring) {
        // remove any preceding url and split
        querystring = querystring.substring(querystring.indexOf('?')+1).split('&');
        var params = {}, pair, d = decodeURIComponent;
        // march and parse
        for (var i = querystring.length - 1; i >= 0; i--) {
            pair = querystring[i].split('=');
            params[d(pair[0])] = d(pair[1] || '');
        }

        return params;
    }
}
