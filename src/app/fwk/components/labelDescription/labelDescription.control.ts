import { Component, Input, Output, EventEmitter, OnInit, AfterContentInit, ChangeDetectorRef  } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';

export const CUSTOM_LABELDESCRIPTION_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LabelDescriptionComponent),
    multi: true
};

@Component({
    moduleId: module.id,
    selector: 'lbl-description',
    templateUrl: 'labelDescription.control.html',
    providers: [CUSTOM_LABELDESCRIPTION_VALUE_ACCESSOR]
  })

export class LabelDescriptionComponent extends AbstractValueAccessor implements OnInit, AfterContentInit {
    // --> Inputs
    // @Input() parentGroup: FormGroup;
    @Input() id: string;
    @Input() labelText: string;
    @Input() hidden: boolean;

    // thisControl: FormControl;

    constructor() {
        super();
    }

    ngOnInit() {
        // this.thisControl = new FormControl('');
        // this.parentGroup.addControl(this.id, this.thisControl);
    }

    ngAfterContentInit() {
        // this.cdRef.detectChanges();
    }
}
