import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SelectButtonOptionClickEvent } from 'primeng/selectbutton';

import { TodoService } from '../../services/todo.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

import { DateSelection, Priority } from '../../interfaces';

import { dateStates, getCurrentDateToString, getTomorrow, priorities } from '../../helpers';


@Component({
  selector: 'todo-item-detail',
  templateUrl: './todo-item-detail.component.html',
  styleUrls: ['./todo-item-detail.component.scss']
})
export class TodoItemDetailComponent {

  @Input()
  public todoForm!: FormGroup;
  @Input()
  public isEmptyForm: boolean = false;
  
  @Output()
  public onSubmitDetail: EventEmitter<undefined> = new EventEmitter();
  @Output()
  public onDeleteTodo: EventEmitter<undefined> = new EventEmitter();

  private _todoService = inject( TodoService );
  private _validatorsService = inject( ValidatorsService );

  get prioritiesSelect(): Priority[] {
    return [ ...priorities ];
  }

  get stateOptions(): DateSelection[] {
    return [ ...dateStates ];
  }

  get isDetailsFieldInvalid() {
    return this._validatorsService.isInvalidField( this.todoForm, 'details' );
  }

  get detailsErrorMessage() {
    return this._validatorsService.getErrorMessage( this.todoForm, 'details' );
  }

  onDateSelectionChange( event: SelectButtonOptionClickEvent ): void {
    const { value } = event.option;
    const dateField = this.todoForm.get('end_date');
    const today = getCurrentDateToString();
    
    if ( !dateField ) return;
    
    if ( value === 'today' ) dateField.setValue( today ); 
      
    if ( value === 'tomorrow' ) dateField.setValue( getTomorrow() );
    return;
  }

  deleteToDo(): void {
    this.onDeleteTodo.emit();
  }

  onSubmit() {
    this.onSubmitDetail.emit();
  }

}
