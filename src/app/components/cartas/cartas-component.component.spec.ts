import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartasComponent } from './cartas-component.component';
import { PokemonTcgService } from '../../services/tcg.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('CartasComponent', () => {
  let component: CartasComponent;
  let fixture: ComponentFixture<CartasComponent>;
  let pokemonService: PokemonTcgService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, CommonModule],
      declarations: [CartasComponent],
      providers: [PokemonTcgService]
    }).compileComponents();

    fixture = TestBed.createComponent(CartasComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonTcgService);
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerCartas() and populate cartas array', () => {
    const mockCartas = {
      data: [
        { name: 'Pikachu', set: { name: 'Base Set' }, images: { small: 'pikachu.jpg' } },
        { name: 'Charmander', set: { name: 'Base Set' }, images: { small: 'charmander.jpg' } },
      ],
    };

    spyOn(pokemonService, 'obtenerCartas').and.returnValue(of(mockCartas));

    component.obtenerCartas();

    fixture.detectChanges();

    expect(component.cartas.length).toBe(2);
    expect(component.cartas[0].name).toBe('Pikachu');
  });

  it('should display error message when obtaining cartas fails', () => {
    spyOn(pokemonService, 'obtenerCartas').and.returnValue(of({ data: [] }));

    component.obtenerCartas();

    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(By.css('.error-message p')).nativeElement;
    expect(errorMessage.textContent).toBe('Error al obtener las cartas.');
  });

  it('should call buscarPorNombre() and update cartas', () => {
    const mockCartas = {
      data: [
        { name: 'Pikachu', set: { name: 'Base Set' }, images: { small: 'pikachu.jpg' } },
      ],
    };

    spyOn(pokemonService, 'buscarCartasPorNombre').and.returnValue(of(mockCartas));

    component.nombreCarta = 'Pikachu';
    component.buscarPorNombre();

    fixture.detectChanges();

    expect(component.cartas.length).toBe(1);
    expect(component.cartas[0].name).toBe('Pikachu');
  });

  it('should display "No hay cartas para mostrar." when no cartas are available', () => {
    component.cartas = [];
    fixture.detectChanges();

    const noCartasMessage = fixture.debugElement.query(By.css('ng-template#noCartas')).nativeElement;
    expect(noCartasMessage.textContent).toContain('No hay cartas para mostrar.');
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });
});
