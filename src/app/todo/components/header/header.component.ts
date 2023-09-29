import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'todo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _todoService = inject( TodoService );
  private _router = inject( Router );

  public searchControl:FormControl = new FormControl('');

  ngOnInit(): void {
    this.isTodoListPage;
    this.searchControl.valueChanges.subscribe(
      (value: string) => this.searchTodoGroup( value.trim() )
    );
  }

  get isTodoListPage(): boolean {
    // console.log(this._router.getCurrentNavigation());
    
    return true;
  }

  public searchTodoGroup( term: string ): void {
    this._todoService.searchTodoGroups( term );
  }

}
