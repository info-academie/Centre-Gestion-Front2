import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Discussion } from 'app/models/Discussion';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService extends SuperService<Discussion> {

    constructor() {
      super('discussions');
    }
    getAllDiscussionsId(idUser:number ):Observable<any> {
        return this.http.get(`${environment.apiUrl}/${this.controller}/custom/${idUser}`);
      }
}
