import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PrimengModule } from 'src/app/primeng/primeng.module';



@Component({
  selector: 'new-value-dialog',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, PrimengModule ],
  templateUrl: './new-value-dialog.component.html',
  styleUrls: ['./new-value-dialog.component.scss']
})
export class NewValueDialogComponent {

  private _fb = inject( FormBuilder );

  public dialogControl = this._fb.control(
    '', 
    [
      Validators.required,
      Validators.minLength( 3 ),
    ]
  );
  
  @Input()
  public dialogVisible: boolean = false;
  @Input()
  public dialogHeader: string = '';
  @Input()
  public dialogLabel: string = '';
  
  @Output()
  public onVisibilityChange: EventEmitter<boolean> = new EventEmitter();
  @Output()
  public onValueSave: EventEmitter<string> = new EventEmitter();

  changeDialogVisibility( state: boolean ): void {
    this.onVisibilityChange.emit( state );

    if ( !state ) this.dialogControl.reset();
  }

  isInvalidField(): boolean | null {    
    return this.dialogControl.errors && this.dialogControl.touched;
  }

  getErrorMessage(): string | null {
    const errors = this.dialogControl.errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres.`;
      }
    }

    return null;
  }

  onSubmitValue(): void {
    const controlValue = this.dialogControl.value;

    if ( this.dialogControl.invalid ) {
      this.dialogControl.markAsTouched();
      return;
    }

    this.onValueSave.emit( controlValue!.toString());
    this.dialogControl.reset();
    this.changeDialogVisibility( false );
    return;
  }

}
