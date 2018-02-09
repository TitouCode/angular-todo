export class Todo {
  _id: string;
  name: string;
  isDone: boolean;
  hasChanged: boolean;
  selected: boolean;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
