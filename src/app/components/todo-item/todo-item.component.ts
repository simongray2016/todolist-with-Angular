import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

const fadeAnimation = trigger('fadeAnimation', [
  state(
    'incomplete',
    style({
      fontSize: '24px',
    }),
  ),
  state(
    'completed',
    style({
      color: 'lightgrey',
      textDecoration: 'line-through',
    }),
  ),
  transition('active <=> completed', [animate(150)]),
]);

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  animations: [fadeAnimation],
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('editInput', {static: true}) editInputElm: ElementRef;

  isHovered = false;
  isEditing = false;

  constructor() { }

  ngOnInit() {
  }

  changeTodoStatus() {
    this.changeStatus.emit({...this.todo, isCompleted: !this.todo.isCompleted});
  }

  submitEdit(event: KeyboardEvent) {
    const {keyCode} = event;
    event.preventDefault();
    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }

  showEditInput() {
    this.isEditing = true;
    setTimeout(() => this.editInputElm.nativeElement.focus(), 10);
  }

  removeTodo() {
    this.deleteTodo.emit(this.todo.id);
  }
}
