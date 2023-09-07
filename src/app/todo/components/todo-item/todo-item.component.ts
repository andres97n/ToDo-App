import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Priority } from '../../interfaces/Priority.interface';

import { ValidatorsService } from 'src/app/shared/services/validators.service';


interface DateSelection {
  label: string;
  value: 'today' | 'tomorrow';
}

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit{

  @Input()
  public todo: any;

  private _fb = inject( FormBuilder );
  private _validatorsService = inject( ValidatorsService );
  
  public todoDetailActive = signal<boolean>(false);
  public isNewTodo = signal<boolean>(true);
  public isTodoDetailActive = computed( () => this.todoDetailActive() );
  public todoForm = this._fb.group({
    title: ['', [ Validators.required ]],
    detail: [''],
    date: [''],
    priority: [''],
    state: [''],
  });

  public priorities = signal<Priority[]>([
    { name: 'Ninguna', code: 0 },
    { name: 'Baja', code: 1 },
    { name: 'Media', code: 2 },
    { name: 'Alta', code: 3 },
  ]);

  public stateOptions: DateSelection[] = [
    {label: 'Hoy', value: 'today'}, 
    {label: 'Mañana', value: 'tomorrow'}
  ];

  setTodoDetailActive(): void {
    // if (this.isNewTodo) return;
    this.todoDetailActive.update( current => !current );
  }

  ngOnInit(): void {
    if (this.todo) {
      this.isNewTodo.update(() => true );
      return;
    }
  }

  isTitleFieldInvalid(): boolean | null {
    return this._validatorsService.isInvalidField( this.todoForm, 'title' );
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    } 

    console.log( this.todoForm.value );
    this.todoForm.reset();
  }

  deleteToDo(): void {

  }

  onKeyPress( ): void {
    console.log(event);
    
  }

}
