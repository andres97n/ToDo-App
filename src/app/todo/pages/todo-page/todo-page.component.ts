import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
// import { switchMap } from 'rxjs';

import { Message, MessageService } from 'primeng/api';

import { Todo, TodoGroup } from '../../interfaces';

import { TodoService } from '../../services/todo.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

import { emptyTodo } from '../../helpers/getTodoStaticData.helper';
import { getTodosSorted } from '../../helpers';


@Component({
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit{

  private _router = inject( Router );
  private _activatedRoute = inject( ActivatedRoute );
  private _fb = inject( FormBuilder );
  private _todoService = inject( TodoService );
  private _validatorsService =  inject( ValidatorsService );
  private _messageService = inject( MessageService );

  private _todoGroupId = signal<number>(0);
  public todoGroupId = computed<number>( () => this._todoGroupId() );

  public todoGroupForm = this._fb.group({
    title: ['', [ Validators.required, Validators.minLength( 3 ),]],
  });

  ngOnInit(): void {
    this.setCurrentTodoGroup();
    this.todoGroupForm.get('title')!.setValue( this.getTodoGroup().title);
  }

  get newTodo(): Todo {
    return { ...emptyTodo };
  }

  get todoGroupErrorMessage(): Message[] {
    return [{
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo encontrar el Grupo de Tareas'
    }];
  }

  get isTodoGroupValid(): boolean {
    return this.todoGroupId() !== 0;
  }

  get isInvalidTitle() {
    return this._validatorsService.isInvalidField( this.todoGroupForm, 'title' );
  }

  get titleErrorMessage() {
    return this._validatorsService.getErrorMessage( this.todoGroupForm, 'title' );
  }
  
  setCurrentTodoGroup(): void {
    this._activatedRoute.params
      // .pipe(
      //   switchMap( ({ id }) => this._todoService.getTodoById( ++id )),
      // )
      .subscribe( ({ id }) => {
        const todoId: number = Number(id) || 0;
        if ( todoId === 0 ) return this._router.navigate([ '/dashboard/todo-list' ]);
  
        this._todoGroupId.set( todoId );
        return;
      });
  }

  getTodoGroup(): TodoGroup {
    const currentTodoGroup = this._todoService.getTodoGroupById( this.todoGroupId() );
    currentTodoGroup.todos = getTodosSorted( currentTodoGroup.todos);
    return currentTodoGroup;
  }

  showMessage( message: Message ): void {
    const { severity, summary, detail } = message;
    this._messageService.add({ severity, summary, detail });
  }

  editTodoGroupTitle(): void {
    if ( this.todoGroupForm.invalid ) {
      this.todoGroupForm.markAllAsTouched();
      return;
    }

    const { title } = this.todoGroupForm.value;
    const currentTitle: string = title!.trim();
    const currentTodoGroup: TodoGroup = this.getTodoGroup();
    
    if ( currentTodoGroup.title === currentTitle ) return;

    currentTodoGroup.title = currentTitle;
    this._todoService.updateTodoGroup( this.todoGroupId(), currentTodoGroup );
    return;
  }
    
}
