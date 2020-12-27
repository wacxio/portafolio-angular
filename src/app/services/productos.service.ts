import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: any[] = [];
  // productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }


  // tslint:disable-next-line: typedef
  private cargarProductos(){

    return new Promise((resolve, reject) => {
      this.http.get('https://curso-angular-html-a0169-default-rtdb.firebaseio.com/productos_idx.json')
    // .subscribe( (resp: Producto[]) => {
    .subscribe( (resp: any) => {
      this.productos = resp;
      this.cargando = false;
      resolve();
    });
    });

}

  // tslint:disable-next-line: typedef
  getProducto( id: string ) {
    return this.http.get(`https://curso-angular-html-a0169-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ){

    if (this.productos.length === 0){
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // Aplicar filtro
        this.filtrarProductos( termino );
      });
    }else{
      // aplicar el filtro
      this.filtrarProductos( termino );
    }

  }

  private filtrarProductos( termino: string ){
    // this.productosFiltrado = this.productos.filter(producto => {
    //   return true;
    // });

     this.productosFiltrado = [];

     termino = termino.toLowerCase();
     this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf( termino ) >= 0){
        this.productosFiltrado.push( prod );
      }

     } );
  }

}
