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
  pageTitle: string = 'Mes todos';
  enableDeleteMulti: boolean = false;
  loading: boolean = true;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAll('todos').subscribe(
        (todos) => {
          this.todos = todos;
          this.loading = false;
        }
      );
  }

  /**
  * [Add element to todos]
  */
  addElement() {
    this.enableDeleteMulti = false;
    const lastElement = this.todos.length - 1;
    if (this.todos.length > 0 && !this.todos[lastElement].name) return false;
    this.todos.unshift(new Todo({ isDone: false }));
  }

  /**
  * [Detect change on element]
  */
  detectChange(element, i) {
    this.enableDeleteMulti = false;
    this.todos[i].hasChanged = true;
  }

  /**
  * [Mark as done or not and save]
  */
  toggleSelected(row, i) {
    this.todos[i].selected = !row.selected;
  }

  /**
  * [Mark as done or not and save]
  */
  toggleDone(row, i) {
    this.enableDeleteMulti = false;
    this.todos[i].isDone = !row.isDone;
    this.api.updateOne('todos', row._id, row).subscribe((res) => this.todos[i] );
  }

  /**
  * [Save one Element]
  */
  saveElement(row, index) {
    this.enableDeleteMulti = false;
    if (!row._id) {
      this.api.createOne('todos', row).subscribe((res) =>
        this.todos[index] = new Todo(res)
      );
      return true;
    }
    this.api.updateOne('todos', row._id, row).subscribe((res) => this.todos[index].hasChanged = false );
  }

  /**
  * [delete one Element]
  */
  deleteElement(id, index) {
    this.enableDeleteMulti = false;
    this.api.deleteOne('todos', id).subscribe(
        (res) => {
          this.todos.splice(index, 1);
        }
      );
  }

  /**
  * [delete Multiple element if they are selected. Also enable selection]
  */
  deleteMulti() {
    if (!this.enableDeleteMulti) {
      this.enableDeleteMulti = true;
      return true
    }
    const ids = this.todos.filter((t) => t.selected).map((t) => t._id);
    this.api.delete('todos', ids).subscribe(
        (res) => {
          for (let t = this.todos.length -1; t >= 0; t--) {
            const todo = this.todos[t];
            if (todo.selected) this.todos.splice(t, 1);
          }
          this.enableDeleteMulti = false;
        }
      );
  }

  /**
  * [set Filter for elements]
  */
  setFilter(filters) {
    this.enableDeleteMulti = false;
    this.api.getAll('todos', filters).subscribe((todos) => this.todos = todos);
  }
  /**
  * [reset the filter]
  */
  resetFilter() {
    this.enableDeleteMulti = false;
    this.api.getAll('todos').subscribe((todos) => this.todos = todos);
  }

}
