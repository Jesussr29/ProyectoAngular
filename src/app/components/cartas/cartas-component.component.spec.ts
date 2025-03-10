import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CartasComponent } from "./cartas-component.component";
import { PokemonTcgService } from "../../services/tcg.service";
import { of } from "rxjs";

describe("CartasComponent", () => {
  let component: CartasComponent;
  let fixture: ComponentFixture<CartasComponent>;
  let pokemonService: PokemonTcgService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartasComponent],
      imports: [HttpClientTestingModule],
      providers: [PokemonTcgService],
    }).compileComponents();

    fixture = TestBed.createComponent(CartasComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonTcgService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load cartas on init", () => {
    const mockCartas = { data: [{ name: "Pikachu", set: { name: "Base Set" }, images: { small: "pikachu.jpg" } }] };

    spyOn(pokemonService, "obtenerCartas").and.returnValue(of(mockCartas));

    component.ngOnInit();

    expect(component.cartas.length).toBe(1);
    expect(component.cartas[0].name).toBe("Pikachu");
  });

  it("should search cartas by name", () => {
    const mockCartas = { data: [{ name: "Charizard", set: { name: "Base Set" }, images: { small: "charizard.jpg" } }] };

    spyOn(pokemonService, "buscarCartasPorNombre").and.returnValue(of(mockCartas));

    component.nombreCarta = "Charizard";
    component.buscarPorNombre();

    expect(component.cartas.length).toBe(1);
    expect(component.cartas[0].name).toBe("Charizard");
  });

  it("should search cartas by expansion", () => {
    const mockCartas = { data: [{ name: "Blastoise", set: { name: "Base Set" }, images: { small: "blastoise.jpg" } }] };

    spyOn(pokemonService, "obtenerCartasPorExpansion").and.returnValue(of(mockCartas));

    component.expansion = "Base Set";
    component.obtenerPorExpansion();

    expect(component.cartas.length).toBe(1);
    expect(component.cartas[0].name).toBe("Blastoise");
  });

  it("should handle error when no cartas found", () => {
    const mockError = "No se encontraron cartas con ese nombre.";
    spyOn(pokemonService, "buscarCartasPorNombre").and.returnValue(of({ data: [] }));

    component.nombreCarta = "MissingCard";
    component.buscarPorNombre();

    expect(component.error).toBe(mockError);
  });
});
