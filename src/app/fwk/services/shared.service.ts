import { Injectable }     from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class SharedService {

    private subheader:boolean=false;

    constructor () {
        //
     }

    /**Set and Get para SubHeader de Angular 4*/
    getSubheader():boolean {
        return this.subheader;
    }

    setSubheader(val) {
        this.subheader = val;
    }

    FormaterDate() {
        var d = new Date();
        var fecha = (d.getFullYear() +
                        ('00' + (d.getMonth() + 1)).slice(-2) +
                        ('00' + d.getDate()).slice(-2) +
                        ('00' + d.getHours()).slice(-2) +
                        ('00' + d.getMinutes()).slice(-2)+
                        ('00' + d.getSeconds()).slice(-2));

        return fecha;
    }
}
