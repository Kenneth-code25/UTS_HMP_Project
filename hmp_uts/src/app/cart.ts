import { Service } from '@angular/core';

@Service()
export class Cart {
    items: { produk:any; jumlah: number}[] = [];

    tambah(produk:any){
        const ada = this.items.find(i=> i.produk === produk); //hasilnya true or false
        if(ada){
            ada.jumlah++;
        }
        else {
            this.items.push({produk, jumlah:1});
        }
    }

    kurang(index:number){
        if(this.items[index].jumlah>1) {
            this.items[index].jumlah--;
        }
        else {
            this.items.splice(index,1);
        }
    }

    hapus(index:number) {
        this.items.splice(index,1);
    }
}
