import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditprodukPage } from './editproduk.page';

describe('EditprodukPage', () => {
  let component: EditprodukPage;
  let fixture: ComponentFixture<EditprodukPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprodukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
