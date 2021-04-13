import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {  Observable } from 'rxjs';
import { EmpleadoI } from '../interface/empleado.interface';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private fireStore: AngularFirestore) {

   }

  agregarEmpleado(empleado:EmpleadoI):Promise<any>{
    return this.fireStore.collection('empleados').add(empleado);
  }

  getEmpleados():Observable<any>{
    return this.fireStore.collection('empleados', ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges().pipe(
      // pluck('payload.doc.id')
    )
  }

  eliminarEmpleado(id: string):Promise<any>{
    return this.fireStore.collection('empleados').doc(id).delete();
  }

  getEmpleadoId(id:string):Observable<any>{
    return this.fireStore.collection('empleados').doc(id).snapshotChanges();
  }

  EditarEmpleado(id:string, data:EmpleadoI):Promise<any>{
    return this.fireStore.collection('empleados').doc(id).update(data);
  }
}
