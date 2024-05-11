import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Message } from 'app/models/Message';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends SuperService<Message> {

  constructor() {
    super('messages');
  }
  getMessagesOfDisscution(id:number):Observable<any>{
    return this.http.get<Message[]>(`${environment.apiUrl}/${this.controller}/${id}`);
  }
  SendData(message: Message): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${this.controller}`, message)
  }

}
