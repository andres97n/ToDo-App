import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  private _fb = inject( FormBuilder );

  public authForm: FormGroup = this._fb.group({ 
    email: ['', [Validators.required]],
    password: [
      '', 
      [
        Validators.required, 
        Validators.minLength(6)
      ],
    ]
  });
  
  submit(): void {

    if ( this.authForm.errors ) return;

    const { email, password } = this.authForm.value;

    console.log(email, password);
       
  }

}
