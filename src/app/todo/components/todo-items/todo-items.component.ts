import { Component, Input, OnInit, computed, signal } from '@angular/core';

import { TodoGroup, MenuValues } from '../../interfaces';



@Component({
  selector: 'todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  @Input()
  public todoItems!: TodoGroup[];

  @Input()
  public todoType!: MenuValues;

  private _todoGroupsForDo = signal<TodoGroup[]>([]);
  private _todoGroupsDone = signal<TodoGroup[]>([]);

  public todoGroupsForDo = computed( () => this._todoGroupsForDo() );
  public todoGroupsDone = computed( () => this._todoGroupsDone() );  

  ngOnInit(): void {
    console.log(this.todoItems);
    console.log(this.todoType);
    this.administrateTodoGroups();
  }

  administrateTodoGroups(): void {
    console.log(this.todoItems);
    
    // this.todoItems.forEach((group) => {
    //   if ( group.completed ) {
    //     this._todoGroupsDone.update( currentGroups => [...currentGroups, group ] );
    //   } 
      
    //   if ( !group.completed ) {
    //     this._todoGroupsForDo.update( currentGroups => [...currentGroups, group ] );
    //   }    
    // });
  }

  isTodoGroupForDo( todoType: MenuValues ): boolean {
    if ( todoType === MenuValues.todo ) return true
   
    return false;
  }
   
}
