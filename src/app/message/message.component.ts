import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  message = {
    type:'success',
    body:'success Ran',
    messageClosed: false
  }

  constructor(public messageService: MessageService) { 
    messageService.message$.subscribe(
      message =>
      {
        this.message = message;
      });
  }

  ngOnInit() {
  }

}
