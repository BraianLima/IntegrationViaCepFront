import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepOutputComponent } from './cep-output.component';

describe('CepOutputComponent', () => {
  let component: CepOutputComponent;
  let fixture: ComponentFixture<CepOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CepOutputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CepOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
