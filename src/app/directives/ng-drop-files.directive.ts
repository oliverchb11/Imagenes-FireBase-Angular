import { Directive,EventEmitter,ElementRef,HostListener,Input,Output } from '@angular/core';
import { Fotos } from '../models/fotos.models';


@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input('conexion') archivos :Fotos[]=[];
  @Output() mouseSobre: EventEmitter<Boolean> = new EventEmitter();
  constructor() {    }


    @HostListener('dragover', ['$event'])
    public onDragEnter(event:any){
        this.mouseSobre.emit(true);
        this._prevenirDetener(event);
   }

   @HostListener('dragleave', ['$event'])
   public onDragLeave(event:any){
      
  }

  @HostListener('drop', ['$event'])
  public onDrop(event:any){
      this.mouseSobre.emit(false);

      const tranferencia = this._getTranferencia(event);
      if(!tranferencia){
        return;
      }
      this._extraerArchivos(tranferencia.files);
      this._prevenirDetener(event);
      this.mouseSobre.emit(false);
 }

private _getTranferencia(event:any){
  return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
}

private _extraerArchivos(archivosLista:FileList){
  // tslint:disable-next-line: forin
  for(const propiedad in Object.getOwnPropertyNames(archivosLista)){
    const archivoTemporal = archivosLista[propiedad];
    if(this._archivoPuedeCargarlo(archivoTemporal)){
        const nuevoArchivo = new Fotos(archivoTemporal);
        this.archivos.push(nuevoArchivo);
        console.log(this.archivos);
    }
  }
}
  //validaciones

  private _archivoPuedeCargarlo(archivo:File):boolean{
      if(!this._archivoNoExiste(archivo.name) && this._esImagen(archivo.type)){
        return true;
        }else{
        return false;
      }
  }

  private _prevenirDetener(event){
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoNoExiste(nombreArchivo:string):boolean{

    for(const archivo of this.archivos){
      if(archivo.nombreArchivo === nombreArchivo){
        console.log('El archivo ' +nombreArchivo+ 'ya esta aregado');
        return true;
      }
    }
    return false;
  }

  private _esImagen(tipoArchivo:string):boolean{
    return (tipoArchivo==='' || tipoArchivo === undefined)? false :tipoArchivo.startsWith('image');
  }
}
