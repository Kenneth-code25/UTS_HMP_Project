import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Products } from '../products';

@Component({
  selector: 'app-formedit',
  templateUrl: './formedit.page.html',
  styleUrls: ['./formedit.page.scss'],
  standalone: false,
})
export class FormeditPage implements OnInit {

 index = 0;
arrProduk : any[] = []
produks : any;
defaultImageUrl = this.products.urldefault;
  constructor(private route: ActivatedRoute, private products: Products) { }
  ngOnInit() {
     this.arrProduk = this.products.produk;
     this.route.params.subscribe(params => {
     this.index = params['index']
     this.produks = this.arrProduk[this.index];
  });
}
}
