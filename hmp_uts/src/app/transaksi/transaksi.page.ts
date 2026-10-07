import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaksi } from '../transaksi';
import { Keranjang } from '../keranjang';
import { Products } from '../products';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit {
  items: any[] = [];
  nota: any = null;
  sudahBayar = false;
  waktuPesan = new Date();
  isAlertBayarOpen = false;

  constructor(private router: Router, private transaksiService: Transaksi, private keranjangService: Keranjang,
    private products: Products) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    this.items = [...(state?.['items'] ?? [])];
  }

  ngOnInit() {
    if (this.items.length === 0) {
      this.router.navigate(['/keranjang'], { replaceUrl: true });
    }
  }

  get biayaAplikasi() { return this.transaksiService.biayaAplikasi; }
  get totalBarang() { return this.transaksiService.getTotalBarang(this.items); }
  get totalHarga() { return this.transaksiService.getTotalHarga(this.items); }
  get totalBayar() { return this.transaksiService.getTotalBayar(this.items); }

  bayar() {
    this.nota = this.transaksiService.bayar(this.items);
    this.keranjangService.hapusItemDibayar(this.items);
    this.items.forEach(i => {
      const produk = this.products.produk.find((p: any) => p.name === i.nama);
      if (produk) {
        produk.stok = Math.max(0, produk.stok - i.jumlah);
      }
    });
    this.sudahBayar = true;
  }

  kembaliBelanja() {
    this.router.navigate(['/produk'], { replaceUrl: true });
  }
}