import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './model/cliente';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clientes:Cliente[];
  constructor(private clienteService: ClienteService, private ar:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

     this.clienteService.getClientes().subscribe(
      response =>{
        this.clientes = response;
      }
    );

  }

  public delete(id:Number): void{

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás deshacer cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        
        this.clienteService.deleteCliente(id).subscribe(
          response =>{
            this.router.navigate(['/clientes']);

            Swal.fire(
              'Eliminado!',
              `El cliente ha sido eliminado!`,
              'success'
            )
          }
        )
        
      }
    })

  }

}
