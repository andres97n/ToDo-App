import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { TodoGroup, MenuValues } from '../../interfaces';


@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {

  private _fb = inject( FormBuilder );
  
  @Input()
  public todoGroup!: TodoGroup;
  
  @Input()
  public type!: MenuValues;

  public cardForm: FormGroup = this._fb.group({
    check: [null, [], []],
  });

  isTodoType(): boolean {
    return this.type === MenuValues.todo;
  }

}
