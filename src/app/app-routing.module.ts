import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { CartasComponent } from './components/cartas/cartas-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/cartas', pathMatch: 'full' },
  {path: 'home', component: HomeComponent,},
  {path: '**', component: Error404Component},
  { path: 'cartas', component: CartasComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CartasComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
