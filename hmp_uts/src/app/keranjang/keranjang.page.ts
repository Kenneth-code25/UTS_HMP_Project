import { Component, OnInit } from '@angular/core';
import { Keranjang } from '../keranjang';
import { Router } from '@angular/router';


@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {

  constructor(private keranjang: Keranjang, private router: Router) { }
  arrayKeranjang: any[] = [];
  isPilihSemua: boolean = false;
  totalBelanja: number = 0;
  totalJumlahBarang: number = 0;
  isAlertHapusOpen = false;

  ngOnInit() {
    this.arrayKeranjang = this.keranjang.keranjangItems;
  }

  tambahJumlah(item: any) {
    item.jumlah++;
    this.hitungTotal();
    // Jangan lupa kalikan ulang total harganya berdasarkan harga satuan
    // item.totalHarga = item.hargaSatuan * item.jumlah; 
  }

  // Fungsi kurang jumlah (tidak boleh di bawah 1)
  kurangJumlah(item: any) {
    if (item.jumlah > 1) {
      item.jumlah--;
      this.hitungTotal();
      // Jangan lupa kalikan ulang total harganya
      // item.totalHarga = item.hargaSatuan * item.jumlah;
    }
  }

  // Fungsi hapus dari keranjang
  hapusItem(item: any) {
    // Saring array untuk membuang item yang diklik
    this.arrayKeranjang = this.arrayKeranjang.filter(produk => produk !== item);
    this.hitungTotal();
  }

  hitungTotal() {
    let total = 0;
    let jumlahItem = 0;
    let semuaTerpilih = true;

    // Kalau keranjang kosong, checkbox 'Semua' harus mati
    if (this.arrayKeranjang.length === 0) {
      semuaTerpilih = false;
    }

    this.arrayKeranjang.forEach(item => {
      if (item.selected) {
        // Ganti hargaSatuan dengan nama variabel hargamu yang sesuai
        total += item.hargaSatuan * item.jumlah;
        jumlahItem += item.jumlah;
      } else {
        semuaTerpilih = false;
      }
    });

    this.totalBelanja = total;
    this.totalJumlahBarang = jumlahItem;

    // Update checkbox "Semua" di bawah agar sinkron
    this.isPilihSemua = semuaTerpilih;
  }

  prosesBeli() {

    const items = this.arrayKeranjang.filter(item => item.selected);
    if (items.length === 0) return;
    this.router.navigate(['/transaksi'], { state: { items } });
  }

  pilihSemuaBarang() {
    this.arrayKeranjang.forEach(item => {
      item.selected = this.isPilihSemua;
    });
    this.hitungTotal();
  }

  hapusTerpilih() {
    this.arrayKeranjang = this.arrayKeranjang.filter(item => !item.selected);
    this.hitungTotal();
  }
}
