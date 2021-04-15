import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../model/cliente';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private endPointUrl:string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient, private router:Router, private ar:ActivatedRoute) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.endPointUrl);
  }

  saveCliente(cliente:Cliente):Observable<Cliente>{

    return this.http.post<Cliente>(this.endPointUrl, cliente, {headers: this.httpHeaders}).pipe(

      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al intentar guardar cliente',
          text: e.error.mensaje
        })

        return throwError(e);
      })
    );
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.endPointUrl}/${id}`).pipe(

      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al intentar obtener cliente',
          text: e.error.mensaje
        })

        return throwError(e);
      })
    )
  }

  updateCliente(cliente:Cliente):Observable<Cliente>{

    return this.http.put<Cliente>(`${this.endPointUrl}/${cliente.id}`,cliente, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al intentar actualizar cliente',
          text: e.error.mensaje
        })

        return throwError(e);
      })
    )

  }

  deleteCliente(id:Number):Observable<Cliente>{

    return this.http.delete<Cliente>(`${this.endPointUrl}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al intentar eliminar cliente',
          text: e.error.mensaje
        })

        return throwError(e);
      })
    )

  }


}
