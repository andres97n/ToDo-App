import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CardModule,
    SelectButtonModule,
    CheckboxModule,
  ],
})
export class PrimengModule { }
