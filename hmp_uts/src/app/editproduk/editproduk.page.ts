import { Component, OnInit } from '@angular/core';
import { Products } from '../products';

@Component({
  selector: 'app-editproduk',
  templateUrl: './editproduk.page.html',
  styleUrls: ['./editproduk.page.scss'],
  standalone: false,
})
export class EditprodukPage implements OnInit {

  arrProduk: any[] = []
  defaultImageUrl = this.products.urldefault;; // URL gambar default
  chunkedProduct: any[][] = [];
  constructor(private products: Products) { }

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

}
