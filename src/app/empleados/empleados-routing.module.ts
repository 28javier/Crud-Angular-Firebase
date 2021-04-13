import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmpleadoComponent } from './components/create-empleado/create-empleado.component';
import { ListEmpleadoComponent } from './pages/list-empleado/list-empleado.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'list-empleado', component: ListEmpleadoComponent},
      {path:'crear-empleado', component: CreateEmpleadoComponent},
      {path:'editar-empleado/:id', component: CreateEmpleadoComponent},
      {path:'**', redirectTo:'list-empleado'}
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
