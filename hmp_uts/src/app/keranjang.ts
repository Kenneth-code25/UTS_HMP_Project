import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Keranjang {
  keranjangItems: any[] = []; 

  tambahKeKeranjang(produk: any, jumlah: number) {
    console.log('dipanggil:', produk, jumlah);
    if (jumlah <= 0) {
      return;
    }

  
    const totalHarga = produk.hargajual * jumlah;

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


clearKeranjang() {
  this.keranjangItems = [];
}
}

