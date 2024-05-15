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
    filter(year , month) : Observable <any> {
        if (year === '') {
            year = '*'
        }


        if (month === '') {
            month = '*'
        }

        return this.http.get(`${this.urlApi}/${this.controller}/Filter/${year}/${month}`)

    }


}
