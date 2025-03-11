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
    return this.http.get<any>(`${this.apiUrl}?pageSize=100`);
  }

  buscarCartas(nombre: string, expansion: string): Observable<any> {
    let query = [];
    if (nombre.trim()) query.push(`name:"${nombre}"`);
    if (expansion.trim()) query.push(`set.name:"${expansion}"`);

    const queryString = query.length ? `?q=${query.join(" AND ")}` : "";
    return this.http.get<any>(`${this.apiUrl}${queryString}`);
  }
}
