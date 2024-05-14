import {Component, ElementRef, ViewChild} from '@angular/core';
import {ReaderTextService} from "./services-rna/readerText-service";
import {FileReaderService} from "./services-rna/file-reader-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fileContent: string | undefined;
  fileContent2:string|undefined;
  alpha: string = '';
  inicializar: string = '';
  bias: string = '';
  epocas: number | undefined;
  @ViewChild('resultadoTextArea') resultadoTextArea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('resultadoPrediccion') resultadoPrediccion!: ElementRef;
  constructor(private fileReaderService: FileReaderService) {
  }
  ngAfterViewInit(): void {
    // Aquí puedes acceder de manera segura a this.resultadoPrediccion.nativeElement
    // Por ejemplo, podrías hacer una verificación aquí para asegurarte de que no sea undefined
    if (this.resultadoPrediccion && this.resultadoPrediccion.nativeElement) {
      // Accede al elemento nativo
      this.resultadoPrediccion.nativeElement.value = '';
    }
  }
  mostrarResultados(response: any): void {
    if (this.resultadoTextArea) {
      this.resultadoTextArea.nativeElement.value = response.results;

    }
  }
  mostrarPrediccion(response: any): void {
    if (this.resultadoPrediccion) {
      this.resultadoPrediccion.nativeElement.value = response.results;
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const contenido = reader.result as string;
        this.fileContent = contenido; // Asignar contenido al atributo fileContent
        console.log('Nombre del archivo:', file.name); // Mostrar el nombre del archivo
        this.fileReaderService.enviarArchivo(contenido).subscribe(
          response => {
            console.log('Archivo enviado correctamente:', response);
            // Aquí puedes manejar la respuesta del servidor si es necesario
          },
          error => {
            console.error('Error al enviar el archivo:', error);
            // Aquí puedes manejar el error si ocurre alguno
          }
        );
      };

      reader.readAsText(file);
    }
  }

  onFileSelected2(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const contenido = reader.result as string;
        this.fileContent2 = contenido; // Asignar contenido al atributo fileContent
        this.fileReaderService.enviarArchivo(contenido).subscribe(
          response => {
            console.log('Archivo enviado correctamente:', response);
            // Aquí puedes manejar la respuesta del servidor si es necesario
          },
          error => {
            console.error('Error al enviar el archivo:', error);
            // Aquí puedes manejar el error si ocurre alguno
          }
        );
      };

      reader.readAsText(file);
    }
  }

  enviarArchivoYParametros(event: any) {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario (recargar la página)

    // Obtén los valores de los campos del formulario
    const alpha = event.target.querySelector('#inputAlpha').value;
    const bias = event.target.querySelector('#inputBias').value;
    const epocas = event.target.querySelector('#inputEpocas').value;
    const vectorAleatorio = this.generate();

    const parametros = {
      alpha: alpha,
      weights: vectorAleatorio, // Agrega el vector al objeto de parámetros
      bias: bias,
      epocas: epocas,
    };

    console.log(parametros);

    this.fileReaderService.enviarArchivoYParametros(parametros).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
        this.mostrarResultados(response); // Mostrar los resultados en el textarea
      },
      error => {
        console.error('Error al enviar el archivo y parámetros:', error);
        // Manejar errores aquí
      }
    );
  }
  predecir(): void {
    this.fileReaderService.predecir().subscribe(
      response => {
        console.log("Respuesta del servidor:", response);
        this.mostrarPrediccion(response);
      },
      error => {
        console.error("Error al obtener la predicción:", error);
      }
    );
  }
  generate(): number[] {
    const arreglo: number[] = [];
    for (let i = 0; i < 63; i++) {
      const valor = Math.random(); // Genera un valor aleatorio entre 0 y 1
      arreglo.push(valor);
    }
    console.log(arreglo);
    return arreglo;

  }
  actualizarResultadoEntrenamiento(response: any) {
    // Obtener el área de texto por su ID o por algún otro método de selección
    const txtArea = document.getElementById('resultado-entrenamiento') as HTMLTextAreaElement;
    if (txtArea) {
      // Actualizar el contenido del área de texto con la respuesta del servidor
      txtArea.value = response.text; // Mostrar el texto plano directamente desde la propiedad 'text'
    }
  }


}
