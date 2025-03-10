import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonTcgService {
  private apiUrl = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) {}

  obtenerCartas(): Observable<any> {
    // Limitar a 20 cartas
    return this.http.get<any>(`${this.apiUrl}?pageSize=24`);
  }

  buscarCartasPorNombre(nombre: string): Observable<any> {
    // Limitar a 20 cartas por nombre
    return this.http.get<any>(`${this.apiUrl}?q=name:${nombre}`);
  }

  obtenerCartasPorExpansion(expansion: string): Observable<any> {
    // Limitar a 20 cartas por expansión
    return this.http.get<any>(`${this.apiUrl}?q=set.name:${expansion}`);
  }
}
