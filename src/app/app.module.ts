import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoresListComponent } from './autores-list/autores-list.component';
import { AutoresAddComponent } from './autores-add/autores-add.component';
import { AutoresUpdateComponent } from './autores-update/autores-update.component';
import { LibrosListComponent } from './libros-list/libros-list.component';
import { LibrosAddComponent } from './libros-add/libros-add.component';
import { LibrosUpdateComponent } from './libros-update/libros-update.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AutoresListComponent,
    AutoresAddComponent,
    AutoresUpdateComponent,
    LibrosListComponent,
    LibrosAddComponent,
    LibrosUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
