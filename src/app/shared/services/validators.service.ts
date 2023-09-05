import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public getErrorMessage( form: FormGroup, field: string ): string | null {

      if ( !form.controls[field] ) return null;
  
      const errors = form.controls[field].errors || {};
  
      for (const key of Object.keys(errors) ) {
        switch( key ) {
          case 'required':
            return 'Este campo es requerido';
  
          case 'minlength':
            return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`;

          case 'pattern':
            return 'El formato del correo electrónico no es válido';
        }
      }
  
      return null;
  }

}
