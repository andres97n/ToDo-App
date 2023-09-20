import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TodoGroup, MenuValues, Todo } from '../../interfaces';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { getTodoGroupCompleted, isTodoGroupComplete } from '../../helpers';


interface CheckState {
  id: number;
  taskDone: boolean;
  task: string;
}

@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit{

  private _fb = inject( FormBuilder );
  
  @Input()
  public todoGroup!: TodoGroup;
  
  @Input()
  public type!: MenuValues;

  @Output()
  public onCompleteTodoGroup: EventEmitter<TodoGroup> = new EventEmitter();

  public cardForm: FormGroup = this._fb.group({
    todoItems: this._fb.array([]),
  });

  ngOnInit(): void {
    this.setStateChecks();
    // console.log(this.todoItemsFormArray.controls);
  }

  get todoItemsFormArray(): FormArray {
    return this.cardForm.get('todoItems') as FormArray;
  }
  
  setStateChecks(): void {
    if ( this.todoGroup ) {
      this.todoGroup.todos.forEach( todo => {
        this.todoItemsFormArray.push( this._fb.control( todo.taskDone ) );
      });
    }
  }

  onCheckChange(): void {
    const todoItems = this.todoItemsFormArray.value;
    console.log(todoItems);
    if ( isTodoGroupComplete( todoItems ) ) {
      this.onCompleteTodoGroup.emit( getTodoGroupCompleted( this.todoGroup ) );
    }

    return;
  }

  isTodoType(): boolean {
    return this.type === MenuValues.todo;
  }

  getFormControlName( index: number ): string {
    return `${this.todoGroup.id}_${index + 1}`;
  }

  getTodoFieldValueByIndex( index: number, field: keyof Todo): any {
    const todo: Todo = this.todoGroup.todos[index];

    if ( todo[field] ) {
      return todo[field];
    }

    return '';
  }

  // formGroup = this._fb.group({
  //   cities: this._fb.array([
  //     [true, Validators.required],
  //     [true, Validators.required],
  //   ])
  // });

  // get testForm(): FormArray {
  //   return this.formGroup.get('cities') as FormArray;
  // }

  // getLabel( i: number ): string {
  //   return `${this.todoGroup.id}_${i}`
  // }

}
