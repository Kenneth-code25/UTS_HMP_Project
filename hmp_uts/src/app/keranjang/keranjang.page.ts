import { Component, OnInit } from '@angular/core';
import { Keranjang } from '../keranjang';
import { Products } from '../products';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { customPageTransition } from '../page-animations';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {

  constructor(
    private keranjang: Keranjang, 
    private products: Products, // Tambahkan service Products untuk update stok
    private router: Router,
    private navCtrl: NavController,
    private animationCtrl: AnimationController
  ) { }

  arrayKeranjang: any[] = [];
  isPilihSemua: boolean = false;
  totalBelanja: number = 0;
  totalJumlahBarang: number = 0;
  isAlertHapusOpen = false;

  ngOnInit() {
    this.arrayKeranjang = this.keranjang.keranjangItems;
    this.hitungTotal();
  }

  tambahJumlah(item: any) {
    item.jumlah++;
    this.hitungTotal();
  }

  // Fungsi kurang jumlah
  kurangJumlah(item: any) {
    if (item.jumlah > 1) {
      item.jumlah--;

      // Kembalikan 1 stok ke produk
      const p = this.products.produk.find((prod: any) => prod.name === item.nama);
      if (p) p.stok++;

      this.hitungTotal();
    }
  }

  // Fungsi hapus dari keranjang
  hapusItem(item: any) {
    // Kembalikan seluruh stok barang ini
    const p = this.products.produk.find((prod: any) => prod.name === item.nama);
    if (p) p.stok += item.jumlah;

    // Saring array untuk membuang item yang diklik
     const index = this.arrayKeranjang.indexOf(item);
  if (index > -1) {
    this.arrayKeranjang.splice(index, 1);
  }
  this.hitungTotal();
  }

  hitungTotal() {
    let total = 0;
    let jumlahItem = 0;
    let semuaTerpilih = true;

    if (this.arrayKeranjang.length === 0) {
      semuaTerpilih = false;
    }

    this.arrayKeranjang.forEach(item => {
      if (item.selected) {
        total += item.hargaSatuan * item.jumlah;
        jumlahItem += item.jumlah;
      } else {
        semuaTerpilih = false;
      }
    });

    this.totalBelanja = total;
    this.totalJumlahBarang = jumlahItem;
    this.isPilihSemua = semuaTerpilih;
  }

 prosesBeli() {
    const items = this.arrayKeranjang.filter(item => item.selected);
    if (items.length === 0) return;

    // Kembalikan stok untuk barang yang TIDAK dipilih (tetap di keranjang)
    // dan langsung hapus barang yang DIPILIH dari keranjang
    this.arrayKeranjang = this.arrayKeranjang.filter(item => !item.selected);
    this.keranjang.keranjangItems = this.arrayKeranjang;
    this.hitungTotal();

    this.navCtrl.navigateForward('/transaksi', {
      state: { items },
      animation: customPageTransition });
  }

  pilihSemuaBarang() {
    this.arrayKeranjang.forEach(item => {
      item.selected = this.isPilihSemua;
    });
    this.hitungTotal();
  }

  hapusTerpilih() {
     for (let i = this.arrayKeranjang.length - 1; i >= 0; i--) {
    if (this.arrayKeranjang[i].selected) {
      this.arrayKeranjang.splice(i, 1);
    }
  }
  this.hitungTotal();
  }
}