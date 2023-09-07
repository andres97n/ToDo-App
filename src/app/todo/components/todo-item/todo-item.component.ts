import { Component, computed, signal } from '@angular/core';
import { Priority } from '../../interfaces/Priority.interface';


interface DateSelection {
  label: string;
  value: 'today' | 'tomorrow';
}

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  public todoDetailActive = signal<boolean>(false);
  public isTodoDetailActive = computed( () => this.todoDetailActive() );

  public priorities = signal<Priority[]>([
    { name: 'Ninguna', code: 'N' },
    { name: 'Baja', code: 'B' },
    { name: 'Media', code: 'M' },
    { name: 'Alta', code: 'A' },
  ]);

  public stateOptions: DateSelection[] = [
    {label: 'Hoy', value: 'today'}, 
    {label: 'Mañana', value: 'tomorrow'}
  ];

  setTodoDetailActive(): void {
    this.todoDetailActive.update( current => !current );
  }

}
