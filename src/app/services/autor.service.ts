import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Autor } from '../models/Autor';
const baseUrl = 'https://localhost:44358/api/autores';
@Injectable({
  providedIn: 'root',
})
export class AutorService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${baseUrl}/listado`);
  }

  get(id: any): Observable<Autor> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  conteoLibros(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/conteo-libros/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/crear`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/editar`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
