import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorFormComponent } from './indicador-form.component';

describe('IndicadorFormComponent', () => {
  let component: IndicadorFormComponent;
  let fixture: ComponentFixture<IndicadorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
