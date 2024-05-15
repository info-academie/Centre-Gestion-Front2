import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Caisse } from 'app/models/Caisse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaisseService extends SuperService<Caisse> {

    constructor() {
        super('caisse');

    }
    getCaisses(): Observable<any> {
        return this.http.get(`${this.urlApi}/${this.controller}/GetAll`)

    }
    getOne1(id):Observable<any>{
        return this.http.get(`${this.urlApi}/${this.controller}/GetCaisse/${id}`)
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
