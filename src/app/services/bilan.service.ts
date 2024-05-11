import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Observable } from 'rxjs';
import { Bilan } from 'app/models/Bilan';
@Injectable({
  providedIn: 'root'
})
export class BilanService  extends SuperService<Bilan> {

    constructor() {
        super('bilan');

    }
    getOne1(id): Observable<any> {
        return this.http.get(`${this.urlApi}/${this.controller}/GetById/${id}`)

    }


}
