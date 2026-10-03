import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Products } from '../products';
@Component({
  selector: 'app-produkdetail',
  templateUrl: './produkdetail.page.html',
  styleUrls: ['./produkdetail.page.scss'],
  standalone: false,
})
export class ProdukdetailPage implements OnInit {
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