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
  
  editMode: boolean = false;
  newValue!: string;
  editColorMode: boolean=false;
  newColor!: string;

  //Call the emitter to delete an item
  deleteItem(): void {
    this.deleteEmitter.emit(this.todo);
  }

  /*
    Change the editMode boolean 
    Autofocus on the input
  */
  changeEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      requestAnimationFrame(
        () => this.newTextInput.nativeElement.focus()
      );
    }
  }

  //Call the emitter to update label of an item
  updateItem(): void {
    if (this.newValue !== undefined && this.newValue !== '') {
      this.updateEmitter.emit({label: this.newValue});
    }
    this.changeEditMode();
  }

  //Call the emitter to update color of an item
  updateColorItem(){    
    if (this.newColor !== undefined && this.newColor !== '') {
      this.updateEmitter.emit({color: this.newColor});
    }
    this.changeColorMode();
  }

  //Change the editColorMode boolean
  changeColorMode(): void {
    this.editColorMode = !this.editColorMode;
  } 

  //Call the emitter to update isDone of an item
  updateItemDone(event: any): void {
    this.updateEmitter.emit({isDone: event.target.checked});
  }
}
