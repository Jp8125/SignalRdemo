import { Component } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  Messages:Array<{ user:string, message:string }>=[]
  message!:string
  user!:string
constructor(private chat:ChatService) { 
  this.chat.messageReceived.subscribe(res=>
   { 
    console.log(res)
    this.Messages=[...this.Messages,res]
  }
    )
}
Send(){
  this.chat.sendMessage(this.user,this.message)
}
}
