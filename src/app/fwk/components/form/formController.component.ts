import { OnInit } from '@angular/core';
import { FormService } from '../../services/form.service';


export abstract class FormController implements OnInit {

    constructor(private formservice:FormService) {

    }

    ngOnInit() {
        this.formservice.presentarErrores = false;
        this.onInit();
    }

    submit() {
        this.formservice.presentarErrores = true;
        this.onSubmit();
    }
    abstract onInit();
    abstract onSubmit();
}
