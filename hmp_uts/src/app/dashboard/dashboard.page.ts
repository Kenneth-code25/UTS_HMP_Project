import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { Keranjang } from '../keranjang';
import { Transaksi } from '../transaksi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {

  arrProduk: any[] = [];
  arrayKeranjang: any[] = [];
  defaultImageUrl: string = '';

  constructor(
    private products: Products,
    private keranjang: Keranjang,
    private transaksiService: Transaksi,
    private router: Router
  ) { }

  ngOnInit() {
    this.arrProduk = this.products.produk;
    this.arrayKeranjang = this.keranjang.keranjangItems;
    this.defaultImageUrl = this.products.urldefault;
  }

  ionViewWillEnter() {
    this.arrProduk = this.products.produk;
    this.arrayKeranjang = this.keranjang.keranjangItems;
  }

  get jumlahProduk(): number {
    return this.products.getJumlahProduk();
  }

  get totalTransaksiHariIni(): number {
    return this.transaksiService.getTotalTransaksiHariIni();
  }

  get jumlahTransaksiHariIni(): number {
    return this.transaksiService.getJumlahTransaksiHariIni();
  }

  get produkTerlaris(): { nama: string; totalTerjual: number; url?: string; kategori?: string; harga?: number } {
    return this.transaksiService.getProdukTerlaris();
  }

  get totalProduk(): number {
    return this.products.getJumlahProduk();
  }

  get totalStok(): number {
    return this.arrProduk.reduce((total, p) => total + (Number(p.stok) || 0), 0);
  }

  get totalNilaiAset(): number {
    return this.arrProduk.reduce((total, p) => total + ((Number(p.hargabeli) || 0) * (Number(p.stok) || 0)), 0);
  }

  get totalPotensiPenjualan(): number {
    return this.arrProduk.reduce((total, p) => total + ((Number(p.hargajual) || 0) * (Number(p.stok) || 0)), 0);
  }

  get produkStokHabis(): any[] {
    return this.arrProduk.filter(p => p.stok === 0);
  }

  get produkStokMenipis(): any[] {
    return this.arrProduk.filter(p => p.stok > 0 && p.stok <= 5);
  }

  get summaryKategori(): { nama: string; totalItem: number; totalStok: number }[] {
    const map = new Map<string, { totalItem: number; totalStok: number }>();
    for (const p of this.arrProduk) {
      const kat = p.kategori || 'Lainnya';
      if (!map.has(kat)) {
        map.set(kat, { totalItem: 0, totalStok: 0 });
      }
      const data = map.get(kat)!;
      data.totalItem += 1;
      data.totalStok += (Number(p.stok) || 0);
    }
    return Array.from(map.entries()).map(([nama, data]) => ({
      nama,
      totalItem: data.totalItem,
      totalStok: data.totalStok
    }));
  }

  get totalItemKeranjang(): number {
    return this.arrayKeranjang.reduce((total, item) => total + (Number(item.jumlah) || 0), 0);
  }

  get totalNominalKeranjang(): number {
    return this.arrayKeranjang.reduce((total, item) => total + (Number(item.totalHarga) || 0), 0);
  }

  get produkTerbaru(): any[] {
    return this.arrProduk.slice(0, 4);
  }

  formatRupiah(nilai: number): string {
    return 'Rp' + (nilai || 0).toLocaleString('id-ID');
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

  getKategoriIcon(kategori: string): string {
    switch (kategori?.toLowerCase()) {
      case 'makanan':
        return 'fast-food-outline';
      case 'minuman':
        return 'wine-outline';
      case 'peralatan makan':
        return 'restaurant-outline';
      case 'elektronik':
        return 'hardware-chip-outline';
      default:
        return 'pricetag-outline';
    }
  }
}
