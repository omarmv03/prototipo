import {ControlValueAccessor} from "@angular/forms";

export {NG_VALUE_ACCESSOR} from "@angular/forms";
export {forwardRef} from "@angular/core";
const noop = () => {};

export abstract class AbstractValueAccessor implements ControlValueAccessor {
    _value: any = undefined;
    _initValue: any = undefined;
    _enablePattern: boolean = false;
     _pattern: any = null;
     _onTouchedCallback: (_:any) => void = noop;

     setPattern(v:string) {
        this._pattern = new RegExp(v);
     }

     set enablePattern(v:boolean){
       this._enablePattern=v;
     }

     get isValidPattern(): boolean {
        return (this._enablePattern ? (this._pattern!=null ? this._pattern.test(this._value) : true) : true);
     }

    get value(): any { return this._value; };
    set value(v: any) {
      if (v !== this._value) {
        this._value = v;
        this.valueChange();
        this.onChange(this._value);
      }
    }

    public valueChange() {
      return;
    }

    writeValue(v: any) {
      this._value = v;
      this.valueChange();
      this.onChange(this._value);
    }

    saveInitialValue(){
      this._initValue = this.value;
    }

    get initialValue(): any{
      return this._initValue;
    }

    onTouched(){
      this._onTouchedCallback(null);
    }
    onChange = (_:any) => {};
    // onTouched = () => {console.log('touched');};
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
}

// export function MakeProvider(type : any): any{
//   return {
//       provider: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => type),
//       multi: true
//     };
// }