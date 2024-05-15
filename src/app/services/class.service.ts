import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Class } from 'app/models/Class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService  extends SuperService<Class>  {

    constructor() {
        super('class');

    }

    filter(nom: string, type: string, salle: string, profId: any, specialite: string): Observable<any> {
        // Check each parameter and replace with '*' if empty

        return this.http.get(`${this.urlApi}/${this.controller}/Filter/${nom}/${type}/${salle}/${profId}/${specialite}`);
    }

}
