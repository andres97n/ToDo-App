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

import { Todo, Priority } from '../../interfaces';

import { getPriority, getNewTodo, getDateFormatted} from '../../helpers/';


interface TodoForm {
  task: string;
  details: string;
  end_date: string;
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
    end_date: [''],
    priority: [ getPriority(0) ],
  });

  ngOnInit(): void {
    if (this.todo.id !== 0) {
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

  //TODO: Show end_date in New Todos
  setTodoToForm(): void {
    const { task, details, end_date, priority } = this.todo;
    console.log(end_date);
    
    // const endDate = (end_date) ? getDateFormatted( end_date.toString() ).toString() : '';
    let endDate = '';
    if ( end_date ) {
      endDate = getDateFormatted( end_date.toString() );
    }

    this.resetTodoForm({ 
      task, details: details!, end_date: endDate, priority: getPriority( priority! ) 
    });
  }
  
  public resetTodoForm( todoForm: TodoForm ): void {
    const { task, details, end_date, priority } = todoForm;

    this.todoForm.reset({ task, details, end_date, priority });
    return; 
  }
  
  public isInvalidField( field: string ) {
    return this._validatorsService.isInvalidField( this.todoForm, field );
  }

  public getFieldErrorMessage( field: string ) {
    return this._validatorsService.getErrorMessage( this.todoForm, field );
  }

  showMessage( severity: string, summary: string, detail: string ): void {
    this.onConfirmMessage.emit({ severity, summary, detail });
  }

  onChangeDetailState( state: boolean): void {
    if ( state ) this.setTodoToForm();
    this._todoDetailActive.set( !state );
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    } 

    const { task, details, end_date, priority } = this.todoForm.value; 
    const newTodo: Todo = getNewTodo({ 
      task: task!.trim(), 
      end_date: end_date!, 
      priority: priority!.code, 
      details: details?.trim() || '' 
    });
    
    if ( this.isEmptyForm ) {
      this._todoService.setTodoToGroup( this.todoGroupId, newTodo );
      this.resetTodoForm({ 
        task: '', details: '', end_date: '', priority: getPriority( 0 ) 
      });
    }

    if ( !this.isEmptyForm ) {
      this._todoService.updateTodoToGroup( this.todoGroupId, this.todo.id, newTodo );
    }
    
    this.showMessage( 
      'success',
      '', 
      (this.isEmptyForm) ? 'Tarea agregada correctamente' : 'Tarea actualizada correctamente' 
    );
    this._todoDetailActive.set( false );
    return;
  }

  deleteToDo(): void {
    this._todoService.deleteTodoOfAGroup( this.todoGroupId, this.todo.id );
    this.showMessage( 'success', '', 'Tarea eliminada correctamente' );
  }

}
