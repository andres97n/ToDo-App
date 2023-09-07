import { Component, computed, signal } from '@angular/core';
import { Priority } from '../../interfaces/Priority.interface';


@Component({
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent {

  public todoDetailActive = signal<boolean>(false);
  public isTodoDetailActive = computed( () => this.todoDetailActive() );

  public priorities = signal<Priority[]>([
    { name: 'Ninguna', code: 'N' },
    { name: 'Baja', code: 'B' },
    { name: 'Media', code: 'M' },
    { name: 'Alta', code: 'A' },
  ]);

  public stateOptions: any[] = [
    {label: 'Hoy', value: 'today'}, 
    {label: 'Mañana', value: 'tomorrow'}
  ];

  setTodoDetailActive(): void {
    this.todoDetailActive.update( current => !current );
  }

}
