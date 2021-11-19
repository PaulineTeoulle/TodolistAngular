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
  filter : string;
  checkAll : boolean;

  constructor(service: TodolistService) {
    this.todoListService = service;
    this.todoInputValue = '';
    this.filter='filterAll';
    this.checkAll= false;
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

  getItemsNotDone(itemList: Readonly<TodoItem[]>) : number{
    return itemList.reduce((count, item)=> (!item.isDone ? count +1 : count), 0);
  }

  deleteAllItems(itemList: Readonly<TodoItem[]>) : void {
    itemList.forEach(item => {
      this.todoListService.remove(item);
    });
  }

  deleteCheckedItems(itemList: Readonly<TodoItem[]>) : void{
    itemList.forEach(item => {
      if(item.isDone){
        this.todoListService.remove(item);
      }
    });
  }

  checkAllItems(){
    this.todoListService.updateAll({isDone: this.checkAll});
    this.checkAll = !this.checkAll;
  }

  setFilter(filter: string){
    this.filter=filter;
  }

  isItemFiltered(todoItem: TodoItem){
    if(this.filter==='filterAll'){
      return true;
    }
    if(this.filter==='filterActives' && !todoItem.isDone){
      return true;
    }
    if(this.filter==='filterCompleted' && todoItem.isDone){
      return true;
    }
    return false;
  }

  undo(){
    this.todoListService.undo();
  }

  redo(){
    this.todoListService.redo();
  }
}



