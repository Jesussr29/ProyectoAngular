import { Component } from '@angular/core';
import { PokemonTcgService } from '../../services/tcg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from '../../pipes/dateFormat.pipe';

@Component({
  selector: 'app-cartas',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule, FormsModule, DateFormatPipe], // Importa CommonModule y FormsModule
  templateUrl: './cartas-component.component.html',
  styleUrls: ['./cartas-component.component.css']
})
export class CartasComponent {
  cartas: any[] = [];
  nombreCarta: string = '';
  expansion: string = '';
  error: string = '';

  constructor(private pokemonService: PokemonTcgService) {}

  ngOnInit(): void {
    this.obtenerCartas();
  }

  obtenerCartas(): void {
    this.pokemonService.obtenerCartas().subscribe(
      (data) => this.cartas = data.data,
      () => this.error = 'Error al obtener las cartas.'
    );
  }

  buscarPorNombre(): void {
    if (!this.nombreCarta.trim()) return;
    this.pokemonService.buscarCartasPorNombre(this.nombreCarta).subscribe(
      (data) => this.cartas = data.data,
      () => this.error = 'No se encontraron cartas con ese nombre.'
    );
  }

  obtenerPorExpansion(): void {
    if (!this.expansion.trim()) return;
    this.pokemonService.obtenerCartasPorExpansion(this.expansion).subscribe(
      (data) => this.cartas = data.data,
      () => this.error = 'No se encontraron cartas para esa expansión.'
    );
  }
}
