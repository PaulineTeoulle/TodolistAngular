import { Component, ElementRef, Output, EventEmitter,ViewChild } from '@angular/core';
import {TodolistService, TodoItem, tdlToString, TodoList} from '../todolist.service';
import $ from "jquery";
import { SpeechRecognitionService } from "../speechRecognition.service";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {


  @Output() updateEmitter: EventEmitter<Partial<TodoItem>> = new EventEmitter<Partial<TodoItem>>();
  @ViewChild('newLabelInput') newTextInput!: ElementRef<HTMLInputElement>;

  todoListService: TodolistService;
  speechRecognitionService: SpeechRecognitionService;

  inputSpeechText: string;
  filter : string;
  todoInputValue: string;
  checkAll : boolean;
  imgPath : any = "../../mic.ico";
  newLabel: string ;
  editMode = false;

  constructor(todoListService: TodolistService, speechRecognitionService: SpeechRecognitionService){
    this.todoListService = todoListService;
    this.todoInputValue = '';
    this.filter='filterAll';
    this.checkAll= false;
    this.inputSpeechText = "";
    this.newLabel="";
    this.speechRecognitionService = speechRecognitionService;
  }

  toStringQR(todolist: TodoList) : string{
    let newString : string = tdlToString(todolist);
    let stringForQR : string[] = [];
    stringForQR.push(newString);
    return stringForQR[0];
  }

  addTodoItem() : void {
    this.todoListService.append(this.todoInputValue);
    this.todoInputValue = '';
  }

  deleteTodoItem(todoItem: TodoItem) : void {
    this.todoListService.remove(todoItem);
  }

  updateTodoItem(event: Partial<TodoItem>, todoItem: TodoItem) : void {
    this.todoListService.update(event, todoItem);
  }

  getItemsNotDone(itemList: Readonly<TodoItem[]>) : number {
    return itemList.reduce((count, item)=> (!item.isDone ? count +1 : count), 0);
  }

  deleteAllItems(itemList: Readonly<TodoItem[]>) : void {
    itemList.forEach(item => {
      this.todoListService.remove(item);
    });
  }

  deleteCheckedItems(itemList: Readonly<TodoItem[]>) : void {
    itemList.forEach(item => {
      if(item.isDone){
        this.todoListService.remove(item);
      }
    });
  }

  checkAllItems() : void {
    this.todoListService.updateAll({isDone: this.checkAll});
    this.checkAll = !this.checkAll;
  }

  setFilter(filter: string) : void {
    this.filter=filter;
  }

  isItemFiltered(todoItem: TodoItem) : boolean {
    if(this.filter==='filterAll'){
      $('.filterAll').addClass('active');
        $('.filterActives').removeClass('active');
        $('.filterCompleted').removeClass('active');
      return true;
    }
    if(this.filter==='filterActives' && !todoItem.isDone){
      $('.filterActives').addClass('active');
      $('.filterAll').removeClass('active');
      $('.filterCompleted').removeClass('active');
      return true;
    }
    if(this.filter==='filterCompleted' && todoItem.isDone){
      $('.filterCompleted').addClass('active');
        $('.filterAll').removeClass('active');
        $('.filterActives').removeClass('active');
        $(this).addClass('active');
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

  activeSpeechRecognition() : void {
    this.speechRecognitionService.record().subscribe(
      (value : string) => {
        this.inputSpeechText = value;
        this.todoListService.append(this.inputSpeechText);
      },
      (error : string) => {
        if (error === "no-speech") {
          this.activeSpeechRecognition();
        }
      }
    );
  }

  changeEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      requestAnimationFrame(
        () => this.newTextInput.nativeElement.focus()
      );
    }
  }

  updateListLabel(): void {
    if (this.newLabel !== undefined && this.newLabel !== '') {
      this.todoListService.updateListLabel(this.newLabel);
    }
    this.changeEditMode();
  }
}
