import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { ListEmpleadoComponent } from './pages/list-empleado/list-empleado.component';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';


@NgModule({
  declarations: [
    ListEmpleadoComponent,
    CreateEmpleadoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmpleadosRoutingModule,
  ]
})
export class EmpleadosModule { }
