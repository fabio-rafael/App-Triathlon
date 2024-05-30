import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  

constructor(private _http: HttpClient) { }
apiUrl = 'http://localhost:3000/';


//Ir buscar todos os tempos
getAllTimes(): Observable<any> {
  return this._http.get(this.apiUrl + 'times');
}
}
