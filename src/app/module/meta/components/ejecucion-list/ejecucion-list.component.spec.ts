import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecucionListComponent } from './ejecucion-list.component';

describe('EjecucionListComponent', () => {
  let component: EjecucionListComponent;
  let fixture: ComponentFixture<EjecucionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjecucionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjecucionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
