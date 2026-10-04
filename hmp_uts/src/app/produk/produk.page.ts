import { Component, OnInit, signal } from '@angular/core';
import { Products } from '../products';
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

  constructor(private products: Products) {
  }
  
  ngOnInit() {
    this.muatArray();
  }

  ionViewWillEnter() {
    this.muatArray();
  }

  muatArray() {
    if (this.products.produk) {
      this.arrProduk = [...this.products.produk];
    } else {
      this.arrProduk = [];
    }

    // Potong ulang array-nya
    this.chunkedProduct = this.chunkArray(this.arrProduk, 2);
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }
}
