import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MenuToggle, MenuValues } from '../../interfaces/Menu-Toggle.interface';


@Component({
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent {

  private _fb = inject( FormBuilder );
  public todoList = signal<any[]>([]);

  public menuForm: FormGroup = this._fb.group({
    toggle: ['todo']
  });

  public stateOptions: MenuToggle[] = [
    { label: 'Por Hacer', value: MenuValues.todo },
    { label: 'Realizadas', value: MenuValues.done }
  ];

  get toggleValue(): MenuValues {
    if (!this.menuForm.get('toggle')) return MenuValues.todo;

    return this.menuForm.get('toggle')!.value;
  } 

  isTodoListEmpty(): boolean {
    return this.todoList.length === 0;
  }

  isToDoNew(): boolean {
    return this.toggleValue === MenuValues.todo;
  }

}
