import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionFormComponent } from './ejecucion-form.component';

describe('EjecucionFormComponent', () => {
  let component: EjecucionFormComponent;
  let fixture: ComponentFixture<EjecucionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjecucionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjecucionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
