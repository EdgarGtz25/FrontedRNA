import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {
  constructor(private http: HttpClient) {}

  enviarArchivo(contenidoArchivo: string): Observable<number[][]> {
    const url = 'http://localhost:8080/api/rna/upload';
    return this.http.post<number[][]>(url, contenidoArchivo);
  }

  enviarArchivoYParametros(parametros: any) :Observable<any>{
    // Suponiendo que el endpoint para enviar el archivo y parámetros es '/api/entrenamiento'
    const url = 'http://localhost:8080/api/rna/entrenamiento';
    return this.http.post<any>(url,  parametros );
  }
  predecir(): Observable<any> {
    const url = 'http://localhost:8080/api/rna/predecir';
    return this.http.get<any>(url);
  }

}
