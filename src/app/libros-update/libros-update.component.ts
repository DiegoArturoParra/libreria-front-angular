import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Autor } from '../models/Autor';
import { Libro } from '../models/Libro';
import { LibroService } from '../services/libro.service';
import { AutorService } from '../services/autor.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-libros-update',
  templateUrl: './libros-update.component.html',
  styleUrls: ['./libros-update.component.css'],
})
export class LibrosUpdateComponent implements OnInit {
  listadoAutores?: Autor[];
  autor?: Autor;
  fechaActual?: Date;
  libro: Libro = {
    Descripcion: '',
    FechaSalida: new Date(),
    ISBN: '',
    Nombre: '',
    NumeroDePaginas: 0,
  };
  constructor(
    private libroService: LibroService,
    private autorService: AutorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadLibroActual();
    this.loadListadoAutores();
  }
  loadLibroActual() {
    this.libroService.get(this.route.snapshot.params['id']).subscribe(
      (data) => {
        this.libro = data;
       this.pipeFecha(this.libro.FechaSalida.toString())
      },
      (error) => {
        console.log(error);
      }
    );
  }
  loadAutorActual(): void {
    this.autor = this.listadoAutores.find(x => x.Id == this.libro.AutorId);
  }

  pipeFecha(fecha: string): void {
    let arr = fecha.split('/');
    fecha =`${arr[1]}/${arr[0]}/${arr[2]}`;
    this.fechaActual = new Date(fecha);
  }

  loadListadoAutores(): void {
    this.autorService.getAll().subscribe(
      (data) => {
        this.listadoAutores = data;
        if (this.listadoAutores.length > 0) {
          this.loadAutorActual();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarLibro(): void {
    this.libro.AutorId = this.autor?.Id;
    this.libro.FechaSalida = this.fechaActual;
    this.libroService.update(this.libro).subscribe(
      (response) => {
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${response.Mensaje}`,
          showConfirmButton: false,
          timer: 2000,
        });
        this.router.navigate(['/libros']);
      },
      (error) => {
        console.log(error);
        let errores = {
          ISBN: [''],
          Descripcion: [''],
          Nombre: [''],
        };

        let Mensaje: string = '';
        errores = error.error.errors;
        Object.entries(errores).forEach(([key, value]) => {
          Mensaje += '<br>' + value + '<br>';
        });
        swal.fire('Errores', Mensaje);
      }
    );
  }
}
