import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tambahproduk',
  templateUrl: './tambahproduk.page.html',
  styleUrls: ['./tambahproduk.page.scss'],
  standalone: false,
})
export class TambahprodukPage implements OnInit {
  add_name: string = "";
  add_kategori: string = "";
  add_url: string = "";
  add_desc: string = "";
  add_buyPrice: number = 0;

  arr_sellPrice: number[] = [];
  add_sellPrice: number = 0;
  add_stok: number = 0;


  //variabel buat pengecekan
  isStokNegatif: boolean = true;
  err_name: string = "";
  err_kategori: string = "";
  err_url: string = "";
  err_desc: string = "";
  err_hargabeli: string = "";
  err_hargajual: string = "";

  alertHeader: string = "";
  alertMessage: string = "";
  public alertButtons: any = ['OK'];
  isAlertOpen = false;
  isSuccessAlert = false;

  constructor(private products: Products, private router: Router) { }

  ngOnInit() {
    this.arr_sellPrice = this.generateNumberOptions(5000, 100000, 5000);
  }

  addproduk() {
    this.products.tambahproduk(this.add_name, this.add_kategori, this.add_url, this.add_desc, this.add_buyPrice, this.add_sellPrice, this.add_stok);
    this.router.navigate(['/produk']);
  }

  generateNumberOptions(start: number, end: number, step: number): number[] {
    const options: number[] = [];
    for (let i = start; i <= end; i += step) {
      options.push(i);
    }
    return options;
  }

  add() {
    this.add_stok++;
    if (this.add_stok > 0) this.isStokNegatif = false;
  }

  remove() {
    this.add_stok--;
    if (this.add_stok == 0) this.isStokNegatif = true;
  }


  cekNama() {
    if (!this.add_name || this.add_name.trim() === '') {
      this.err_name = "Nama tidak boleh kosong";
    }
    else {
      this.err_name = "";
    }
  }

  cekKategori() {
    if (!this.add_kategori || this.add_kategori.trim() === '') {
      this.err_kategori = "Kategori tidak boleh kosong";
    }
    else {
      this.err_kategori = "";
    }
  }

  cekDeskripsi() {
    if (!this.add_desc || this.add_desc.trim() === '') {
      this.err_desc = "Deskripsi tidak boleh kosong";
    }
    else {
      this.err_desc = "";
    }
  }

  cekFormatUrl() {
    if (!this.add_url || this.add_url.trim() === '') {
      this.err_url = "URL Gambar tidak boleh kosong";
      return;
    }
    try {
      new URL(this.add_url);
      this.err_url = "";
    } catch (e) {
      this.err_url = "Format URL salah, harus dimulai dengan http atau https";
    }
  }

  cekHargaBeli() {
    if (this.add_buyPrice < 0) {
      this.err_hargabeli = "Harga tidak boleh Negatif";
      this.add_buyPrice = 0;
    }
    else if (this.add_buyPrice > 100000) {
      this.err_hargabeli = "Harga tidak boleh lebih dr 100rb";
      this.add_buyPrice = 100000;
    }
    else {
      this.err_hargabeli = "";
    }
  }

  cekHargaJual() {
    if (!this.add_sellPrice) {
      this.err_hargajual = "Harga jual harus dipilih";
    } else {
      this.err_hargajual = "";
    }
  }

  cekSubmit() {
    this.cekNama();
    this.cekKategori();
    this.cekDeskripsi();
    this.cekFormatUrl();
    this.cekHargaBeli();
    this.cekHargaJual();

    const adaError = this.err_name || this.err_kategori || this.err_desc || this.err_url || this.err_hargabeli || this.err_hargajual;

    if (adaError) {
      this.alertHeader = "Ada ERROR";
      this.alertMessage = "Semua bagian form WAJIB DIISI !";
      this.isSuccessAlert = false;
    }
    else {
      this.alertHeader = "Menambahkan Produk";
      this.alertMessage = "Berhasil menambahkan produk baru";
      this.isSuccessAlert = true;
    }
    this.isAlertOpen = true;
  }

  handleAlertDismiss() {
    this.isAlertOpen = false;
    if (this.isSuccessAlert) {
      this.addproduk();
      this.clearAll();
    }
  }

  clearAll() {
    this.add_name = '';
    this.add_kategori = '';
    this.add_desc = '';
    this.add_url = '';
    this.add_buyPrice = 0;
    this.add_sellPrice = 0;
    this.add_stok=0;

    this.err_name = '';
    this.err_kategori = '';
    this.err_desc = '';
    this.err_url = '';
    this.err_hargabeli = '';
    this.err_hargajual = '';
  }
}
