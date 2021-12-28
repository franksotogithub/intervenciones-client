import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaAnualListComponent } from './meta-anual-list.component';

describe('MetaAnualListComponent', () => {
  let component: MetaAnualListComponent;
  let fixture: ComponentFixture<MetaAnualListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaAnualListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaAnualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
