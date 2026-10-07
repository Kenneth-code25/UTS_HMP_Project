import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Sangat penting agar array dibagikan secara global ke semua halaman
})
export class Keranjang {
  keranjangItems: any[] = []; // Array untuk menyimpan item keranjang

  tambahKeKeranjang(produk: any, jumlah: number) {
    console.log('dipanggil:', produk, jumlah);
    if (jumlah <= 0) {
      return;
    }

    // Hitung total harga
    const totalHarga = produk.hargajual * jumlah;

    // Simpan data produk yang dibeli
    this.keranjangItems.push({
      nama: produk.name,
      kategori: produk.kategori,
      url: produk.url,
      hargaSatuan: produk.hargajual,
      totalHarga: totalHarga,
      jumlah: jumlah
    });

  }
  getKeranjang() {
    return this.keranjangItems;
  }

  hapusItemDibayar(itemsDibayar: any[]) {
  for (let i = this.keranjangItems.length - 1; i >= 0; i--) {
    if (itemsDibayar.some(d => d.nama === this.keranjangItems[i].nama)) {
      this.keranjangItems.splice(i, 1);
    }
  }
}

// Kosongkan seluruh keranjang
clearKeranjang() {
  this.keranjangItems = [];
}
}

