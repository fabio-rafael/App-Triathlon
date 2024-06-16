import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppApiService {
  private baseUrl: string = 'http://localhost:3000/api/tempos';

  constructor(private http: HttpClient) {}

  // Obter todos os tempos
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Obter um tempo pelo nome
  getTempoId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Inserir novo tempo
  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // Atualizar tempo existente
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Apagar tempo existente
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
