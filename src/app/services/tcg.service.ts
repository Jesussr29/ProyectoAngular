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
    return this.http.get<any>(this.apiUrl);
  }

  buscarCartasPorNombre(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=name:${nombre}`);
  }

  obtenerCartasPorExpansion(expansion: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=set.name:${expansion}`);
  }
}
