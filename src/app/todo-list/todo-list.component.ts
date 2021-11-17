import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {TodolistService, TodoList, TodoItem} from '../todolist.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {

  listLabel = "";
  todoInputValue: string;
  todoListService: TodolistService;

  constructor(service: TodolistService) {
    this.todoListService = service;
    this.todoInputValue = '';
  }

  ngOnInit(): void {
  }

  updateListLabel(){
  }

  addTodo(): void {
    this.todoListService.append(this.todoInputValue);
    this.todoInputValue = '';
  }

  deleteTodo(todo: TodoItem): void {
    this.todoListService.remove(todo);
  }

  updateTodo(event: Partial<TodoItem>, todo: TodoItem): void {
    this.todoListService.update(event, todo);
  }

  /*getTodoRemainsNumber(list: Readonly< TodoItem[] >): number {
    return list.reduce((total, v) => (!v.isDone ? total + 1 : total), 0);
  }*/

}
