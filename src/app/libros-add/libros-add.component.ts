import { Component, OnInit } from '@angular/core';
import { Autor } from '../models/Autor';
import { LibroService } from '../services/libro.service';
import { AutorService } from '../services/autor.service';
import { Libro } from '../models/Libro';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libros-add',
  templateUrl: './libros-add.component.html',
  styleUrls: ['./libros-add.component.css']
})
export class LibrosAddComponent implements OnInit {

  listadoAutores?: Autor[];
  autor?: Autor;
  libro: Libro = {
    Descripcion: '',
    FechaSalida: new Date(),
    ISBN: '',
    Nombre: '',
    NumeroDePaginas: 0
  }
  constructor(private libroService: LibroService, private autorService: AutorService,
    private router: Router) { }

  ngOnInit() {
    this.loadListadoAutores();
  }
  loadListadoAutores(): void {
    this.autorService.getAll().subscribe(
      (data) => {
        this.listadoAutores = data;
        this.autor = this.listadoAutores[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }


  guardarLibro(): void {
    this.libro.AutorId = this.autor?.Id;
    this.libroService.create(this.libro).subscribe(
      (response) => {
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${response.Mensaje}`,
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigate(['/libros']);
      },
      (error) => {
        console.log(error);
        let errores = {
          ISBN: [''],
          Descripcion: [''],
          Nombre: ['']
        };

        let Mensaje: string = '';
        errores = error.error.errors;
        Object.entries(errores).forEach(([key, value]) => {
          Mensaje += "<br>" + value + "<br>";
        });
        swal.fire("Errores", Mensaje);
      }
    );
  }
}
