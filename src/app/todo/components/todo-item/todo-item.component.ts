import { Component, Input, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import * as dayjs from 'dayjs';
import { SelectButtonOptionClickEvent } from 'primeng/selectbutton';

import { Todo, Priority, DateSelection } from '../../interfaces';

import { dateStates, priorities, getResetForm } from '../../helpers/';


@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit{

  @Input()
  public todo!: Todo;

  private _fb = inject( FormBuilder );
  
  public isNewTodo = signal<boolean>(true);
  public todoDetailActive = signal<boolean>(false);
  public todoPriority = signal<number>(0);

  public isTodoDetailActive = computed( () => this.todoDetailActive() );
  public isEmptyForm = computed( () => this.isNewTodo() );

  public todoForm = this._fb.group({
    task: ['', [ Validators.required ]],
    detail: [''],
    date: [''],
    priority: [{ name: 'Ninguna', code: 0 }],
  });

  public putDataInFormEffect = effect( () => {
    if ( !this.isEmptyForm() && this.todo.id ) {
      this.todoForm.reset({ ...getResetForm });
    } 
  });

  ngOnInit(): void {
    
    if (this.todo.id !== 0) {
      this.isNewTodo.set(false);
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

  setTodoToForm(): void {
    console.log(this.todo);

    this.todoForm.reset({
      task: this.todo.task,
      detail: this.todo.details,
      date: this.todo.task_end_date?.toString() ?? '',
      priority: { name: 'Ninguna', code: 0 },
    });
    return;
  }

  setTodoDetailActive(): void {
    this.todoDetailActive.update( current => !current );
  }

  updatePriorityTodo( value: number ): void {
    this.todoPriority.update( () => value );
    return;
  }

  onPriorityChange(): void {
    const priorityField = this.todoForm.get('priority');
    
    if ( !priorityField ) return;
    
    this.updatePriorityTodo( priorityField.value!.code );
    return;
  }

  onDateSelectionChange( event: SelectButtonOptionClickEvent ): void {
    const selectedDated = event.option;
    const { value } = selectedDated;
    const dateField = this.todoForm.get('date');
    const today = dayjs();
    
    if ( !dateField ) return;
    
    if ( value === 'today' ) {
      dateField.setValue( today.format('DD/MM/YYYY') );
    }  
      
    if ( value === 'tomorrow' ) {
      dateField.setValue( today.add(1, 'day').format('DD/MM/YYYY') );
    }
    return;
  }

  onSubmit(): void {
    if (this.todoForm.invalid) {
      this.todoForm.markAllAsTouched();
      return;
    } 

    const todoId: number = Number(Math.floor(Math.random() * 100000).toString());
  
    this.todoForm.reset({
      task: '',
      detail: '',
      date: '',
      priority: { name: 'Ninguna', code: 0 },
    });

    this.updatePriorityTodo(0);
    return;
  }

  deleteToDo(): void {

  }

}
