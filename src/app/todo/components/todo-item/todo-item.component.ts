import { Component, 
         EventEmitter, 
         Input, 
         OnInit, 
         Output, 
         computed, 
         inject, 
         signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Message } from 'primeng/api';

import { TodoService } from '../../services/todo.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

import { Priority, Todo, TodoFormData } from '../../interfaces';

import { getPriority, 
         getNewTodo, 
         getDateFormattedToString, 
         getDateByString} from '../../helpers/';


interface TodoForm {
  task: string;
  details: string;
  task_end_date: string;
  priority: Priority;
}

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

  @Output()
  public onConfirmMessage: EventEmitter<Message> = new EventEmitter();
  
  private _fb = inject( FormBuilder );
  private _todoService = inject( TodoService );
  private _validatorsService = inject( ValidatorsService );
  
  private _todoDetailActive = signal<boolean>(false);
  public isTodoDetailActive = computed( () => this._todoDetailActive() );

  public todoForm = this._fb.group({
    task: ['', [ Validators.required, Validators.maxLength(120) ]],
    details: ['', [ Validators.maxLength(300)  ]],
    task_end_date: [''],
    priority: [ getPriority(0) ],
  });

  ngOnInit(): void {
    if (this.todo.id > 0) {
      this.setTodoToForm();
      return;
    }
  }

  get todoPriorityCodeForm(): number {
    return this.todoForm.get('priority')!.value!.code;
  }

  get isEmptyForm(): boolean {
    return this.todo.id === 0;
  }

  get isTodoDone(): boolean {
    return this.todo.taskDone;
  }

  public isInvalidField( field: string ) {
    return this._validatorsService.isInvalidField( this.todoForm, field );
  }

  public getFieldErrorMessage( field: string ) {
    return this._validatorsService.getErrorMessage( this.todoForm, field );
  }

  setTodoToForm(): void {
    const { task, details, task_end_date, end_date, priority } = this.todo;
    console.log(end_date);
    
    let taskEndDate = '';
    if ( task_end_date ) {
      taskEndDate = getDateFormattedToString( task_end_date.toString() );
    }

    this.resetTodoForm({ 
      task, details: details!, task_end_date: taskEndDate, priority: getPriority( priority! ) 
    });
  }
  
  public resetTodoForm( todoForm: TodoForm ): void {
    const { task, details, task_end_date, priority } = todoForm;

    this.todoForm.reset({ task, details, task_end_date, priority });
    return; 
  }
  
  showMessage( message:Message ): void {
    const { severity, summary, detail } = message; 
    this.onConfirmMessage.emit({ severity, summary, detail });
  }

  onChangeDetailState( state: boolean): void {
    // if ( state ) this.setTodoToForm();
    this._todoDetailActive.set( !state );
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    } 

    const { task, details, task_end_date, priority } = this.todoForm.value;
    
    const currentFormData: TodoFormData = { task: task!.trim() };
    currentFormData.details = details?.trim() || '';
    if ( priority ) currentFormData.priority = priority.code;
    if ( task_end_date ) currentFormData.task_end_date = getDateByString( task_end_date )!;

    const newTodo: Todo = getNewTodo( currentFormData );
    
    if ( this.isEmptyForm ) {
      this._todoService.setTodoToGroup( this.todoGroupId, newTodo );
      this.resetTodoForm({ 
        task: '', details: '', task_end_date: '', priority: getPriority( 0 ) 
      });
    }

    if ( !this.isEmptyForm ) {
      this._todoService.updateTodoToGroup( this.todoGroupId, this.todo.id, newTodo );
    }
    
    this.showMessage({
      severity: 'success',
      detail: '', 
      summary:(this.isEmptyForm) 
        ? 'Tarea agregada correctamente' 
        : 'Tarea actualizada correctamente'
    });
    this._todoDetailActive.set( false );
    return;
  }
}
