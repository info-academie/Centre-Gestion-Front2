import { Injectable } from '@angular/core';
import { User } from 'app/models/User';
import { SuperService } from './super.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SuperService<User> {

    private _data: BehaviorSubject<any> = new BehaviorSubject(null);
    user$= new BehaviorSubject<User | null>(null);

    constructor() {
        super('user');

    }
    get data$(): Observable<any> {
        return this._data.asObservable();
    }
    searchUsers(nom,prenom,email,idRole){

        return this.http.get(`${this.urlApi}/${this.controller}/Search/${nom}/${prenom}/${email}/${idRole}`)

    }




    GetUsers(): Observable<any> {
        return this.http.get(`${this.urlApi}/${this.controller}/GetAll`)
            .pipe(
                tap((response: any) => {
                    this._data.next(response);
                }),
            );
    }
}
