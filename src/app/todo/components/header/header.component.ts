import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _todoService = inject( TodoService );

  public searchControl:FormControl = new FormControl('');
  
  public todoListPath: string = '/dashboard/todo-list';

  ngOnInit(): void {
    this.isTodoListPage;
    this.searchControl.valueChanges.subscribe(
      (value: string) => this.searchTodoGroup( value.trim() )
    );
  }

  get isTodoListPage(): boolean {
    return window.location.pathname === this.todoListPath;
  }

  public searchTodoGroup( term: string ): void {
    this._todoService.searchTodoGroups( term );
  }

}
