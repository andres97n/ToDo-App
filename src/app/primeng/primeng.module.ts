import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  exports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    SelectButtonModule,
    CheckboxModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
  ],
})
export class PrimengModule { }
