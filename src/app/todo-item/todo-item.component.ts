import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { isUndefined } from 'util';
import { TodoItem } from '../todolist.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
 
  @Input() data! : TodoItem;
  @Output() update :  EventEmitter<Partial<TodoItem>> = new EventEmitter<Partial<TodoItem>>();
  @Output() remove : EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  editing = false;
  newValue!: string;

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  updateValue(): void {
    if (this.newValue !== undefined && this.newValue !== '') {
      this.update.emit({label: this.newValue});
    }
    this.changeEditingMode();
  }

  changeEditingMode(): void {
    this.editing = !this.editing;
  }

  
  delete(): void {
    this.remove.emit(this.data);
  }

  updateDone(event: any): void {
    this.update.emit({isDone: event.target.checked});
  }
}
