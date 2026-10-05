import { Component, OnInit } from '@angular/core';
import { Keranjang } from '../keranjang';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {

  constructor(private keranjang: Keranjang, private cdr: ChangeDetectorRef) { }
  arrayKeranjang: any[] = [];
  ngOnInit() {
  }
  ionViewWillEnter() {
    const dataDariService = this.keranjang.getKeranjang();
    console.log("👉 CCTV 2: Halaman Keranjang Berhasil Dibuka!");

    console.log("👉 CCTV 3: Data yang ditangkap:", dataDariService);

    if (dataDariService) {
      this.arrayKeranjang = [...dataDariService];
    } else {
      this.arrayKeranjang = [];
    }
    this.cdr.detectChanges();
  }
}
