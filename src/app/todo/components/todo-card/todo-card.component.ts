import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent {

  private _fb = inject( FormBuilder );

  public cardForm: FormGroup = this._fb.group({
    check: [true, [], []],
  });

}
