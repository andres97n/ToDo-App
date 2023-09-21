import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PrimengModule } from 'src/app/primeng/primeng.module';

import { ValidatorsService } from '../../services/validators.service';



@Component({
  selector: 'new-value-dialog',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, PrimengModule ],
  templateUrl: './new-value-dialog.component.html',
  styleUrls: ['./new-value-dialog.component.scss']
})
export class NewValueDialogComponent {

  private _fb = inject( FormBuilder );
  private _validatorService = inject( ValidatorsService );

  public dialogForm = this._fb.group({
    dialog_value: [
      '', 
      [ 
        Validators.required,
        Validators.minLength( 3 ),
      ]
    ],
  });
  
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

  get isInvalidField(): boolean | null {
    return this._validatorService.isInvalidField( this.dialogForm, 'dialog_value' );
  }

  get errorMessage(): string | null {
    return this._validatorService.getErrorMessage( this.dialogForm, 'dialog_value' );
  }

  resetDialogForm(): void {
    this.dialogForm.reset({ dialog_value: '' });
  }

  changeDialogVisibility( state: boolean ): void {
    this.onVisibilityChange.emit( state );

    if ( !state ) this.resetDialogForm();
  }

  onSubmitValue(): void {
    if ( this.dialogForm.invalid ) {
      this.dialogForm.markAllAsTouched();
      return;
    }
    
    const controlValue = this.dialogForm.get('dialog_value')!.value;

    this.onValueSave.emit( controlValue!.toString().trim() );
    this.changeDialogVisibility( false );    
    return;
  }

}
