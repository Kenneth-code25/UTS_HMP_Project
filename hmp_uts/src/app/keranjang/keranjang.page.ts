import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {

  constructor(public carts:Cart) { }

  ngOnInit() {
  }

}
