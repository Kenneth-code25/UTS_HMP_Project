import { Component, OnInit } from '@angular/core';
import { Transaksi } from '../transaksi';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit {

  listTransaksi: any[] = [];
  selectedTransaksi: any = null;
  isModalOpen: boolean = false;

  constructor(private transaksiService: Transaksi) { }

  ngOnInit() {
    this.listTransaksi = this.transaksiService.getTransaksiList();
  }

  ionViewWillEnter() {
    this.listTransaksi = this.transaksiService.getTransaksiList();
  }

  get totalAkumulasiTransaksi(): number {
    return this.listTransaksi.reduce((acc, t) => acc + (Number(t.totalNominal) || 0), 0);
  }

  get totalBarangTerjual(): number {
    return this.listTransaksi.reduce((acc, t) => acc + (Number(t.totalItem) || 0), 0);
  }

  bukaDetail(trx: any) {
    this.selectedTransaksi = trx;
    this.isModalOpen = true;
  }

  tutupDetail() {
    this.isModalOpen = false;
    this.selectedTransaksi = null;
  }

  formatRupiah(nilai: number): string {
    return 'Rp' + (nilai || 0).toLocaleString('id-ID');
  }

  formatTanggal(tgl: any): string {
    const d = new Date(tgl);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
