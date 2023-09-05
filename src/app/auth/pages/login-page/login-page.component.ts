import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/services/validators.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  private _fb = inject( FormBuilder );
  private _validatorsService =  inject( ValidatorsService );

  public authForm: FormGroup = this._fb.group({ 
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
    ]
  });

  isValidField( field: string ) {
    return this._validatorsService.isValidField( this.authForm, field );
  }

  getFieldErrorMessage( field: string ) {
    return this._validatorsService.getErrorMessage( this.authForm, field );
  }
  
  onLogin(): void {
    
    if ( this.authForm.invalid ) {
      this.authForm.markAllAsTouched();
      return;
    }
    
    const { email, password } = this.authForm.value;

    console.log(email, password);
       
  }

}
