import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartasComponent } from './components/cartas/cartas-component.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cartas', component: CartasComponent },
  { path: '**', redirectTo: '/home' } // Si la ruta no existe, redirige a Home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
