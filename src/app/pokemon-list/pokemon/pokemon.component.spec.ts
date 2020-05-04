import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PokemonComponent } from './pokemon.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Pokemon } from '../shared/pokemon';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterModule.forRoot([]),
        MatCardModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
      ],
      declarations: [PokemonComponent],
      providers: [
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;
    component.pokemon = new Pokemon();
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create name of pokemon', async () => {
    component.pokemon.name = 'Pikachu';
    fixture.detectChanges();
    const el = element.querySelector('.pokemon-title');
    expect(el.textContent).toContain('Pikachu');
  });

  it('should create img Url of pokemon', async () => {
    component.pokemon.imageUrl = 'PikachuImage';
    fixture.detectChanges();
    const el = element.querySelector('.pokemon-image');
    expect(el.getAttribute('src')).toEqual('PikachuImage');
  });
});
