import { Injectable }     from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { AccordionModel } from '../models/accordion.model';

@Injectable()
export class FormService {

    private _presentarErrores:boolean;

    constructor () {
        this._presentarErrores=false;
    }

    get presentarErrores(): boolean {
        return this._presentarErrores;
    }

    set presentarErrores(flag: boolean) {
        this._presentarErrores=flag;
    }
}
