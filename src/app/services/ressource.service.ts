import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Observable } from 'rxjs';
import { Ressource } from 'app/models/Ressource';
@Injectable({
  providedIn: 'root'
})
export class RessourceService extends SuperService<Ressource> {

    constructor() {
        super('ressource');

    }
    filter(year , month) : Observable <any> {
        return this.http.get(`${this.urlApi}/${this.controller}/Filter/${year}/${month}`)

    }
    getRessources(): Observable<any> {
        return this.http.get(`${this.urlApi}/${this.controller}/GetAll`)

    }
}
