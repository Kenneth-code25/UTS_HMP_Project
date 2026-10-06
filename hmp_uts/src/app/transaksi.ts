import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Transaksi {
  transaksiList: any[] = [
    {
      id: 'TRX-20261006-001',
      tanggal: new Date(),
      items: [
        { nama: 'CHEESE BURGER', kategori: 'Makanan', jumlah: 3, harga: 45000, totalHarga: 135000, url: '' },
        { nama: 'COCA COLA', kategori: 'Minuman', jumlah: 2, harga: 15000, totalHarga: 30000, url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=850&h=500&fit=crop' }
      ],
      totalItem: 5,
      totalNominal: 165000
    },
    {
      id: 'TRX-20261006-002',
      tanggal: new Date(),
      items: [
        { nama: 'CHEESE BURGER', kategori: 'Makanan', jumlah: 2, harga: 45000, totalHarga: 90000, url: '' },
        { nama: 'FRENCH FRIES', kategori: 'Makanan', jumlah: 2, harga: 25000, totalHarga: 50000, url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=850&h=500&fit=crop' }
      ],
      totalItem: 4,
      totalNominal: 140000
    }
  ];

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
}
