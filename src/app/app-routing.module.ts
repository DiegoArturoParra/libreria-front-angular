import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrosAddComponent } from './libros-add/libros-add.component';
import { LibrosListComponent } from './libros-list/libros-list.component';
import { AutoresListComponent } from './autores-list/autores-list.component';
import { LibrosUpdateComponent } from './libros-update/libros-update.component';
import { AutoresAddComponent } from './autores-add/autores-add.component';
import { AutoresUpdateComponent } from './autores-update/autores-update.component';

const routes: Routes = [
  { path: 'libros', component: LibrosListComponent },
  { path: 'libros/editar/:id', component: LibrosUpdateComponent },
  { path: 'libros/agregar', component: LibrosAddComponent },
  { path: 'autores', component: AutoresListComponent },
  { path: 'autores/editar/:id', component: AutoresUpdateComponent },
  { path: 'autores/agregar', component: AutoresAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
