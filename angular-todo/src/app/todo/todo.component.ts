import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  pageTitle: string = 'My Todos';
  constructor() { }

  ngOnInit() {
    this.todos = [{ name: '' }];
  }

  addElement() {
    const lastElement = this.todos.length - 1;
    if (this.todos && !this.todos[lastElement].name) return false;
    this.todos.push({ name: '' });
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
