import { Injectable }     from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { ToastModel } from '../models/toast.model';
import { ToasterContainerComponent, ToasterService, ToasterConfig } from 'angular2-toaster';
import { BodyOutputType, Toast } from 'angular2-toaster';


@Injectable()
export class ToastService {

    toast : Toast ;

    public toasterconfig : ToasterConfig =
    new ToasterConfig({
        showCloseButton: true,
        tapToDismiss: false,
        timeout: 20000,
        positionClass: 'toast-bottom-right',
    });

    // Resolve HTTP using the constructor
    constructor (private _toasterService: ToasterService) {
     }


    _show(param,exit) {

        this.toast = {
            type: param.type,
            title: param.title,
            body: param.msg,
            onShowCallback: (toast) => this.log(exit)
        };

        switch (param.type) {
            case 'success':
                this._toasterService.pop(this.toast);
                break;
            case 'info':
                this._toasterService.pop(this.toast);
                break;
            case 'warning':
                this._toasterService.pop(this.toast);
                break;
            case 'error':
                this._toasterService.pop(this.toast);
                break;
        }
    }
    log(pExit) {
        console.log(pExit);
    }
}
