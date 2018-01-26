import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Observable } from 'rxjs/Observable';
import { Todo } from './todo';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: any = { name: '' };
  pageTitle: string;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('todos').subscribe(
        (todos) => {
          this.todos = todos;
        }
      );
  }

  // addElement() {
  //   const lastElement = this.todos.length - 1;
  //   if (this.todos && !this.todos[lastElement].name) return false;
  //   this.todos.push({ name: '' });
  // }

  addElement() {
    if (this.newTodo && !this.newTodo.name) return false;
    this.todos.push(Object.assign({}, this.newTodo));
    this.newTodo.name = '';
  }


  deleteElement(index) {
    this.todos.splice(index, 1);
  }

  deleteMulti() {
    for (let t = this.todos.length -1; t >= 0; t--) {
      const todo = this.todos[t];
      if (todo.selected) this.todos.splice(t, 1);
    }
  }

}
