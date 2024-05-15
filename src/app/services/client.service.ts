import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Client } from 'app/models/Client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService   extends SuperService<Client>{
    constructor() {
        super('client');

    }
//   getClients = () => this.http.get<T>(`${this.urlApi}/${this.controller}/getAll`);

  getClients(): Observable<any> {
        return this.http.get(`${this.urlApi}/${this.controller}/GetAll`)

    }

    filter( nom : string , prenom : string , classId: number): Observable<any> {
        if (nom === '') {
            nom = '*'
        }

        if (prenom === '') {
            prenom = '*'
        }

        if (!classId) {
            classId = 0
        }

            return this.http.get(`${this.urlApi}/${this.controller}/Filter/${nom}/${prenom}/${classId}`)

    }

}
