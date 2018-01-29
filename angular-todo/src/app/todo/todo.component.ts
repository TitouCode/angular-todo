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

  addElement() {
    const lastElement = this.todos.length - 1;
    if (this.todos && !this.todos[lastElement].name) return false;
    this.todos.unshift(new Todo());
  }

  // addElement() {
  //   if (this.newTodo && !this.newTodo.name) return false;
  //   this.todos.push(Object.assign({}, this.newTodo));
  //   this.newTodo.name = '';
  // }

  saveElement(row, index) {
    if (!row._id) {
      this.api.createOne('todos', row).subscribe((res) =>
        this.todos[index] = new Todo(res)
      );
      return true;
    }
    this.api.updateOne('todos', row._id, row).subscribe((res) => row = res);
  }
  deleteElement(id, index) {
    this.api.deleteOne('todos', id).subscribe(
        (res) => {
          this.todos.splice(index, 1);
        }
      );
  }

  deleteMulti() {
    const ids = this.todos.filter((t) => t.selected).map((t) => t._id);
    this.api.delete('todos', ids).subscribe(
        (res) => {
          for (let t = this.todos.length -1; t >= 0; t--) {
            const todo = this.todos[t];
            if (todo.selected) this.todos.splice(t, 1);
          }
        }
      );
  }

}
