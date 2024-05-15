import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Presence } from 'app/models/Presence';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService  extends SuperService<Presence> {


  constructor() {
    super('presence');

}
// in cretion of a presence object we need all the classes and profs this method serves that goal

getInputsData(): Observable<any> {
  return this.http.get(`${this.urlApi}/${this.controller}/getInputsData`)

}
getStudentsOfClass(id:number): Observable<any> {
  return this.http.get(`${this.urlApi}/${this.controller}/getStudentsOfClass/${id}`)

}
filter( year : string , month : string , classId: number): Observable<any> {
    if (year === '') {
        year = '*'
    }
    console.log('year')
    console.log(year)

    if (month === '') {
        month = '*'
    }

    if (!classId) {
        classId = 0
    }

        return this.http.get(`${this.urlApi}/${this.controller}/Filter/${year}/${month}/${classId}`)

}

}
