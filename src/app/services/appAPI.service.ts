import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppApiService {

  apiUrl = 'http://localhost:3000/api/';

  constructor(private _http: HttpClient) { }



  //Ir buscar todos os tempos
  getAllTimes(): Observable<any> {
    return this._http.get(this.apiUrl + 'tempos');
  }

  //Adicionar um novo tempo
  addTime(time: any): Observable<any> {
    return this._http.post(this.apiUrl + 'tempos', time); // VER SE DEVO ADICIONAR TEMPO DIRETO 
  }

  //Apagar um tempo 
  deleteTime(time: any): Observable<any> {
    return this._http.delete(this.apiUrl + 'tempos'+ time._id + '/delete');
  }

  //Editar um tempo
  editTime(time: any): Observable<any> {
    return this._http.put(this.apiUrl + 'tempos/' + time._id, time);
  }
}
