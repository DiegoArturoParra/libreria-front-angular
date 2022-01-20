import { Component, OnInit } from '@angular/core';
import { Libro } from '../models/Libro';
import { LibroService } from '../services/libro.service';
import { AutorService } from '../services/autor.service';
import { Autor } from '../models/Autor';
import swal from 'sweetalert2';
@Component({
  selector: 'app-libros-list',
  templateUrl: './libros-list.component.html',
  styleUrls: ['./libros-list.component.css']
})
export class LibrosListComponent implements OnInit {
  libros?: Libro[];
  actualLibro: Libro = {
    FechaSalida: new Date()
  };
  autor: Autor = {};
  currentIndex = -1;


  constructor(private libroService: LibroService, private autorService: AutorService) { }

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros(): void {
    this.libroService.getAll().subscribe(
      (data) => {
        this.libros = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  refreshList(): void {
    this.cargarLibros();
    this.actualLibro = {
      FechaSalida: new Date()
    };
    this.currentIndex = -1;
  }

  setActiveLibro(libro: Libro, index: number): void {
    this.actualLibro = libro;
    this.currentIndex = index;
  }



  verAutor(id: any): void {
    this.autorService.get(id).subscribe(
      (data) => {
        this.autor = data;
        swal.fire('Autor', `${this.autor.Nombre} ${this.autor.Apellido}
        <br><strong>Edad</strong>: ${this.autor.Edad}`)
      },
      (error) => {
        console.log(error);
        alert(error);
      }
    );

  }

  eliminarLibro(id: any): void {
    let mensaje = confirm(
      `¿Deseas eliminar el libro?`
    );
    if (mensaje) {
      this.libroService.delete(id).subscribe(()=> {
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
