import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { QRCodeModule } from 'angular2-qrcode';
import { SpeechRecognitionService } from "./speechRecognition.service";
import { ColorPickerComponent } from './color-picker/color-picker.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    ColorPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    QRCodeModule,
  ],
  providers: [SpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
