
// import { TodoGroup, Todo } from "../interfaces";

import { TodoGroup } from 'src/app/todo/interfaces';

import { getTodoGroupCompleted, isTodoGroupComplete } from '../../../../src/app/todo/helpers';


describe( 'Validate Check State', () => {

  const todoGroup: TodoGroup = {
    id: 1,
    title: "Group 1",
    completed: false,
    start_date: new Date(),
    end_date: new Date(),
    todos: [
      {
        id: 1,
        task: 'Task 1',
        start_date: new Date(),
        end_date: new Date(),
        taskDone: false,
        details: '',
        priority: 0,
        task_end_date: new Date()
      },
      {
        id: 2,
        task: 'Task 2',
        start_date: new Date(),
        end_date: new Date(),
        taskDone: false,
        details: '',
        priority: 0,
        task_end_date: new Date()
      },
    ]
  }

  test( "Should return false if not the todo's group is checked", () => {
    const checkList: boolean[] = [true, false, true];
    const todoGroupState: boolean = isTodoGroupComplete( checkList );

    expect( todoGroupState ).toBe( false );
  });

  test( "Should return true if the todo's group is checked", () => {
    const checkList: boolean[] = [true, true, true];
    const todoGroupState: boolean = isTodoGroupComplete( checkList );

    expect( todoGroupState ).toBe( true );
  });

  test( "Should return a ToDo Group type this function => getTodoGroupCompleted()", () => {
    expect( getTodoGroupCompleted( todoGroup ) ).toBeInstanceOf<TodoGroup>;
  });

  test( "Should return a ToDo Group completed, with all his ToDos completed", () => {
    const todoGroupCompleted: TodoGroup = getTodoGroupCompleted( todoGroup );
    const todoTasks: boolean[] = todoGroupCompleted.todos.map( todo => todo.taskDone! );

    expect( todoGroupCompleted.completed ).toBe( true );
    expect( isTodoGroupComplete( todoTasks ) ).toBe( true );
  });

});

// import { Todo } from 'src/app/todo/interfaces';
// import { getCurrentDate, isDateAfter, isDateBefore } from './date.helper';



// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from './app.component';

// describe('AppComponent', () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     imports: [RouterTestingModule],
//     declarations: [AppComponent]
//   }));

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });

//   it(`should have as title 'ToDo-App'`, () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app.title).toEqual('ToDo-App');
//   });

//   it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('.content span')?.textContent).toContain('ToDo-App app is running!');
//   });
// });



