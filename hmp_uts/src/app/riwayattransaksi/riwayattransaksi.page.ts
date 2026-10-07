
import { Component, OnInit } from '@angular/core';
import { Transaksi } from '../transaksi';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-riwayattransaksi',
  templateUrl: './riwayattransaksi.page.html',
  styleUrls: ['./riwayattransaksi.page.scss'],
  standalone: false,
})
export class RiwayattransaksiPage implements OnInit {
  listTransaksi: any[] = [];
  selectedTransaksi: any = null;
  isModalOpen: boolean = false;

  constructor(private transaksiService: Transaksi, private animationCtrl: AnimationController) { }

  ngOnInit() {
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

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
    const backdropElement = root?.querySelector('ion-backdrop');
    const wrapperElement = root?.querySelector('.modal-wrapper');

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(backdropElement || baseEl)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl.create();
    if (wrapperElement) {
      wrapperAnimation.addElement(wrapperElement).keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);
    }

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}

