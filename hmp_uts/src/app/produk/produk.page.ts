import { Component, OnInit, signal } from '@angular/core';
import { Products } from '../products';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {

  arrProduk: any[] = [];
  filteredProduk: any[]=[];
  searchProduk: string='';
  defaultImageUrl = this.products.urldefault; // URL gambar default

  constructor(private products: Products, private router:Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.arrProduk=this.products.produk;
    this.filteredProduk=[...this.arrProduk];
  }

  ionViewWillEnter() {
    const dataDariService = this.products.produk;
    if (dataDariService) {
      this.arrProduk = [...dataDariService];
      this.filteredProduk = [...this.arrProduk];
    } else {
      this.arrProduk = [];
      this.filteredProduk = [];
    }
    this.cdr.detectChanges();
  }

  filterProduk() {
    const keyword = this.searchProduk.toLowerCase();
    if(!keyword) {
      this.filteredProduk = [...this.arrProduk];
      return;
    }
    this.filteredProduk = this.arrProduk.filter(produk => {
      return produk.name.toLowerCase().includes(keyword) || produk.kategori.toLowerCase().includes(keyword);
    });
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
