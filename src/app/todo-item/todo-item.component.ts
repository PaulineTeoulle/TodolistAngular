

import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import { TodoItem, TodolistService } from '../todolist.service';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {

  @Input() todo!: TodoItem;

  @Output() deleteEmitter: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() updateEmitter: EventEmitter<Partial<TodoItem>> = new EventEmitter<Partial<TodoItem>>();
  editMode = false;
  newValue!: string;

  delete(): void {
    this.deleteEmitter.emit(this.todo);
  }

  changeEditMode(): void {
    this.editMode = !this.editMode;
  }

  updateItem(): void {
    if (this.newValue !== undefined && this.newValue !== '') {
      this.updateEmitter.emit({label: this.newValue});
    }
    this.changeEditMode();
  }

  updateItemDone(event: any): void {
    this.updateEmitter.emit({isDone: event.target.checked});
  }
}
