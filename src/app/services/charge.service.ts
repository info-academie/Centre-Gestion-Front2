import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Observable } from 'rxjs';
import { Charge } from 'app/models/Charge';

@Injectable({
  providedIn: 'root'
})
export class ChargeService extends SuperService<Charge> {

    constructor() {
        super('charge');

    }
    getCharges(): Observable<any> {
        return this.http.get(`${this.urlApi}/${this.controller}/GetAll`)

    }

    filter( year : string , month : string , designation: string): Observable<any> {
        if (year === '') {
            year = '*'
        }


        if (month === '') {
            month = '*'
        }


        if (designation === '') {
            designation = '*'
        }

            return this.http.get(`${this.urlApi}/${this.controller}/Filter/${year}/${month}/${designation}`)

    }
}
