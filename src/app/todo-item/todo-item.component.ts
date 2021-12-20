

import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { TodoItem} from '../todolist.service';

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
  @ViewChild('newTextInput') newTextInput!: ElementRef<HTMLInputElement>;
  
  editMode = false;
  newValue!: string;

  deleteItem(): void {
    this.deleteEmitter.emit(this.todo);
  }

  changeEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      requestAnimationFrame(
        () => this.newTextInput.nativeElement.focus()
      );
    }
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
