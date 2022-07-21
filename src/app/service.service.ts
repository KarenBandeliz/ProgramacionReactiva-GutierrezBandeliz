import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AlumnosI } from './interface/alumnos';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private  serverUrl: string = `http://localhost:4200`;

  listaAlumnos: AlumnosI[] = [
    {id: 1, Nombre:'Karen' , Apellido: 'Gutiérrez', Edad: 15 },
    {id: 2, Nombre:'Edith' , Apellido: 'Pérez', Edad: 18 },
    {id: 3, Nombre:'Ramses' , Apellido: 'Hernández', Edad: 17 },
    {id: 4, Nombre:'Luis' , Apellido: 'García', Edad: 15 },
    {id: 5, Nombre:'Omar' , Apellido: 'López', Edad: 16 },
    
    ]

  constructor(private httpClient: HttpClient) { }

  public getAlumnos(): Observable<AlumnosI[]>{
    let dataUrl = `${this.serverUrl}/alumnos`;
    return this.httpClient.get<AlumnosI[]>(dataUrl).pipe(catchError(this.handleError))
}

public getAlumnosporId(id: string): Observable<AlumnosI>{
    let dataUrl = `${this.serverUrl}/AlumnosI/${id}`;
    return this.httpClient.get<AlumnosI>(dataUrl).pipe(catchError(this.handleError))
}

public nuevoAlumno(alumnos: AlumnosI ): Observable<AlumnosI>{
    let dataUrl = `${this.serverUrl}/alumnos`;
    console.log(this.getAlumnos(),'TODOS')
    return this.httpClient.post<AlumnosI>(dataUrl,alumnos).pipe(catchError(this.handleError))
}


public editarAlumno(editarAlumno: AlumnosI, id: string ): Observable<AlumnosI>{
    let dataUrl = `${this.serverUrl}/alumnos/${id}`;
    return this.httpClient.put<AlumnosI>(dataUrl,editarAlumno).pipe(catchError(this.handleError))
}


public eliminarAlumno(id: number ): Observable<{}>{
    let dataUrl = `${this.serverUrl}/alumnos/${id}`;
    return this.httpClient.delete<{}>(dataUrl).pipe(catchError(this.handleError))
}

public handleError(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
  
        errorMessage = `Error: ${error.error.message}`;
    }else{
      
        errorMessage = `Status: ${error.status} \n Message: ${error.message}`;
    }

    return throwError(errorMessage);
}
}

