import { Component } from '@angular/core';
import {TodolistService, TodoItem} from '../todolist.service';
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

  addTodoItem(): void {
    this.todoListService.append(this.todoInputValue);
    this.todoInputValue = '';
  }

  deleteTodoItem(todoItem: TodoItem): void {
    this.todoListService.remove(todoItem);
  }

  updateTodoItem(event: Partial<TodoItem>, todoItem: TodoItem): void {
    this.todoListService.update(event, todoItem);
  }

  getItemsNotDone(itemList: Readonly<TodoItem[]>) :number{
    return itemList.reduce((count, item)=> (!item.isDone ? count +1 : count), 0);
  }

  deleteAllItems(itemList: Readonly<TodoItem[]>){
    itemList.forEach(element => {
      this.todoListService.remove(element);
    });
  }
}



