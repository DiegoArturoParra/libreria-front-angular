import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Autor } from '../models/Autor';
import { AutorService } from '../services/autor.service';

@Component({
  selector: 'app-autores-update',
  templateUrl: './autores-update.component.html',
  styleUrls: ['./autores-update.component.css']
})
export class AutoresUpdateComponent implements OnInit {

  autor: Autor = {
    Nombre: '',
    Apellido: '',
    Edad: 0
  };
  Mensaje: string = '';

  constructor(private autorService: AutorService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.autorService.get(+this.route.snapshot.params['id'])
      .subscribe(autor => this.autor = autor);
  }
  saveAutor(): void {
    this.autorService.update(this.autor)
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
          alert(error.Mensaje);
        });
  }
}
