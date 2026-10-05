import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Products } from '../products';
import { Keranjang } from '../keranjang';
@Component({
  selector: 'app-produkdetail',
  templateUrl: './produkdetail.page.html',
  styleUrls: ['./produkdetail.page.scss'],
  standalone: false,
})
export class ProdukdetailPage implements OnInit {
index = 0;
buyAmount = 0;
arrProduk : any[] = []
produks : any;
defaultImageUrl = this.products.urldefault;
  constructor(private route: ActivatedRoute, private products: Products, private keranjang: Keranjang) { }
  ngOnInit() {
     this.arrProduk = this.products.produk;
     this.route.params.subscribe(params => {
     this.index = params['index']
     this.produks = this.arrProduk[this.index];
  });
}
  minus(){
   if(this.buyAmount > 0){
     this.buyAmount--;
   }
   else{
     this.buyAmount=0;
   }
}
plus(){
   if(this.buyAmount < this.produks.stok){
     this.buyAmount++;
   }
   else{
     this.buyAmount=this.produks.stok;
   }
}
tambahKeranjang() {
  this.keranjang.tambahKeKeranjang(
    this.produks,
    this.buyAmount
  );
}
}