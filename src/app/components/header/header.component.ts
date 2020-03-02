import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private todoService: TodoService) {}

  hasTodo$: Observable<boolean>;
  isAllCompleted$: Observable<boolean>;

  ngOnInit() {
    this.hasTodo$ = this.todoService.length$.pipe(map(length => !!length));
    this.isAllCompleted$ = this.todoService.todos$.pipe(map(todos => todos.every(t => t.isCompleted)));
  }

  toggleAll() {
    this.todoService.toggleAll();
  }

}
