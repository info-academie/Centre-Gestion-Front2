import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Payment } from 'app/models/Payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService  extends SuperService<Payment>  {

    constructor() {
        super('payment');

    }
    getPayments(): Observable<any> {
        return this.http.get(`${this.urlApi}/${this.controller}/GetAll`)

    }
    filter( year : string , month : string , classId: number): Observable<any> {
        if (year === '') {
            year = '*'
        }


        if (month === '') {
            month = '*'
        }

        if (!classId) {
            classId = 0
        }

            return this.http.get(`${this.urlApi}/${this.controller}/Filter/${year}/${month}/${classId}`)

    }



}
