import { TestBed } from '@angular/core/testing';
import { Cart } from './cart';

describe('Keranjang', () => {
  let service: Cart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
