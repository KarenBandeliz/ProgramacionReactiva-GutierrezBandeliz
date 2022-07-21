import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AlumnosI } from 'src/app/interface/alumnos';
import { ServiceService } from '../../service.service';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {

  private  serverUrl: string = `http://localhost:4200`;
  constructor(private httpClient: HttpClient, _ServiceService: ServiceService){}
  listaAlumnos: AlumnosI[] = [];
  public $alumnos:Observable<AlumnosI[]> = new Observable();

displayedColumns: string[] = ['id', 'Nombre', 'Apellido', 'Edad', 'acciones'];


ngOnInit(): void {
  this.getAlumnos();
}  

cargarAlumnos() {
  this.getAlumnos();

}

  public getAlumnos(): Observable<any>{
    let dataUrl = `${this.serverUrl}/alumnos`;
    return this.httpClient.get<any>(dataUrl).pipe(catchError(this.handleError))
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
