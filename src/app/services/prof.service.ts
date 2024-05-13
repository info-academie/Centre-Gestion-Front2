import { Injectable } from '@angular/core';
import { User } from 'app/models/User';
import { SuperService } from './super.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfService extends SuperService<User>{



    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() {
        super('prof');

    }
    get data$(): Observable<any> {
        return this._data.asObservable();
    }
    searchProfs(nom,prenom,email){

        return this.http.get(`${this.urlApi}/${this.controller}/Search/${nom}/${prenom}/${email}`)

    }

    // getAll(): Observable<any> {
    //     return this.http.get(`${this.urlApi}/${this.controller}/GetAll`)
    //         .pipe(
    //             tap((response: any) => {
    //                 this._data.next(response);
    //             }),
    //         );
    // }
}
