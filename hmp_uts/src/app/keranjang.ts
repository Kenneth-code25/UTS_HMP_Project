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

    produk.stok -= jumlah;

  }
  getKeranjang() {
    return this.keranjangItems;
  }
}

