import { Component, Input, OnInit, computed, signal } from '@angular/core';

import { TodoGroup, MenuValues } from '../../interfaces';



@Component({
  selector: 'todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  @Input()
  public todoGroups!: TodoGroup[];

  @Input()
  public todoType!: MenuValues;

  private _todoGroupsForDo = signal<TodoGroup[]>([]);
  private _todoGroupsDone = signal<TodoGroup[]>([]);

  public todoGroupsForDo = computed( () => this._todoGroupsForDo() );
  public todoGroupsDone = computed( () => this._todoGroupsDone() ); 
  
  ngOnInit(): void {
    this.administrateTodoGroups();
    console.log(this.todoGroupsDone());
  }
  
  administrateTodoGroups(): void {
    const groupsDone: TodoGroup[] = [];
    const groupsForDo: TodoGroup[] = [];

    this.todoGroups.forEach((group) => {
      if ( group.completed ) {
        groupsDone.push( group );
      } 
      
      if ( !group.completed ) {
        groupsForDo.push( group );
      }    
    });

    this._todoGroupsDone.set( groupsDone );
    this._todoGroupsForDo.set( groupsForDo );
  }

  isTodoGroupForDo(): boolean {
    if ( this.todoType === MenuValues.todo ) return true;
   
    return false;
  }

  isToDoNew(): boolean {
    return this.todoType === MenuValues.todo;
  }

  isTodoListEmpty(): boolean {
    if ( this.isToDoNew() ) {      
      return this.todoGroupsForDo().length === 0;
    }

    return this.todoGroupsDone().length === 0;
  }

  changeTodoGroupStatus( todoGroup: TodoGroup ): void {
    if ( todoGroup.completed ) {
      this._todoGroupsDone.update( groups => [ ...groups, todoGroup ] );
      this._todoGroupsForDo.update( groups => groups.filter( group => group.id !== todoGroup.id ) );
      return;
    }

    this._todoGroupsForDo.update( groups => [ ...groups, todoGroup ] );
    this._todoGroupsDone.update( groups => groups.filter( group => group.id !== todoGroup.id ) );
    return;
  }
   
}
