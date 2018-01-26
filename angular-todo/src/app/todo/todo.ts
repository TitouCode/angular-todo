export class Todo {
  id: string;
  name: string;
  selected: boolean;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
