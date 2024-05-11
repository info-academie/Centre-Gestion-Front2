import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.startConnection();
  }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5122/chatHub')
      .build();

    this.hubConnection.start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.error('Error while starting SignalR connection: ' + err));
  }

  public sendMessage(user: string, message: string) {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error('Error while sending message: ' + err));
  }

  public receiveMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
        observer.next({ user, message });
      });
    });
  }
}















