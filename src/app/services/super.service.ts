import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperService<T> {
  protected http = inject(HttpClient);
  protected urlApi: string = environment.apiUrl;// InjectService.injector.get('API_URL');
  protected url: string = environment.url;

  constructor(public controller: string) { }




  getAll = () => this.http.get<T>(`${this.urlApi}/${this.controller}/getAll`);

  put = (id: number | string, o: T) => this.http.put<any>(`${this.urlApi}/${this.controller}/put/${id}`, o);

  get = () => this.http.get<T[]>(`${this.urlApi}/${this.controller}/get`);

  count = () => this.http.get<number>(`${this.urlApi}/${this.controller}/count`);

  getOne = (id: any) => this.http.get<T>(`${this.urlApi}/${this.controller}/getById/${id}`);

  post = (o: T) => this.http.post<T>(`${this.urlApi}/${this.controller}/post`, o);

  getInputs():Observable<any> { // get all clients and classes
    return this.http.get(`${this.urlApi}/${this.controller}/GetInputs`)
}

  /**
   * Exemple
   * const model = [ { op: 'replace', path: '/email', value: obj.email }];
   */
  patch(id: number, model: { op: string, path: string, value: any }[]) {
    return this.http.patch<T>(`${this.urlApi}/${this.controller}/patch/${id}`, model);
  }

  delete = (id: any) => this.http.delete<any>(`${this.urlApi}/${this.controller}/delete/${id}`);


}
