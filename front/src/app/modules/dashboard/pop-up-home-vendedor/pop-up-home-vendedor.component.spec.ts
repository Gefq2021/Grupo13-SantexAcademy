import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpHomeVendedorComponent } from './pop-up-home-vendedor.component';

describe('PopUpHomeVendedorComponent', () => {
  let component: PopUpHomeVendedorComponent;
  let fixture: ComponentFixture<PopUpHomeVendedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpHomeVendedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpHomeVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
