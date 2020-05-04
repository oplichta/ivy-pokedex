import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailsComponent } from './pokemon-details.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonListService } from '../shared/pokemon-list.service';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
      ],
      declarations: [PokemonDetailsComponent],
      providers: [
        PokemonListService,
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create name of pokemon', async () => {
    component.pokemon.name = 'Pikachu';
    fixture.detectChanges();
    const el = element.querySelector('.details-wrapper');
    expect(el.textContent).toContain('Pikachu');
  });

  it('should create img Url of pokemon', async () => {
    component.pokemon.imageUrl = 'PikachuImage';
    fixture.detectChanges();
    const el = element.querySelector('.pokemon-image');
    expect(el.getAttribute('src')).toEqual('PikachuImage');
  });

  it('should render spinner component when loading pokemon details data', () => {
    const service = TestBed.inject(PokemonListService);
    const selected$ = service.detailsLoader$;
    selected$.next(true);
    selected$.subscribe((selected) => {
      component.detailsSpinner = selected;
    });

    fixture.detectChanges();
    const el = element.querySelector('.details-spinner');
    expect(el).not.toBeNull();
  });

  it('should render spinner component when no similar pokemon data', () => {
    const el = element.querySelector('.spinner');
    expect(el).not.toBeNull();
  });

  it('should show warning when no pokemon data and no spinner', () => {
    component.pokemon = null;
    component.detailsSpinner = false;
    fixture.detectChanges();
    const el = element.querySelector('.no-pokemon');
    expect(el).not.toBeNull();
  });
});
