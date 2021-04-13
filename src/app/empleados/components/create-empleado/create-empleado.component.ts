import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoI } from '../../interface/empleado.interface';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.css']
})
export class CreateEmpleadoComponent implements OnInit {

loading:boolean = false;
id: string | null;
titulo:string = 'Agregar Empleado'

miFormulario:FormGroup = this.fb.group({
  nombre:    ['', [Validators.required, Validators.min(3)]],
  apellido:  ['', [Validators.required]],
  documento: ['', [Validators.required]],
  salario:   ['', [Validators.required]],
})

  constructor(private fb:FormBuilder,
               private empleadoService:EmpleadoService,
               private router: Router,
               private toastr: ToastrService,
               private aRoute:ActivatedRoute) { 
  
                this.id = this.aRoute.snapshot.paramMap.get('id');
                // console.log(this.id);
                
  }

  ngOnInit(): void {
    this.getEmpleadoId();
  }

  agregarEmpleado(){
    // console.log(this.miFormulario.value);
    const empleado: EmpleadoI = {
      nombre: this.miFormulario.value.nombre,
      apellido: this.miFormulario.value.apellido,
      documento: this.miFormulario.value.documento,
      salario: this.miFormulario.value.salario,
      fechaCreacion: new Date(),
      fechaEdicion: new Date(),
    }
    this.loading = true;
    this.empleadoService.agregarEmpleado(empleado).then(() => {
      // console.log('Empleado agregado correctamente');
      // this.miFormulario.reset();
      this.loading = false;
      this.toastr.success('Usuario Creado', 'Correctamente', {positionClass: 'toast-bottom-right'});
      this.router.navigateByUrl('/empleados');
    }).catch(error => {
      console.log(error);
      this.loading = false;
    });
  }

  getEmpleadoId(){
    this.titulo = 'Editar Usuario';
    if (this.id !== null) {
      this.loading = true;
      this.empleadoService.getEmpleadoId(this.id).subscribe(data => {
        // console.log(data);
      this.loading = false;
        this.miFormulario.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        });
      });
    }
  }


  editarEmpleado(){
    const empleado: EmpleadoI = {
      nombre: this.miFormulario.value.nombre,
      apellido: this.miFormulario.value.apellido,
      documento: this.miFormulario.value.documento,
      salario: this.miFormulario.value.salario,
      fechaEdicion: new Date(),
    }
    this.loading = true;
    this.empleadoService.EditarEmpleado(this.id, empleado).then(() => {
      this.loading = false;
      this.toastr.info('El empleado fue modificado con exito', 'Empleado Modificado', {positionClass: 'toast-bottom-right'});
      this.router.navigateByUrl('/empleados');
    }).catch(err => {
      console.log(err);
    });
  }


  agregarEditarEmpleado(){
    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado();
    }
  }
  

  campoEsValido( campo: string ) {
    return this.miFormulario.controls[campo]?.errors 
            && this.miFormulario.controls[campo]?.touched;
  }
}
