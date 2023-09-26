import { Component, Input } from '@angular/core';

import { TodoGroup, MenuValues } from '../../interfaces';



@Component({
  selector: 'todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent {

  @Input()
  public todoGroups!: TodoGroup[];

  @Input()
  public todoType!: MenuValues;

  get todoGroupsDone(): TodoGroup[] {
    const groupsDone: TodoGroup[] = [];
    
    this.todoGroups.forEach((group) => {
      if ( group.completed ) groupsDone.push( group );   
    });
    return groupsDone;
  }

  get todoGroupsForDo(): TodoGroup[] {
    const groupsForDo: TodoGroup[] = [];
    this.todoGroups.forEach((group) => {
      if ( !group.completed ) groupsForDo.push( group );    
    });
    return groupsForDo;
  }

  isToDoTypeDone(): boolean {
    return this.todoType === MenuValues.done;
  }

  isTodoGroupsForDoEmpty(): boolean {
    return this.todoGroupsForDo.length === 0;
  }

  isTodoGroupsDoneEmpty(): boolean {
    return this.todoGroupsDone.length === 0;
  }
   
}
