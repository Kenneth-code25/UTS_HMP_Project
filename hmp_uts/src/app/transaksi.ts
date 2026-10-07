import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Transaksi {
  transaksiList: any[] = [];
  biayaAplikasi = 2000;

  getJumlahTransaksiHariIni(): number {
    const today = new Date().toDateString();
    return this.transaksiList.filter(t => new Date(t.tanggal).toDateString() === today).length;
  }

  getTotalTransaksiHariIni(): number {
    const today = new Date().toDateString();
    return this.transaksiList
      .filter(t => new Date(t.tanggal).toDateString() === today)
      .reduce((sum, t) => sum + (Number(t.totalNominal) || 0), 0);
  }

  getProdukTerlaris(): { nama: string; totalTerjual: number; url?: string; kategori?: string; harga?: number } {
    const counts = new Map<string, { totalTerjual: number; url?: string; kategori?: string; harga?: number }>();
    for (const trx of this.transaksiList) {
      for (const item of trx.items) {
        const key = item.nama;
        if (!counts.has(key)) {
          counts.set(key, {
            totalTerjual: 0,
            url: item.url,
            kategori: item.kategori,
            harga: item.harga || item.totalHarga / item.jumlah
          });
        }
        counts.get(key)!.totalTerjual += (Number(item.jumlah) || 0);
      }
    }

    let topProduct = { nama: '-', totalTerjual: 0, url: '', kategori: '', harga: 0 };
    for (const [nama, info] of counts.entries()) {
      if (info.totalTerjual > topProduct.totalTerjual) {
        topProduct = {
          nama: nama,
          totalTerjual: info.totalTerjual,
          url: info.url || '',
          kategori: info.kategori || '',
          harga: info.harga || 0
        };
      }
    }
    return topProduct;
  }

  tambahTransaksi(items: any[], totalNominal: number): any {
    const now = new Date();
    const id = 'TRX-' + now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') + '-' +
      String(this.transaksiList.length + 1).padStart(3, '0');

    const totalItem = items.reduce((acc, item) => acc + (Number(item.jumlah) || 0), 0);

    const newTrx = {
      id: id,
      tanggal: now,
      items: [...items],
      totalItem: totalItem,
      biayaAplikasi: this.biayaAplikasi,
      subtotal: totalNominal - this.biayaAplikasi,
      totalNominal: totalNominal
    };

    this.transaksiList.unshift(newTrx);
    return newTrx;
  }

  getTransaksiList(): any[] {
    return this.transaksiList;
  }

  getTransaksiDetail(index: number): any {
    return this.transaksiList[index];
  }

  

 
  getTotalBarang(items: any[]): number {
    return items.reduce((t, i) => t + (Number(i.jumlah) || 0), 0);
  }

  getTotalHarga(items: any[]): number {
    return items.reduce((t, i) => t + (Number(i.hargaSatuan ?? i.harga) || 0) * (Number(i.jumlah) || 0), 0);
  }

  getTotalBayar(items: any[]): number {
    return this.getTotalHarga(items) + this.biayaAplikasi;
  }

 
  bayar(items: any[]): any {
    
    const itemsSiap = items.map(i => {
      const harga = Number(i.hargaSatuan ?? i.harga) || 0;
      const jumlah = Number(i.jumlah) || 0;
      return {
        nama: i.nama,
        kategori: i.kategori,
        jumlah,
        harga,
        totalHarga: harga * jumlah,
        url: i.url || ''
      };
    });

    return this.tambahTransaksi(itemsSiap, this.getTotalBayar(itemsSiap));
  }

}
