import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargaComponent } from './pages/carga/carga.component';
import { FotosComponent } from './pages/fotos/fotos.component';


const routes: Routes = [
  {
    path:'fotos',component:FotosComponent
  },
  {
    path:'carga',component:CargaComponent
  },
  {
    path:'**', pathMatch :'full' , redirectTo:'fotos'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
