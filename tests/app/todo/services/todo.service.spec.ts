import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TodoService } from "../../../../src/app/todo/services/todo.service";


describe( 'ToDo Service', () => {

  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(TodoService);
  });

  test( 'Should be created', () => {
    expect(service).toBeTruthy();
  });

}) ;