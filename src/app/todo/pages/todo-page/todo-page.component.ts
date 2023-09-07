import { Component } from '@angular/core';

@Component({
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent {

  public cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  public stateOptions: any[] = [
    {label: 'Hoy', value: 'off'}, 
    {label: 'Mañana', value: 'on'}
  ];

}
