import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMedidaListComponent } from './unidad-medida-list.component';

describe('UnidadMedidaListComponent', () => {
  let component: UnidadMedidaListComponent;
  let fixture: ComponentFixture<UnidadMedidaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadMedidaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMedidaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
