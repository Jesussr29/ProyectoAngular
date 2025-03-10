import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonTcgService } from './services/tcg.service';
import { HomeComponent } from './components/home/home.component';
import { CartasComponent } from './components/cartas/cartas-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    CommonModule,
    HttpClientModule,
    CartasComponent
  ],
  providers: [PokemonTcgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
