import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {TodolistService, TodoList, TodoItem} from './todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  input = "input";

  constructor(private todolistService:TodolistService) {
  }

  get obsTodoList(): Observable<TodoList>{
    return this.todolistService.observable;
  }

  append(label:string): void{
    this.todolistService.append(label);
  }

  updateValue(value:any,item:TodoItem):void{
    this.todolistService.update(value,item);
  }
  
  deleteItem(item:TodoItem):void{
    this.todolistService.remove(item);
  }

}
