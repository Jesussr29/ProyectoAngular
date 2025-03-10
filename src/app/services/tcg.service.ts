import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokemonTcgService {
  private baseUrl = "https://api.pokemontcg.io/v2";

  constructor(private http: HttpClient) {}

  // Obtener todas las cartas con un límite de 10
  obtenerCartas(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cards?pageSize=10`);
  }

  // Buscar cartas por nombre
  buscarCartasPorNombre(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cards?q=name:${nombre}`);
  }

  // Obtener cartas por expansión
  obtenerCartasPorExpansion(expansion: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/cards?q=set.name:${expansion}`);
  }
  
}
