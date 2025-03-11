import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartasComponent } from './components/cartas/cartas-component.component';
import { HomeComponent } from './components/home/home.component';
import { AcercaComponent } from './components/acercaDe/acerca-component.component';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'acerca', component: AcercaComponent },
  { path: 'cartas', component: CartasComponent },
  { path: 'error', component: Error404Component },
  { path: '**', redirectTo: '/error' } // Si la ruta no existe, redirige a Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
