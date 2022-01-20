import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Autor } from '../models/Autor';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from '../services/autor.service';

@Component({
  selector: 'app-autores-add',
  templateUrl: './autores-add.component.html',
  styleUrls: ['./autores-add.component.css']
})
export class AutoresAddComponent implements OnInit {

  autor: Autor = {
    Nombre: '',
    Apellido: '',
    Edad: 0
  };
  Mensaje: string = '';

  constructor(private autorService: AutorService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveAutor(): void {
    this.autorService.create(this.autor)
      .subscribe(
        response => {
          this.Mensaje = response.Mensaje;
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${this.Mensaje}`,
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/autores']);
        },
        error => {
          console.log(error);
          swal.fire("Errores", error.error.Message);
        });
  }
}
