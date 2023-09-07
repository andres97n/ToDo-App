import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MenuValues } from '../../interfaces/Menu-Toggle.interface';


@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {

  private _fb = inject( FormBuilder );
  
  @Input()
  public type!: MenuValues;

  public cardForm: FormGroup = this._fb.group({
    check: [null, [], []],
  });

  isTodoType(): boolean {
    return this.type === MenuValues.todo;
  }

}
