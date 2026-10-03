import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TambahprodukPage } from './tambahproduk.page';

describe('TambahprodukPage', () => {
  let component: TambahprodukPage;
  let fixture: ComponentFixture<TambahprodukPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahprodukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
