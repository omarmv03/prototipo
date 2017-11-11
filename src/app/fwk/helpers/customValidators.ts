import { AbstractControl, ValidatorFn } from '@angular/forms';

export function decimalsValidator(decimalQuantity: number) {
    return (control: AbstractControl): {[key: string]: any} => {
        let result: boolean = true; // --> Por defecto el resultado es correcto

        let splitValue: string = undefined;
        console.log(control.value);
        if(isNaN(control.value)){
            splitValue = control.value.toString().split(localStorage.separadorDecimalesPunto? '.': ',');
        }else{
            splitValue = control.value.toString().split('.');
        }

        // --> vino con decimales
        if(splitValue.length > 1 && decimalQuantity > 0){
            result = splitValue[1].length <= decimalQuantity;
        }else if(splitValue.length > 1 && decimalQuantity == 0){
            result = false;
        }
        
        return result ? null: {'decimals': {value: decimalQuantity}};
    };
  }

  export function biggestThanZero() {
    return (control: AbstractControl): {[key: string]: any} => {
        let result: boolean = true; // --> Por defecto el resultado es correcto

        let filtrado = undefined;
        if(localStorage.separadorDecimalesPunto){
            // --> Elimina todo caracter que no sea numero o punto
            filtrado = control.value.toString().replace(/[^\d|\.]/g, '');

        } else{
            // --> Elimina todo caracter que no sea numero o punto
            filtrado = control.value.toString().replace(/[^\d|,]/g, '');

            filtrado = filtrado.replace(',','.');
        }


        result = Number(filtrado) > 0 || filtrado == "";

        return result ? null: {'biggestThanZero': {value: control.value}};
    };
  }

