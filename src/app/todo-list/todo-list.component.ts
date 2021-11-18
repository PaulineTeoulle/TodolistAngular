import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {TodolistService, TodoList, TodoItem} from '../todolist.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  todoInputValue: string;
  todoListService: TodolistService;

  constructor(service: TodolistService) {
    this.todoListService = service;
    this.todoInputValue = '';
  }

  addTodo(): void {
    console.log('add TODO');
    this.todoListService.append(this.todoInputValue);
    this.todoInputValue = '';
  }

  deleteTodo(todo: TodoItem): void {
    this.todoListService.remove(todo);
  }

  updateTodo(event: Partial<TodoItem>, todo: TodoItem): void {
    this.todoListService.update(event, todo);
  }

  getItemsNotDone(itemList: Readonly<TodoItem[]>) :number{
    return itemList.reduce((count, item)=> (!item.isDone ? count +1 : count), 0);
  }
}



