import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/Libro';
const baseUrl = 'https://localhost:44389/api/libros';
@Injectable({
  providedIn: 'root',
})
export class LibroService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${baseUrl}/listado`);
  }
  getLibrosByAutor(id: any): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${baseUrl}/listado-libros-by-autor/${id}`);
  }

  get(id: any): Observable<Libro> {
    return this.http.get(`${baseUrl}/${id}`);
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
