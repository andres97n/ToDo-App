import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
// import { switchMap } from 'rxjs';

import { Message } from 'primeng/api';

import { Todo, TodoGroup } from '../../interfaces';

import { TodoService } from '../../services/todo.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

import { emptyTodoGroup, emptyTodo, errorMessage } from '../../helpers/getTodoStaticData.helper';


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

  private _todoGroup = signal<TodoGroup>( { ...emptyTodoGroup } );
  public todoGroup = computed<TodoGroup>( () => this._todoGroup() );

  public todoGroupForm = this._fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.minLength( 3 ),
      ],  
    ],
  });

  ngOnInit(): void {
    this.setCurrentTodoGroup();
    this.todoGroupForm.get('title')!.setValue( this.todoGroup().title);
  }

  get newTodo(): Todo {
    return { ...emptyTodo };
  }

  get todoGroupErrorMessage(): Message[] {
    return errorMessage(
      'Error',
      'No se pudo encontrar el Grupo de Tareas'
    );
  }

  get isTodoGroupValid(): boolean {
    return this.todoGroup().id !== 0;
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
  
        this._todoGroup.set( this._todoService.getTodoGroupById( todoId ) )
        return;
      });
  }

  editTodoGroupTitle(): void {
    if ( this.todoGroupForm.invalid ) {
      this.todoGroupForm.markAllAsTouched();
      return;
    }

    const { title } = this.todoGroupForm.value;
    
    if ( this.todoGroup().title === title ) return;

    this._todoGroup.update( currentGroup => {
      currentGroup.title = title!;
      return currentGroup;
    });
    this._todoService.setTodoGroup( this.todoGroup() );
  }
    
}
