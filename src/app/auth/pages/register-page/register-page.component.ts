import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidatorsService } from 'src/app/shared/services/validators.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  private _fb = inject( FormBuilder );
  private _router =  inject( Router );
  private _validatorsService =  inject( ValidatorsService );

  public registerForm: FormGroup = this._fb.group({ 
    email: [
      '', 
      [
        Validators.required,
        Validators.pattern( this._validatorsService.emailPattern )
      ],
    ],
    password: [
      '', 
      [
        Validators.required, 
        Validators.minLength(6)
      ],
    ],
    repeated_password: [ '', [ Validators.required ] ],
  }, {
    validators: [
      this._validatorsService.isFieldOneEqualFieldTwo( 'password', 'repeated_password' )
    ]
  });

  isInvalidField( field: string ) {
    return this._validatorsService.isInvalidField( this.registerForm, field );
  }

  getFieldErrorMessage( field: string ) {
    return this._validatorsService.getErrorMessage( this.registerForm, field );
  }

  onRegister(): void {
    if ( this.registerForm.invalid ) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.registerForm.value;
    this._router.navigateByUrl('/dashboard')
    console.log(email, password);
  
  }

}
