import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { ClienteService } from './cliente/services/cliente.service';
import {HttpClientModule} from '@angular/common/http';
import { FormularioComponent } from './cliente/formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes:Routes = [
  {path:'clientes', component:ClienteComponent},
  {path:'form', component:FormularioComponent},
  {path:'form/:id', component:FormularioComponent},
  {path:'', redirectTo: '/clientes', pathMatch: 'full'},
]
@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    HeaderComponent,
    FooterComponent,
    FormularioComponent,
    
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes),
    HttpClientModule,FormsModule, ReactiveFormsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
