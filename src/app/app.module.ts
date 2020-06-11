import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//rutas de mi aplicacion
import { AppRoutingModule } from './app-routing.module';
//componentes de mi aplicacion
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FotosComponent } from './pages/fotos/fotos.component';
import { CargaComponent } from './pages/carga/carga.component';
//angularFirebase
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FotosComponent,
    CargaComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
