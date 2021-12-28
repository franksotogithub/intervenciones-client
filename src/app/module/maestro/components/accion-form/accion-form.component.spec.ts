import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionFormComponent } from './accion-form.component';

describe('AccionFormComponent', () => {
  let component: AccionFormComponent;
  let fixture: ComponentFixture<AccionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
