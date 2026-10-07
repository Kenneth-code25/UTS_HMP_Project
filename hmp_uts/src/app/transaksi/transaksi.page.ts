import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit {
  items: any[] = [];
  biayaAplikasi = 2000;
  sudahBayar = false;
  waktuPesan = new Date();
  waktuBayar: Date | null = null;
  noTransaksi = '';

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.items = state?.['items'] ?? [];
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    // Kalau halaman di-refresh, data hilang -> balik ke keranjang
    if (this.items.length === 0) {
      this.router.navigate(['/keranjang'], { replaceUrl: true });
    }
  }

  get totalBarang(): number {
    return this.items.reduce((t, i) => t + i.jumlah, 0);
  }

  get totalHarga(): number {
    return this.items.reduce((t, i) => t + i.hargaSatuan * i.jumlah, 0);
  }

  get totalBayar(): number {
    return this.totalHarga + this.biayaAplikasi;
  }

  bayar() {
    this.waktuBayar = new Date();
    const tgl = this.waktuBayar.toISOString().slice(0, 10).replace(/-/g, '');
    const acak = Math.floor(1000 + Math.random() * 9000);
    this.noTransaksi = `TRX-${tgl}-${acak}`;
    this.sudahBayar = true;
  }

  kembaliBelanja() {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}