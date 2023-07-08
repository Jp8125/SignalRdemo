import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class ChatService {
private hubConnection: signalR.HubConnection;
public messageReceived: Subject<{ user: string, message: string }> = new Subject();

constructor() { 
  this.hubConnection = new signalR.HubConnectionBuilder()
.withUrl('https://localhost:7021/ep1') // Replace with your backend URL
.build();
this.startConnection();
}

public startConnection() {
this.hubConnection.start().then(() => {
console.log('Connection started');
this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
this.messageReceived.next({ user, message });
});
}).catch(err => console.error(err));
}

public sendMessage(user: string, message: string) {
  
  console.log(user + ' ' + message);
  
this.hubConnection.invoke('SendMessage', user, message);
}
}