// reader-text.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReaderTextService {
  leerArchivo(contenido: string): number[][] {
    console.log("Contenido del archivo:");
    console.log(contenido);

    const lineas: string[] = contenido.split('\n');
    const matriz: number[][] = [];

    for (let fila = 0; fila < 21; fila++) {
      matriz[fila] = [];
      const linea = lineas[fila] ? lineas[fila].trim() : '';

      let columna = 0; // Inicializamos la columna en 0 para cada fila

      for (let i = 0; i < linea.length && columna < 63; i++) {
        const caracter = linea[i];
        if (caracter === '#' || caracter === '@') {
          matriz[fila][columna++] = 1;
        } else if (caracter === '.' || caracter === 'o') {
          matriz[fila][columna++] = -1;
        } else {
          matriz[fila][columna++] = 0; // Otros caracteres no definidos como 0
        }
      }

      // Rellenar el resto de la fila con 0 si no hay suficientes caracteres en la línea
      while (columna < 63) {
        matriz[fila][columna++] = 0;
      }
    }

    console.log("Matriz resultante:");
    console.log(matriz);

    return matriz;
  }
}
