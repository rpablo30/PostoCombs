import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbastecimentoModalComponent } from './abastecimentoModal.component';

describe('AbastecimentoComponent', () => {
  let component: AbastecimentoModalComponent;
  let fixture: ComponentFixture<AbastecimentoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbastecimentoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbastecimentoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
