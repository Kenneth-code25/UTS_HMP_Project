import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaksi } from '../transaksi';
import { Keranjang } from '../keranjang';

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

  constructor(
    private router: Router,
    private transaksiService: Transaksi,
    private keranjangService: Keranjang
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.items = state?.['items'] ?? [];
  }

  ngOnInit() {}

  ionViewWillEnter() {
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
    
    // 1. Format array items sesuai properti yang dibutuhkan modal riwayat
    const itemsFormatted = this.items.map(item => ({
      nama: item.nama,
      kategori: item.kategori || 'Makanan',
      jumlah: item.jumlah,
      harga: item.hargaSatuan,
      totalHarga: item.hargaSatuan * item.jumlah,
      url: item.url || ''
    }));

    // 2. Simpan transaksi ke service (otomatis tercatat di Riwayat Transaksi Profile)
    const newTrx = this.transaksiService.tambahTransaksi(itemsFormatted, this.totalBayar);
    this.noTransaksi = newTrx.id;

    // 3. Saring item yang sudah dibeli agar keluar dari keranjang
    if (this.keranjangService.keranjangItems) {
      this.keranjangService.keranjangItems = this.keranjangService.keranjangItems.filter(
        k => !this.items.some(i => i.nama === k.nama)
      );
    }

    this.sudahBayar = true;
  }

  kembaliBelanja() {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}