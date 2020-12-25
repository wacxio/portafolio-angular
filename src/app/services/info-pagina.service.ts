import { InfoPagina } from './../interfaces/info-pagina.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient) {

      // console.log('Servicion de InfoPagina listo');

     this.cargarInfo();
     this.cargarEquipo();


   }

   private cargarInfo() {
     // Leer el archivo JSON
     this.http.get('assets/data/data-pagina.json')
     .subscribe((resp: InfoPagina) => {
       this.cargada = true;
       this.info = resp;
      });
   }

   private cargarEquipo(){
    // Leer el archivo JSON
    this.http.get('https://curso-angular-html-a0169-default-rtdb.firebaseio.com/equipo.json')
    .subscribe((resp: any ) => {

      this.equipo = resp;
      console.log(resp);
     });
   }
}
