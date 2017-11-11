import { ServerService } from './server.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';

@Injectable()
export class ContratanteService {

    private client:ClientModel = null;
    private userObservable: Subject<ClientModel>;

    constructor(private httpService: ServerService) {
        this.userObservable = new BehaviorSubject<ClientModel>(this.client);
    }

    getContratante(rut) {

        this.httpService._post('/Genericos.svc/rest/BuscarCliente' , {documento:rut.toUpperCase()})
        .subscribe(data => {
            if (data && !data.resultadoOK) {
                this.client = data;
                this.userObservable.next(data);
            }
        });

        //return result;

        return this.userObservable;
    }

    catchResponse(response) {
        this.client = response;
    }

    set setUser(value: ClientModel) {
        this.client = value;
    }

    get getUsers(): ClientModel {
        return this.client;
    }

    getUser(): Observable<ClientModel> {
        return this.userObservable.asObservable();
    }
}
