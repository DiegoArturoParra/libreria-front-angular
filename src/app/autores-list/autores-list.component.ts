import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Autor } from '../models/Autor';
import { AutorService } from '../services/autor.service';
import { LibroService } from '../services/libro.service';
import { Libro } from '../models/Libro';

@Component({
  selector: 'app-autores-list',
  templateUrl: './autores-list.component.html',
  styleUrls: ['./autores-list.component.css'],
})
export class AutoresListComponent implements OnInit {
  autores?: Autor[];
  actualAutor: Autor = {};
  currentIndex = -1;
  libros?: Libro[];

  constructor(private autorService: AutorService, private libroService: LibroService) { }

  ngOnInit() {
    this.cargarAutores();
  }

  cargarAutores(): void {
    this.autorService.getAll().subscribe(
      (data) => {
        this.autores = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  verLibros(id: any): void {
    this.libroService.getLibrosByAutor(id).subscribe(
      (data) => {
        this.libros = data;
        if (this.libros.length == 0) {
          swal.fire('Libros', `No tiene libros.`)
        }
        else {
          let listado: string = "";
          this.libros.forEach(element => {
            listado += "<br><strong>Nombre: </strong>" + element.Nombre + "<br><strong>ISBN: </strong>" + element.ISBN +
              "<br><strong>Fecha de publicación: </strong>" + element.FechaSalida
              + "<br><strong>Numero de paginas: </strong>" + element.NumeroDePaginas + "<br><strong>Descripción: </strong>"
              + element.Descripcion + "<br>"
          });

          swal.fire('Libros', `${listado}`)
        }
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );

  }

  conteo(id: any): any {
    this.autorService.conteoLibros(id).subscribe(
      (data) => {
        this.eliminar(data, id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.cargarAutores();
    this.actualAutor = {};
    this.currentIndex = -1;
  }

  setActiveAutor(autor: Autor, index: number): void {
    this.actualAutor = autor;
    this.currentIndex = index;
  }

  eliminarAutor(id: any) {
    this.conteo(id);
  }

  eliminar(count: any, id: any) {
    let mensaje = confirm(
      `¿Deseas eliminar el autor? tiene: ${count} libros, si elimina el autor se eliminaran los libros.`
    );
    if (mensaje) {
      this.autorService.delete(id).subscribe(
        (data) => {
          alert('¡se ha eliminado satisfactoriamente!');
          this.refreshList();
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
    }
  }
}
