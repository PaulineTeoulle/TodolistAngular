

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

  deleteItem(): void {
    this.deleteEmitter.emit(this.todo);
  }

  ngOnInit(): void{
    let element:HTMLElement = document.getElementsByClassName("circleBase")[0] as HTMLElement;
    if(element !=null){
      element.style.backgroundColor = this.newColor;
    }
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

  updateColorItem(){    
    if (this.newColor !== undefined && this.newColor !== '') {
      this.updateEmitter.emit({color: this.newColor});
    }
    this.changeColorMode();
  }

  changeColorMode(): void {
    this.editColorMode = !this.editColorMode;
  } 

  updateItemDone(event: any): void {
    this.updateEmitter.emit({isDone: event.target.checked});
  }
  
}
