import { Component, OnInit } from '@angular/core';
import { Keranjang } from '../keranjang';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {

  constructor(private keranjang: Keranjang) { }
arrayKeranjang: any[] = [];
  ngOnInit() {
  }
ionViewWillEnter() {
    this.arrayKeranjang = this.keranjang.getKeranjang();
  }
}
