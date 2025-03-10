import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartasComponent } from './components/cartas/cartas-component.component'; // Aquí importamos el componente standalone

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CartasComponent // Aquí importamos el componente standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
