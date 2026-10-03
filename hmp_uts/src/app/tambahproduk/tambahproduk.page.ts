import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tambahproduk',
  templateUrl: './tambahproduk.page.html',
  styleUrls: ['./tambahproduk.page.scss'],
  standalone: false,
})
export class TambahprodukPage implements OnInit {
  add_name:string = "";
  add_url:string = "";
  add_desc:string = "";
  add_buyPrice:number = 0;

  arr_sellPrice:number[]=[];
  add_sellPrice:number=0;
  add_stok:number = 0;

  //variabel buat pengecekan
  isStokNegatif:boolean=true;
  isAlertTrigger:boolean=false;
  alertHeader:string='';
  alertMessage:string='';
  public alertButtons:any = ['OK'];

  constructor(private products:Products, private router:Router) { }

  ngOnInit() {
    this.arr_sellPrice = this.generateNumberOptions(5000,100000,5000)
  }

  generateNumberOptions(start:number,end:number,step:number):number[]{
    const options:number[]=[];
    for(let i = start; i<=end; i+=step){
      options.push(i);
    }
    return options;
  }
  
  add() {
    this.add_stok++;
    if(this.add_stok>0) this.isStokNegatif=false;
  }

  remove() {
    this.add_stok--;
    if(this.add_stok==0) this.isStokNegatif=true;
  }

  addproduk() {
    this.products.tambahproduk(this.add_name,this.add_url,this.add_desc,this.add_buyPrice,this.add_sellPrice,this.add_stok)
    this.router.navigate(['/produk']);
  }

  cekHargaBeli() {
    if(this.add_buyPrice<0){
      this.isAlertTrigger=true;
      this.alertHeader="Harga Beli NEGATIF";
      this.alertMessage="Harga Beli TIDAK BOLEH NEGATIF";
      this.add_buyPrice=0;
    }
    else if(this.add_buyPrice>100000){
      this.isAlertTrigger=true;
      this.alertHeader="Harga Beli KEMAHALAN";
      this.alertMessage="Harga Beli TIDAK BOLEH LEBIH DARI 100rb";
      this.add_buyPrice=100000;
    }
  }

  cekNama() {
    if (!this.add_name || this.add_name.trim() === '') {
      this.isAlertTrigger=true;
      this.alertHeader="Nama Produk KOSONG";
      this.alertMessage="Nama Produk WAJIB DIISI";
    } 
  }

  cekDeskripsi() {
    if (!this.add_desc || this.add_desc.trim() === '') {
      this.isAlertTrigger=true;
      this.alertHeader="Deskripsi Produk KOSONG";
      this.alertMessage="Deskripsi Produk WAJIB DIISI";
    } 
  }

  cekFormatUrl() {
    if (!this.add_url || this.add_url.trim() === '') {
      this.isAlertTrigger=true;
      this.alertHeader="Image URL KOSONG";
      this.alertMessage="Image URL WAJIB DIISI";
      return;
    }
    try {
      new URL(this.add_url);
    } catch (e) {
      
      this.alertHeader='Format URL SALAH';
      this.alertMessage='Format URL Salah', 'Pastikan link diawali dengan http:// atau https:// ya!';
      this.isAlertTrigger=true;
      this.add_url = '';
    }
  }

  cekSubmit() {
    // 1. Cek Nama Produk
    if (!this.add_name || this.add_name.trim() === '') {
      this.alertHeader = "Nama Produk KOSONG";
      this.alertMessage = "Nama Produk WAJIB DIISI";
      this.isAlertTrigger = true;
      return;
    } 

    // 2. Cek Deskripsi
    if (!this.add_desc || this.add_desc.trim() === '') {
      this.alertHeader = "Deskripsi Produk KOSONG";
      this.alertMessage = "Deskripsi Produk WAJIB DIISI";
      this.isAlertTrigger = true;
      return; 
    } 

    // 3. Cek Harga Beli
    if (this.add_buyPrice < 0) {
      this.alertHeader = "Harga Beli NEGATIF";
      this.alertMessage = "Harga Beli TIDAK BOLEH NEGATIF";
      this.add_buyPrice = 0;
      this.isAlertTrigger = true;
      return;
    } else if (this.add_buyPrice > 100000) {
      this.alertHeader = "Harga Beli KEMAHALAN";
      this.alertMessage = "Harga Beli TIDAK BOLEH LEBIH DARI 100rb";
      this.add_buyPrice = 100000;
      this.isAlertTrigger = true;
      return;
    }

    // 4. Cek Format URL Kosong
    if (!this.add_url || this.add_url.trim() === '') {
      this.alertHeader = "Image URL KOSONG";
      this.alertMessage = "Image URL WAJIB DIISI";
      this.isAlertTrigger = true;
      return;
    }

    // 5. Cek Validitas URL
    try {
      new URL(this.add_url);
    } catch (e) {
      this.alertHeader = 'Format URL SALAH';
      this.alertMessage = 'Format URL Salah. Pastikan link diawali dengan http:// atau https://';
      this.isAlertTrigger = true;
      this.add_url = '';
      return;
    }
    
    // Munculkan Alert Sukses
    this.alertHeader = "Add Produk";
    this.alertMessage = "Berhasil menambahkan produk";
    this.alertButtons = [
        {
          text: 'OK',
          handler: () => {
            // 1. Matikan saklar alert secara manual saat tombol diklik
            this.isAlertTrigger = false; 

            // 2. Beri jeda 0.3 detik (300 milidetik) agar animasi alert tertutup sempurna, baru pindah halaman
            setTimeout(() => {
              this.addproduk(); 
            }, 300); 
          }
        }
    ];
    
    this.isAlertTrigger = true;
  }
}
