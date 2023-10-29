import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioModalComponent } from './relatorioModal.component';

describe('AbastecimentoComponent', () => {
  let component: RelatorioModalComponent;
  let fixture: ComponentFixture<RelatorioModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
