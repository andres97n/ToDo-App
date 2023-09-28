import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SelectButtonOptionClickEvent } from 'primeng/selectbutton';

import { TodoService } from '../../services/todo.service';

import { Todo, Priority, DateSelection } from '../../interfaces';

import { 
  dateStates, 
  priorities, 
  getCurrentDate, 
  getPriority, 
  getDateFormatted,
  getTomorrow,
  getNewTodo } from '../../helpers/';


@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit{

  @Input()
  public todo!: Todo;
  @Input()
  public todoGroupId!: number;
  
  private _fb = inject( FormBuilder );
  private _todoService = inject( TodoService );
  
  private _todoDetailActive = signal<boolean>(false);
  public isTodoDetailActive = computed( () => this._todoDetailActive() );

  public todoForm = this._fb.group({
    task: ['', [ Validators.required ]],
    details: [''],
    end_date: [''],
    priority: [ getPriority(0) ],
  });

  ngOnInit(): void {
    if (this.todo.id !== 0) {
      this.setTodoToForm();
      return;
    }
  }

  get prioritiesSelect(): Priority[] {
    return [ ...priorities ];
  }

  get stateOptions(): DateSelection[] {
    return [ ...dateStates ];
  }

  get todoPriorityCodeForm(): number {
    return this.todoForm.get('priority')!.value!.code;
  }

  get isEmptyForm(): boolean {
    return this.todo.id === 0;
  }

  setTodoToForm(): void {
    const { task, details, end_date, priority } = this.todo;
    const endDate = (end_date) ? getDateFormatted( end_date.toString() ) : '';
    
    this.todoForm.reset({
      task,
      details,
      end_date: endDate,
      priority: getPriority( priority! ),
    });
    return;
  }

  onChangeDetailState( state: boolean): void {
    if ( state ) this.setTodoToForm();
    this._todoDetailActive.set( !state );
  }

  onDateSelectionChange( event: SelectButtonOptionClickEvent ): void {
    const { value } = event.option;
    const dateField = this.todoForm.get('end_date');
    const today = getCurrentDate();
    
    if ( !dateField ) return;
    
    if ( value === 'today' ) dateField.setValue( today ); 
      
    if ( value === 'tomorrow' ) dateField.setValue( getTomorrow() );
    return;
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    } 

    const { task, details, end_date, priority } = this.todoForm.value; 
    console.log(end_date);

    const newTodo: Todo = getNewTodo({ 
      task: task!, 
      end_date: end_date!, 
      priority: priority!.code, 
      details: details || '' 
    });
    
    if ( this.isEmptyForm ) {
      this._todoService.setTodoToGroup( this.todoGroupId, newTodo );
      this.todoForm.reset({
        task: '',
        details: '',
        end_date: '',
        priority: getPriority(0),
      });
    }

    if ( !this.isEmptyForm ) {
      this._todoService.updateTodoToGroup( this.todoGroupId, this.todo.id, newTodo );
    }

    this.onChangeDetailState( true );
    return;
  }

  deleteToDo(): void {
    this._todoService.deleteTodoOfAGroup( this.todoGroupId, this.todo.id );
  }

}
