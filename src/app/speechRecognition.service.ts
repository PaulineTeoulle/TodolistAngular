import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import * as _ from "lodash";

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {
  speechRecognition: any;

  constructor(private zone: NgZone) {}
  /*
    Setup the service of speech recognition
    Get string result from voice record
    Handle error of voice record
    Handle end of voice record
    Handle start of voice record
  */
  record(): Observable<string> {
    return Observable.create((observer:any) => {
      this.setupService();
      this.getStringResult(observer);
      this.handleError(observer);
      this.handleEnd(observer);
      this.handleStart();
    });
  }

  //Set parameters for speech recognition
  setupService(){
    const { webkitSpeechRecognition }: IWindow = <IWindow>(<any>window);
    this.speechRecognition = new webkitSpeechRecognition();
    this.speechRecognition.continuous = false;
    this.speechRecognition.interimresults = true;
    this.speechRecognition.lang = "fr";
  }

  //Get results from voice record
  getStringResult(observer:any){
    this.speechRecognition.onresult = (speech: any) => {
      let text: string = "";
      if (speech.results) {
        var result = speech.results[speech.resultIndex];
        var transcript = result[0].transcript;
          if (result.isFinal) {
            if (result[0].confidence < 0.3) {
              console.log("Pas de reconnaissance de texte -- Veuillez réessayer");
            } else {
              text = _.trim(transcript);
              console.log("Texte entendu : " + text);
            }
          }
      }
      this.zone.run(() => {
        observer.next(text);
      });
    };
  }

  //Return an error to the observer
  handleError(observer:any){
    this.speechRecognition.onerror = function (error : any) {
      observer.error(error);
    };
  }

  //Begin the voice record
  handleStart(){
    this.speechRecognition.start();
  }

  //End the voice record
  handleEnd(observer:any){
    this.speechRecognition.onend = () => {
      observer.complete();
    };
  }
}

