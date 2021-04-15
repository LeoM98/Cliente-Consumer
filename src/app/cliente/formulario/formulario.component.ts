import { Cliente } from './../model/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
})
export class FormularioComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  FormCliente:FormGroup;
  constructor(private clienteService:ClienteService, private router:Router, private fb:FormBuilder, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.FormCliente = this.fb.group({
      
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.email,Validators.required]],
    });

    this.cargarCliente();
  }

  

  get nombre(){
    return this.FormCliente.get('nombre');
  }

  get apellido(){
    return this.FormCliente.get('apellido');
  }

  get email(){
    return this.FormCliente.get('email');
  }

  public saveCliente():void{

     this.clienteService.saveCliente(this.cliente).subscribe(
      response =>{

        this.router.navigate(['/clientes']);
        Swal.fire(
          'Guardado con éxito!',
          `El cliente ${this.cliente.nombre} ha sido guardado con exito`,
          'success'
        )
      }
    );
  }

  public cargarCliente():void{
    this.activateRoute.params.subscribe(
      params=>{
        let id = params['id'];
        if(id){
          this.clienteService.getCliente(id).subscribe(
            response=>{
              this.cliente = response;
            }
          )
        }
      }
    )
  }

  public updateCliente():void{
    this.clienteService.updateCliente(this.cliente).subscribe(
      response=>{
        this.router.navigate(['/clientes']);
        Swal.fire(
          'Actualizado con éxito!',
          `El cliente ${this.cliente.nombre} ha sido actualizado con exito`,
          'success'
        )
      }
    )
  }

}
