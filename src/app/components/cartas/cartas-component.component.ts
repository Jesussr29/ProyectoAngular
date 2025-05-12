import { Component } from '@angular/core';
import { PokemonTcgService } from '../../services/tcg.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from '../../pipes/dateFormat.pipe';

@Component({
  selector: 'app-cartas',
  standalone: true,
  imports: [CommonModule, FormsModule, DateFormatPipe],
  templateUrl: './cartas-component.component.html',
  styleUrls: ['./cartas-component.component.css']
})
export class CartasComponent {
  cartas: any[] = [];
  nombreCarta: string = '';
  expansion: string = '';
  error: string = '';

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private pokemonService: PokemonTcgService) {}

  ngOnInit(): void {
    this.obtenerCartas();
  }

  obtenerCartas(): void {
    this.pokemonService.obtenerCartas().subscribe(
      (data) => {
        this.cartas = data.data || [];
        this.currentPage = 1; // Reset paginación
      },
      () => this.error = 'Error al obtener las cartas.'
    );
  }

  buscarCartas(): void {
    if (!this.nombreCarta.trim() && !this.expansion.trim()) {
      this.obtenerCartas(); // Si no hay filtros, obtener todas
      return;
    }

    this.pokemonService.buscarCartas(this.nombreCarta, this.expansion).subscribe(
      (data) => {
        this.cartas = data.data?.length ? data.data : this.cartas; // Si no hay resultados, mantiene las cartas actuales
        this.currentPage = 1; // Reset paginación
      },
      () => this.error = 'No se encontraron cartas con esos filtros.'
    );
  }

  // Obtener las cartas para la página actual
  getPaginatedCartas() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.cartas.slice(start, start + this.itemsPerPage);
  }

  totalPages() {
    return Math.ceil(this.cartas.length / this.itemsPerPage);
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) this.currentPage++;
  }
}
