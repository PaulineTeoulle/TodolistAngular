import { Component, ElementRef, Output, EventEmitter,ViewChild } from '@angular/core';
import {TodolistService, TodoItem, tdlToString, TodoList} from '../todolist.service';
import {DomSanitizer} from '@angular/platform-browser';
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
  imgPath : string = "../../mic.ico";
  newLabel: string ;
  editListLabelMode: boolean = false;
  listImg: any;

  //Constructor with services and DomSanitizer
  constructor(todoListService: TodolistService, speechRecognitionService: SpeechRecognitionService, private sanitizer:DomSanitizer){
    this.todoListService = todoListService;
    this.todoInputValue = '';
    this.filter='filterAll';
    this.checkAll= false;
    this.inputSpeechText = "";
    this.newLabel="";
    this.speechRecognitionService = speechRecognitionService;
  }

  //Get listImg for the list before render
  ngOnInit(): void{
    let src = localStorage.getItem("listImg");
    if (src != null){
      this.listImg = JSON.parse(src)['image'];
    } 
    this.sanitize(this.listImg);
    this.todoListService.updateImg(this.listImg);
  }

  //Sanitize url when getting file
  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  /*
    Create localStorage item with the file string 
    Call the service to update the todolist img 
  */
  onFileChange(event:any){
    let src;
    let reader = new FileReader();
    reader.onload = () => {
      src = reader.result;
      localStorage.setItem('listImg', JSON.stringify(  {"image" : src}));
      this.listImg = src;
      this.todoListService.updateImg(this.listImg);
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  //Return a QR Code string with the list data
  toStringQR(todolist: TodoList) : string{
    let newString : string = tdlToString(todolist);
    let stringForQR : string[] = [];
    stringForQR.push(newString);
    return stringForQR[0];
  }

  //Call the service to add an item
  addTodoItem() : void {
    this.todoListService.append(this.todoInputValue);
    this.todoInputValue = '';
  }

  //Call the service to delete an item
  deleteTodoItem(todoItem: TodoItem) : void {
    this.todoListService.remove(todoItem);
  }

  //Call the service to update an item
  updateTodoItem(event: Partial<TodoItem>, todoItem: TodoItem) : void {
    this.todoListService.update(event, todoItem);
  }

  //Return a list with undone items
  getItemsNotDone(itemList: Readonly<TodoItem[]>) : number {
    return itemList.reduce((count, item)=> (!item.isDone ? count +1 : count), 0);
  }

  //Call the service to delete all items in the todolist
  deleteAllItems(itemList: Readonly<TodoItem[]>) : void {
    itemList.forEach(item => {
      this.todoListService.remove(item);
    });
  }

  //Call the service to delete done items in the todolist
  deleteCheckedItems(itemList: Readonly<TodoItem[]>) : void {
    itemList.forEach(item => {
      if(item.isDone){
        this.todoListService.remove(item);
      }
    });
  }

  //Call the service to update all items for the done attribute
  checkAllItems() : void {
    this.todoListService.updateAll({isDone: this.checkAll});
    this.checkAll = !this.checkAll;
  }

  //Set the filter
  setFilter(filter: string) : void {
    this.filter=filter;
  }

  /*
    Check if an item is filtered or not
    Add style to filters
  */
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
      return true;
    }
    return false;
  }

  //Call the service to undo the action
  undo(){
    this.todoListService.undo();
  }

  //Call the service to redo the action
  redo(){
    this.todoListService.redo();
  }

  /*
    Record voice
    Call the service to add text if there is value
    Record voice if there is an error
  */
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

  /*
    Change the editListLabelMode
    Autofocus on the input
  */
  changeEditListLabelMode(): void {
    this.editListLabelMode = !this.editListLabelMode;
    if (this.editListLabelMode) {
      requestAnimationFrame(
        () => this.newTextInput.nativeElement.focus()
      );
    }
  }

  //Call the service to update the label of the list
  updateListLabel(): void {
    if (this.newLabel !== undefined && this.newLabel !== '') {
      this.todoListService.updateListLabel(this.newLabel);
    }
    this.changeEditListLabelMode();
  }
}
