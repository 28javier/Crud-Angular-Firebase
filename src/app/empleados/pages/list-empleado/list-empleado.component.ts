import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpleadoI } from '../../interface/empleado.interface';
import { EmpleadoService } from '../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit {

  empleados: EmpleadoI[] = [];

  constructor(private empleadoService:EmpleadoService,
              private toastr: ToastrService) { 
    this.getEmpleados();
  }

  ngOnInit(): void {
  }

  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe( data => {
      this.empleados = [];
      data.forEach((element:any) => {
        // console.log(element.payload.doc.id);
        // console.log(element.payload.doc.data());
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });        
      });
      // console.log(this.empleados);
    });
  }

  eliminarEmpleado(id: string){
    this.empleadoService.eliminarEmpleado(id).then(()=>{
      this.toastr.error('Correctamente', 'Usuario Eliminado', {positionClass: 'toast-bottom-right'});
    }).catch(err => {
      console.log(err);
    });
  }

}
