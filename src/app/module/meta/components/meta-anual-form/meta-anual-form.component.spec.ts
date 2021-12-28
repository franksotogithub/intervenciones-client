import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaAnualFormComponent } from './meta-anual-form.component';

describe('MetaAnualFormComponent', () => {
  let component: MetaAnualFormComponent;
  let fixture: ComponentFixture<MetaAnualFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaAnualFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaAnualFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
