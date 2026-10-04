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
  arrProduk: any[] = []
  produks: any;
  defaultImageUrl = '';
  arr_sellPrice:number[]=[];
  isEditing: boolean = true;
  isStokNegatif:boolean = true;

  editing: { [key: string]: boolean } = {
    name: false, description: false, url: false,
    hargabeli: false, hargajual: false, stok: false,
  };

  constructor(private route: ActivatedRoute, private products: Products) { 
    this.defaultImageUrl = this.products.urldefault;
  }

  ngOnInit() {
    this.arr_sellPrice = this.generateNumberOptions(5000,100000,5000);
    this.arrProduk = this.products.produk;
    this.route.params.subscribe(params => {
      this.index = params['index']
      this.produks = this.arrProduk[this.index];
    });
  }

  bisaDiEdit(bagianApa: string) {
    this.editing[bagianApa] = !this.editing[bagianApa];
  }

   generateNumberOptions(start:number,end:number,step:number):number[]{
    const options:number[]=[];
    for(let i = start; i<=end; i+=step){
      options.push(i);
    }
    return options;
  }

  add() {
    this.produks.stok++;
    if(this.produks.stok>0) this.isStokNegatif=false;
  }

  remove() {
     this.produks.stok--;
    if( this.produks.stok==0) this.isStokNegatif=true;
  }
  
}
