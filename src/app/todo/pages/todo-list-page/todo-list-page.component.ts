import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MenuToggle, MenuValues } from '../../interfaces/menu-toggle.interface';


@Component({
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListPageComponent {

  private _fb = inject( FormBuilder );
  
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

  isToDoNew(): boolean {
    return this.toggleValue === MenuValues.todo;
  }

}
