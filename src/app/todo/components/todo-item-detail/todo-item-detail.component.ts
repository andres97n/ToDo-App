import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Message } from 'primeng/api';

import { SelectButtonOptionClickEvent } from 'primeng/selectbutton';

import { ValidatorsService } from 'src/app/shared/services/validators.service';

import { DateSelection, Priority } from '../../interfaces';

import { TodoService } from '../../services/todo.service';

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
  @Input()
  public todoGroupId!: number;
  @Input()
  public todoId!: number;
  
  @Output()
  public onSubmitDetail: EventEmitter<void> = new EventEmitter();
  @Output()
  public onShowMessage: EventEmitter<Message> = new EventEmitter();

  private _validatorsService = inject( ValidatorsService );
  private _todoService = inject( TodoService );

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
    const dateField = this.todoForm.get('task_end_date');
    const today = getCurrentDateToString();
    
    if ( !dateField ) return;
    
    if ( value === 'today' ) dateField.setValue( today ); 
      
    if ( value === 'tomorrow' ) dateField.setValue( getTomorrow() );
    
    return;
  }

  deleteToDo(): void {
    this._todoService.deleteTodoOfAGroup( this.todoGroupId, this.todoId );
    this.onShowMessage.emit({
      severity: 'success',
      detail: '', 
      summary: 'Tarea eliminada correctamente'
    });
  }

  onSubmit(): void {
    this.onSubmitDetail.emit();
  }

}
