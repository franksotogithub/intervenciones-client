import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionFormComponent } from './programacion-form.component';

describe('ProgramacionFormComponent', () => {
  let component: ProgramacionFormComponent;
  let fixture: ComponentFixture<ProgramacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramacionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
