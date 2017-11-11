import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { AbstractValueAccessor, NG_VALUE_ACCESSOR, forwardRef } from '../../helpers/abstractvalue.accessor';

export const CUSTOM_STRINGINPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StringInputControlComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'string-input-control',
  templateUrl: 'string.input.control.html',
  styleUrls: ['string.input.control.scss'],
  providers:[CUSTOM_STRINGINPUT_VALUE_ACCESSOR]
})
export class StringInputControlComponent extends AbstractValueAccessor implements OnChanges {
  // --> Input
  @Input() parentGroup: FormGroup;

  @Input() id: string;
  @Input() required: boolean;
  @Input() disabled: boolean;
  @Input() maxLength: number;
  @Input() directives: string;
  @Input() leyend: string;
  @Input() hasLeyend: boolean = false;
  @Input() customValidationCondition: boolean;
  @Input() customValidationMessage: string = '';
  @Input() validate: boolean = false;

  @Input() placeholder: string;

  // --> Outputs
  @Output() onBlur = new EventEmitter<any>();
  @Output() onEnter = new EventEmitter<any>();
  @Output() onChangeComponent = new EventEmitter<any>();

  requiredControl: Boolean;

  ngOnChanges(changes) {
    if(changes && changes.required && changes.required.currentValue !== undefined) {
        this.requiredControl = changes.required.currentValue;
    }
  }

  onBlurEvent (value: string) {
    this.onBlur.emit({value: value});
  }

  onEnterEvent (value: string) {
    this.onEnter.emit({value: value});
  }

  changedInput(value) {
    this.onChangeComponent.emit(value);
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
