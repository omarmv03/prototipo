import { Component, Input, Output, EventEmitter, OnInit, AfterContentInit, ChangeDetectorRef, OnChanges  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';

export const CUSTOM_DECIMALINPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecimalInputControlComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'decimal-input-control',
  templateUrl: 'decimal.input.control.html',
  providers:[CUSTOM_DECIMALINPUT_VALUE_ACCESSOR]
})
export class DecimalInputControlComponent extends AbstractValueAccessor implements OnChanges{
  // @ViewChild('miFormulario') form;

  // --> Input
  @Input() parentGroup: FormGroup;
  @Input() validators: ValidatorFn[];

  @Input() id: string;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() max: number;
  @Input() min: number;
  @Input() maxLength: number;
  @Input() directives: string;
  @Input() leyend: string;
  @Input() hasLeyend: boolean = false;
  @Input() customValidationCondition: boolean;
  @Input() customValidationMessage: string = '';
  @Input() validate: boolean = false;

  // --> Outputs
  @Output() onBlur = new EventEmitter<any>();
  @Output() onEnter = new EventEmitter<any>();

  requiredControl:boolean;

  ngOnChanges(changes) {
    if(changes && changes.required && changes.required.currentValue !== undefined) {
        this.requiredControl = changes.required.currentValue;
    }
  }

  onBlurEvent (value: string) {
    this.onBlur.emit({value: value});
    this._onTouchedCallback(null);
  }

  onEnterEvent (value: string) {
    this.onEnter.emit({value: value});
  }
}

// import { AboutComponent } from './about.component';
// import  * as angular from 'angular';
// import { downgradeComponent } from '@angular/upgrade/static';

// export default angular.module('isolApp.directives')
//   .directive(
//     'sdAbout',
//     downgradeComponent({ component: AboutComponent }) as angular.IDirectiveFactory
//   );