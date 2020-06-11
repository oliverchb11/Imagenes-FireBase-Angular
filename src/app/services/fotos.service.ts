import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Fotos } from '../models/fotos.models';
import { error } from 'console';
@Injectable({
  providedIn: 'root'
})
export class FotosService {
private CARPETA_IMAGENES = 'img';
  constructor(private db: AngularFirestore) { }



  public cargarImagenes(imagenes:Fotos[]){

    const storageRef = firebase.storage().ref();

    for(const item of imagenes){
      item.estaSubiendo = true;

      if(item.progreso >=100){
        continue;
      }
      const uploadTask:firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
         
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
   
        (error) => console.error('Error al subir a fire base', error),
        () => {
          console.log('imagen cargada correctamente');
           uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            item.url = url;
         
          item.estaSubiendo = false;
          this.guardarImagen({
            nombre: item.nombreArchivo,
            url : item.url
          });
        });
        });
    }
  }


  private guardarImagen(imagen:{nombre:string,url:string}){
      this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);
  }
}
