import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TodoService } from "../../../../src/app/todo/services/todo.service";

import { Todo, TodoGroup } from 'src/app/todo/interfaces';


describe( 'ToDo Service', () => {

  let service: TodoService;
  const emptyTodoGroup = {
    id: 1,
    title: 'Test Group',
    completed: false,
    start_date: new Date(),
    todos: [],
  };

  const emptyTodo = {
    id: 1,
    task: 'Test Task',
    details: '',
    start_date: new Date(), 
    task_end_date: '',
    end_date: '',
    taskDone: false,
    priority: 0,
    hola: ''
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(TodoService);
  });

  test( 'Should be created', () => {
    expect(service).toBeTruthy();
  });

  test( 'Should pass a TodoGroup Object and add this object to the main Group List Service', () => {
    expect( emptyTodoGroup ).toBeInstanceOf<TodoGroup>;

    service.setTodoGroup(emptyTodoGroup);
    
    expect(service.todoGroups().length).toBe(4);
    expect(service.todoGroups()[3]).toEqual(emptyTodoGroup);
  });

  // test( 'Should pass a Todo Object and add this object to the respective Todo Group in the Main List Service', () => {
  //   expect( emptyTodo ).ins(instanceof Todo);

  //   service.setTodoToGroup( 1, emptyTodo );
  // });

});