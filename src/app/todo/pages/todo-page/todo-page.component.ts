import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit{

  private _route = inject( Router );
  public todoGroupId = signal<string>('');

  ngOnInit(): void {
    
  }

}
