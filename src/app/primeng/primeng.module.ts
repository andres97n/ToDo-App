import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';



@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CardModule,
  ],
})
export class PrimengModule { }
