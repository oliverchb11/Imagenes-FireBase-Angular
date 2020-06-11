import { Component, OnInit } from '@angular/core';
import { Fotos } from 'src/app/models/fotos.models';
import { FotosService } from '../../services/fotos.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.sass']
})
export class CargaComponent implements OnInit {
archivos:Fotos[]=[];
estaSobreDrop=false;
  constructor(public fotsservice:FotosService) { }

  ngOnInit(): void {
  }
  cargarImagenes(){
     this.fotsservice.cargarImagenes(this.archivos);
  }

  pruebaSobreElemento(event){
      console.log(event)
  }
  limpiarArchivos(){
    this.archivos = [];
  }
}
