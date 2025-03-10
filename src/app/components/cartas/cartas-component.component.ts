import { Component } from '@angular/core';
import { PokemonTcgService } from '../../services/tcg.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí

@Component({
  selector: 'app-cartas',
  standalone: true,
  imports: [FormsModule, CommonModule], // Importa CommonModule aquí también
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
      (data) => {
        this.cartas = data.data;
      },
      (error) => {
        this.error = 'Error al obtener las cartas.';
      }
    );
  }

  buscarPorNombre(): void {
    if (this.nombreCarta.trim()) {
      this.pokemonService.buscarCartasPorNombre(this.nombreCarta).subscribe(
        (data) => {
          this.cartas = data.data;
        },
        (error) => {
          this.error = 'No se encontraron cartas con ese nombre.';
        }
      );
    }
  }

  obtenerPorExpansion(): void {
    if (this.expansion.trim()) {
      this.pokemonService.obtenerCartasPorExpansion(this.expansion).subscribe(
        (data) => {
          this.cartas = data.data;
        },
        (error) => {
          this.error = 'No se encontraron cartas para esa expansión.';
        }
      );
    }
  }
}