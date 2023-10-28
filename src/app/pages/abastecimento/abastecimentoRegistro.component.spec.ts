import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbastecimentoRegistroComponent } from './abastecimentoRegistro.component';

describe('AbastecimentoComponent', () => {
  let component: AbastecimentoRegistroComponent;
  let fixture: ComponentFixture<AbastecimentoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbastecimentoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbastecimentoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
