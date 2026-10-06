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

  arrProduk: any[] = [];
  filteredProduk: any[] = [];
  searchProduk: string = '';
  defaultImageUrl = this.products.urldefault; // URL gambar default

  kategoriAktif: string = "Semua";
  tipeFilter: string = "";
  urutkanHarga: string = "semua";
  statusStok: string = "semua";

  constructor(private products: Products, private router: Router) {
  }

  ngOnInit() {
    this.arrProduk = this.products.produk;
    this.filteredProduk = this.products.produk;
  }

  filterProduk() {
    const keyword = this.searchProduk.toLowerCase();

    let hasilSementara = this.arrProduk.filter(produk => {
      return produk.name.toLowerCase().includes(keyword);
    });

    if (this.tipeFilter === 'Kategori') {
      hasilSementara = hasilSementara.filter(produk => {
        return this.kategoriAktif === 'Semua' || produk.kategori === this.kategoriAktif;
      });
    }
    else if (this.tipeFilter === 'Stok') {
      hasilSementara = hasilSementara.filter(produk => {
        if (this.statusStok === 'tersedia') return produk.stok > 0;
        if (this.statusStok === 'habis') return produk.stok === 0;
        return true;
      });
    }

    this.filteredProduk = hasilSementara;

    if (this.tipeFilter === 'Harga Beli') {
      this.filteredProduk.sort((a, b) => {
        if (this.urutkanHarga === 'termurah') {
          return a.hargabeli - b.hargabeli;
        } else {
          return b.hargabeli - a.hargabeli;
        }
      });
    }
    else if (this.tipeFilter === 'Harga Jual') {
      this.filteredProduk.sort((a, b) => {
        if (this.urutkanHarga === 'termurah') {
          return a.hargajual - b.hargajual;
        } else {
          return b.hargajual - a.hargajual;
        }
      });
    }
  }
  onTipeFilterChange() {
    this.kategoriAktif = 'Semua';
    this.urutkanHarga = 'semua';
    this.statusStok = 'semua';
    this.filterProduk();
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
