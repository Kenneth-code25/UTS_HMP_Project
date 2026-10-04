import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { FormeditPageRoutingModule } from './formedit-routing.module';

import { FormeditPage } from './formedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormeditPageRoutingModule
  ],
  declarations: [FormeditPage]
})
export class FormeditPageModule {}
