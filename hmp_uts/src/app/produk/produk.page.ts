import { Component, OnInit, signal } from '@angular/core';
import { Products } from '../products';
import { Router } from '@angular/router';
@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {

  arrProduk: any[] = []
  defaultImageUrl = this.products.urldefault;; // URL gambar default
  chunkedProduct: any[][] = [];

  constructor(private products: Products, private router:Router) {
  }

  ngOnInit() {
    this.arrProduk=this.products.produk;
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  cekKeranjang() {
    this.router.navigate(['/keranjang']);
  }
}
