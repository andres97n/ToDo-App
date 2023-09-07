import { Component, Input, OnInit } from '@angular/core';

import { MenuValues } from '../../interfaces/menu-toggle.interface';



@Component({
  selector: 'todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  @Input()
  public todoItems!: any[];

  @Input()
  public todoType!: MenuValues;

  ngOnInit(): void {
    console.log(this.todoItems);
    console.log(this.todoType);
    
    
  }

}
