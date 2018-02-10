import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessageService {

  message = {
    type:'success',
    body:'success Oh yea it did',
    messageClosed: true
  }
  
  private messageSource = new BehaviorSubject(this.message);
  message$ = this.messageSource.asObservable();

  constructor() { }

  public addMessage(type, body, timer) {
    // valid types are success, danger, info, warning, primary, secondary, light, dark
    this.message.type = type;
    this.message.body = body;
    this.message.messageClosed = false;
    setTimeout(() => this.message.messageClosed = true, timer);

    this.messageSource.next(this.message);
    // this.message = true;
    // setTimeout(() => this.message = false, 3000);
  }

}
